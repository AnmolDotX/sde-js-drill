import { TopicItem } from '../types';

export const phase2Topics: TopicItem[] = [
  // ==========================================
  // NODE.JS INTERNALS & ARCHITECTURE
  // ==========================================
  {
    id: 'be-node-event-loop-libuv',
    title: 'Node.js Architecture: V8, libuv & Event Loop Phases',
    subtitle: 'Timers, Poll, Check, setImmediate, process.nextTick & Thread Pool',
    phase: 'phase-2-backend',
    category: 'Node.js Internals',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'Node.js executes JavaScript on Google’s V8 engine while delegating non-blocking asynchronous I/O and thread pooling to libuv. The Node.js event loop runs in distinct phases, draining microtasks between each phase.',
    howItWorks:
      'The libuv event loop comprises distinct phases: 1) Timers: executes setTimeout and setInterval callbacks; 2) Pending Callbacks: executes I/O callbacks deferred from previous iterations; 3) Idle/Prepare: internal engine work; 4) Poll: retrieves new I/O events and executes their callbacks, pausing if queue is empty until timers expire or setImmediate is scheduled; 5) Check: executes setImmediate() callbacks; 6) Close Callbacks: executes socket/handle closing events. Crucially: process.nextTick() queue drains immediately after current operation completes before any event loop phase transitions, followed by Promise microtasks.',
    practicalExample: {
      title: 'Phase Order: nextTick vs Promise vs setImmediate',
      language: 'javascript',
      code: `const fs = require('fs');

fs.readFile(__filename, () => {
  // Inside I/O cycle (Poll phase):
  setTimeout(() => console.log('1: Timer'), 0);
  setImmediate(() => console.log('2: Immediate'));
  process.nextTick(() => console.log('3: nextTick'));
  Promise.resolve().then(() => console.log('4: Promise microtask'));
  // Guaranteed Order inside I/O: 3 (nextTick), 4 (microtask), 2 (Immediate in Check phase), 1 (Timer in next cycle Timers phase)
});`,
    },
    interviewAnswer:
      'Node.js runs single-threaded JavaScript code on V8, while libuv manages non-blocking event-driven I/O and a default 4-thread worker pool for operations that cannot be performed asynchronously by the OS kernel (such as file system operations, dns.lookup, and crypto functions). Its event loop cycles through Timers, Poll, and Check phases. process.nextTick runs with the highest priority before any phase switch, followed by Promise microtasks. Understanding this prevents event loop starvation where CPU-heavy work freezes API throughput.',
    tradeoffsAndGotchas: [
      'libuv thread pool size defaults to 4 threads; under heavy bcrypt or fs operations, throughput bottlenecks unless UV_THREADPOOL_SIZE is tuned (e.g. UV_THREADPOOL_SIZE=16).',
      'Recursive process.nextTick calls completely starve the event loop, preventing I/O and timers from ever running.',
    ],
    followUpQuestions: [
      'What operations run in libuv thread pool vs OS asynchronous primitives (epoll/kqueue)?',
      'Why is setImmediate guaranteed to execute before setTimeout(fn, 0) when scheduled within an I/O callback?',
    ],
  },
  {
    id: 'be-node-streams-backpressure',
    title: 'Streams, Buffers & Backpressure Handling',
    subtitle: 'Readable, Writable, Duplex, Transform, highWaterMark, pipe & pipeline',
    phase: 'phase-2-backend',
    category: 'Node.js Internals',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'Streams process data chunk-by-chunk in memory rather than buffering entire payloads. Backpressure occurs when a writable stream cannot write data as fast as the readable stream emits it.',
    howItWorks:
      'Streams chunk data into Buffer objects governed by highWaterMark (default 64KB for streams, 16KB for objects). When a writable destination is slower than a readable source, write(chunk) returns false, signaling the readable stream to pause. When the writable stream drains its internal buffer, it emits the "drain" event, resuming readable.stream. Using stream.pipeline() automatically wires up backpressure, error forwarding, and resource destruction.',
    practicalExample: {
      title: 'Safe File Streaming with pipeline',
      language: 'javascript',
      code: `const { pipeline } = require('stream/promises');
const fs = require('fs');
const zlib = require('zlib');

async function compressLogFile(src, dest) {
  try {
    // Memory remains constant (~64KB) even for a 10GB file!
    await pipeline(
      fs.createReadStream(src),
      zlib.createGzip(),
      fs.createWriteStream(dest)
    );
    console.log('Compression complete with automatic backpressure and cleanup.');
  } catch (err) {
    console.error('Pipeline failed:', err);
  }
}`,
    },
    interviewAnswer:
      'Streams allow Node.js services to process gigabytes of data with a constant, tiny memory footprint by streaming chunks through readable and writable pipelines. Backpressure is the mechanism that prevents fast producers from overwhelming slow consumers (such as reading from disk faster than writing over a slow network socket). If writable.write() returns false, the producer must pause until the "drain" event fires. In production, we use stream.pipeline() rather than .pipe() because pipeline guarantees complete resource cleanup and proper error propagation.',
    tradeoffsAndGotchas: [
      'Using readable.pipe(writable) without attaching error listeners will cause uncaught exceptions if either stream emits an error, leaking open file descriptors.',
      'Loading entire large JSON payloads into memory (e.g. JSON.parse on 100MB files) triggers V8 garbage collection freezes and Out-Of-Memory (OOM) crashes.',
    ],
    followUpQuestions: [
      'How would you stream an export of 500,000 MongoDB records to a client browser as a CSV download?',
    ],
  },
  {
    id: 'be-node-graceful-shutdown',
    title: 'Process Lifecycle & Graceful Shutdown',
    subtitle: 'SIGTERM, SIGINT, closing HTTP server, connection drains, health checks',
    phase: 'phase-2-backend',
    category: 'Node.js Internals',
    priority: 'P0',
    estimatedMins: 10,
    theGist:
      'Graceful shutdown allows active requests and database transactions to finish processing when container orchestrators (Kubernetes/Docker) terminate a pod, preventing dropped user requests.',
    howItWorks:
      'When Kubernetes terminates a pod, it sends SIGTERM, waits a grace period (e.g. 30s), and sends SIGKILL if the process has not exited. During graceful shutdown: 1) Immediately fail readiness health checks so load balancers stop sending new traffic; 2) Stop accepting new connections via server.close(); 3) Wait for inflight HTTP requests to finish; 4) Gracefully close database connection pools and message consumers; 5) Exit process with code 0 (or force exit on timeout).',
    practicalExample: {
      title: 'Production Graceful Shutdown Handler',
      language: 'javascript',
      code: `const http = require('http');
const server = http.createServer(app);

function gracefulShutdown(signal) {
  console.log(\`Received \${signal}. Starting graceful shutdown...\`);
  
  // 1. Stop taking new connections
  server.close(async () => {
    console.log('HTTP server closed.');
    try {
      // 2. Close database pools
      await db.disconnect();
      // 3. Close message queue consumers
      await messageQueue.close();
      console.log('Connections closed cleanly. Exiting.');
      process.exit(0);
    } catch (err) {
      console.error('Error during cleanup:', err);
      process.exit(1);
    }
  });

  // 4. Force exit after timeout if tasks hang
  setTimeout(() => {
    console.error('Forced shutdown timeout exceeded. Exiting.');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));`,
    },
    interviewAnswer:
      'Graceful shutdown ensures an API server finishes in-flight requests without abrupt client connection drops when rolling out deployments. Upon intercepting SIGTERM, the server flips its readiness probe to 503, calls server.close() to reject new TCP connections while servicing active ones, flushes logs, closes DB connection pools, and exits cleanly. A fallback timer guarantees the process exits even if an inflight query hangs.',
    tradeoffsAndGotchas: [
      'SIGKILL (kill -9) cannot be caught or handled by Node.js; only SIGTERM and SIGINT allow cleanup hooks.',
      'Remember to call timer.unref() on the force-exit timeout so the timer itself does not artificially keep the event loop alive.',
    ],
    followUpQuestions: [
      'What is the difference between a Liveness probe and a Readiness probe in Kubernetes?',
    ],
  },

  // ==========================================
  // REST API DESIGN & ARCHITECTURE
  // ==========================================
  {
    id: 'be-api-idempotency-keys',
    title: 'API Idempotency & Safe Retries',
    subtitle: 'Idempotency-Key headers, atomic deduplication, preventing duplicate payments',
    phase: 'phase-2-backend',
    category: 'REST API & Express',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'An idempotent API produces the same outcome whether called once or multiple times. For non-idempotent operations (POST /orders, payments), clients send an Idempotency-Key header to safely retry requests without double charges.',
    howItWorks:
      'Client generates a UUID and sends it in the Idempotency-Key header. 1) Server receives request and attempts an atomic lock in Redis/DB with key: `idempotency:${key}` with a status "PROCESSING" and TTL. 2) If the key already exists with status "PROCESSING", return HTTP 409 Conflict or wait; 3) If the key exists with "COMPLETED", return the cached response (status code and body) immediately; 4) If new, process the business logic in a DB transaction, save the response body and status into the idempotency record, and mark "COMPLETED".',
    practicalExample: {
      title: 'Idempotency Middleware Concept',
      language: 'typescript',
      code: `async function idempotencyMiddleware(req: Request, res: Response, next: NextFunction) {
  const key = req.header('Idempotency-Key');
  if (!key) return next();

  const cacheKey = \`idempotency:\${key}\`;
  // Atomic set if not exists (NX) with 24-hour TTL (EX)
  const acquired = await redis.set(cacheKey, JSON.stringify({ status: 'PROCESSING' }), 'EX', 86400, 'NX');
  
  if (!acquired) {
    const cached = JSON.parse(await redis.get(cacheKey) || '{}');
    if (cached.status === 'PROCESSING') {
      return res.status(409).json({ error: 'Request currently in progress. Please retry shortly.' });
    }
    // Return previously saved response:
    return res.status(cached.statusCode).json(cached.body);
  }

  // Intercept res.json to capture response before sending:
  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    redis.set(cacheKey, JSON.stringify({ status: 'COMPLETED', statusCode: res.statusCode, body }), 'EX', 86400);
    return originalJson(body);
  };

  next();
}`,
    },
    interviewAnswer:
      'Network requests can fail after the server commits a database transaction but before the client receives the 200 OK. If the client retries, a duplicate order or charge occurs. We solve this using Idempotency-Key headers. On receiving a key, the backend atomically claims the key in a fast store like Redis or a database unique index. If already claimed and completed, it short-circuits and replays the cached original response. This guarantees exactly-once business side effects.',
    tradeoffsAndGotchas: [
      'Always associate the idempotency key with the authenticated user ID and request path/hash so a malicious client cannot spoof another user’s idempotency key.',
      'Idempotency records must have an expiration TTL (e.g., 24-72 hours).',
    ],
    followUpQuestions: [
      'What should happen if the original request times out or crashes midway through processing?',
      'Which HTTP methods are idempotent by specification (GET, PUT, DELETE) vs non-idempotent (POST, PATCH)?',
    ],
  },
  {
    id: 'be-api-pagination-offset-cursor',
    title: 'Pagination: Offset vs Cursor at Scale',
    subtitle: 'Limit/Offset performance degradation, cursor pagination with ObjectId or timestamps',
    phase: 'phase-2-backend',
    category: 'REST API & Express',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'Offset pagination (OFFSET 100000 LIMIT 20) scans and discards 100,000 rows, degrading query latency as tables grow. Cursor pagination queries records greater than the last seen cursor using indexed columns, maintaining O(1) page access.',
    howItWorks:
      'Offset: SELECT * FROM orders ORDER BY created_at DESC OFFSET 50000 LIMIT 20. The database must traverse and discard the first 50,000 rows. Also suffers from "phantom reads" (items shifting pages when new records are inserted). Cursor: SELECT * FROM orders WHERE (created_at, id) < ($cursor_time, $cursor_id) ORDER BY created_at DESC, id DESC LIMIT 20. The B-Tree index jumps directly to the cursor key position in O(log N).',
    practicalExample: {
      title: 'MongoDB Cursor Query with Compound Index',
      language: 'javascript',
      code: `// Cursor pagination in MongoDB using _id
async function getPaginatedOrders(lastSeenId, limit = 20) {
  const query = lastSeenId ? { _id: { $lt: new ObjectId(lastSeenId) } } : {};
  
  const orders = await db.collection('orders')
    .find(query)
    .sort({ _id: -1 }) // Utilizes primary key B-Tree index
    .limit(limit + 1)  // Fetch 1 extra to check hasNextPage
    .toArray();

  const hasNextPage = orders.length > limit;
  const items = hasNextPage ? orders.slice(0, limit) : orders;
  const nextCursor = items.length > 0 ? items[items.length - 1]._id : null;

  return { items, nextCursor, hasNextPage };
}`,
    },
    interviewAnswer:
      'Offset pagination is simple and allows jumping to arbitrary page numbers, but it degrades drastically at scale because the database engine must scan and discard all preceding offset rows. It also leads to missing or duplicate entries when items are inserted while browsing. Cursor pagination encodes a deterministic pointer (like indexed timestamp + ID) and uses range queries (< cursor). It delivers constant O(1) response times regardless of depth and is the gold standard for infinite scroll feeds and production APIs.',
    tradeoffsAndGotchas: [
      'Cursor pagination does not support jumping directly to page 47 or displaying total page counts without an expensive separate count query.',
      'Always use a unique tie-breaker column (such as primary key ID) alongside non-unique fields like created_at to avoid skipped rows when timestamps match.',
    ],
    followUpQuestions: [
      'How would you encode and decode cursor tokens using base64 for public API clients?',
    ],
  },
  {
    id: 'be-api-rate-limiting',
    title: 'Rate Limiting Algorithms & Distributed Protection',
    subtitle: 'Token Bucket, Leaky Bucket, Sliding Window Counter, Redis multi-instance',
    phase: 'phase-2-backend',
    category: 'REST API & Express',
    priority: 'P1',
    estimatedMins: 12,
    theGist:
      'Rate limiting protects services from DDoS, scraping, and runaway scripts. Sliding window counters provide smooth rate limiting without the burst anomalies of fixed windows.',
    howItWorks:
      '1. Fixed Window: Counts requests in 1-minute blocks. Vulnerable to 2x burst traffic at window boundaries. 2. Token Bucket: Bucket fills with tokens at constant refill rate; each request consumes a token; allows configured bursts up to bucket capacity. 3. Sliding Window Log: Stores request timestamps in Redis Sorted Set (ZSET); removes timestamps older than now - window; counts remaining; memory heavy. 4. Sliding Window Counter: Approximates rate by weighting previous window’s count + current window count; lightweight and burst-resistant.',
    practicalExample: {
      title: 'Redis Sliding Window Counter Lua Script',
      language: 'lua',
      code: `-- Atomic Redis sliding window counter Lua script
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local clearBefore = now - window

-- Remove timestamps older than window
redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)
local currentRequests = redis.call('ZCARD', key)

if currentRequests < limit then
  redis.call('ZADD', key, now, now)
  redis.call('EXPIRE', key, math.ceil(window / 1000))
  return 1 -- Allowed
else
  return 0 -- Rate limited
end`,
    },
    interviewAnswer:
      'Rate limiting safeguards APIs by throttling incoming traffic per IP, API key, or user ID. In distributed systems with multiple Node instances, local in-memory counters fail because traffic distributes across nodes. We use a centralized Redis store with Lua scripts to guarantee atomicity. The Sliding Window Counter or Token Bucket algorithms ensure smooth traffic flow, returning HTTP 429 Too Many Requests along with Retry-After and X-RateLimit headers.',
    tradeoffsAndGotchas: [
      'Race conditions: Incrementing and checking Redis keys in two separate Node commands allows requests to slip past the limit under high concurrency. Always use atomic Lua scripts or MULTI/EXEC.',
      'Reverse proxies: Always extract client IP from validated req.headers["x-forwarded-for"] behind a trusted proxy.',
    ],
    followUpQuestions: [
      'How do you handle rate limit bypass for internal microservices vs external public clients?',
    ],
  },

  // ==========================================
  // AUTHENTICATION, AUTHORIZATION & SECURITY
  // ==========================================
  {
    id: 'be-auth-jwt-refresh-rotation',
    title: 'JWT Authentication & Refresh Token Rotation',
    subtitle: 'Access token vs Refresh token, token theft detection, HttpOnly cookies, replay prevention',
    phase: 'phase-2-backend',
    category: 'Authentication & Security',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'Short-lived Access Tokens (15m) authenticate API requests statelessly; long-lived Refresh Tokens (7d) rotate on every use. Reusing an old refresh token signals theft and invalidates the entire session family.',
    howItWorks:
      '1. Login: Server generates short-lived Access JWT (in memory or auth header) and cryptographically random Refresh Token stored in HttpOnly, Secure, SameSite=Lax cookie and saved in DB/Redis with a family ID. 2. When Access JWT expires: Client calls /auth/refresh with cookie. 3. Server checks DB: if refresh token is valid, it marks it as used, generates a NEW refresh token and new access token, and updates DB. 4. If an ALREADY-USED refresh token is submitted: Server detects replay attack (token theft), revokes all refresh tokens in that family immediately, and forces the user to log in again.',
    practicalExample: {
      title: 'Refresh Token Rotation Architecture',
      language: 'typescript',
      code: `async function handleRefreshTokenRotation(presentedToken: string) {
  const tokenRecord = await db.refreshTokens.findOne({ token: presentedToken });

  if (!tokenRecord) {
    throw new UnauthorizedError('Invalid token');
  }

  // REPLAY ATTACK DETECTION:
  if (tokenRecord.isRevoked) {
    // A revoked token was submitted again! Malicious actor has intercepted it!
    // Invalidate ALL tokens belonging to this family:
    await db.refreshTokens.updateMany(
      { familyId: tokenRecord.familyId },
      { $set: { isRevoked: true } }
    );
    throw new SecurityCompromiseError('Session hijacked. Please log in again.');
  }

  // Mark current token as consumed
  await db.refreshTokens.updateOne({ _id: tokenRecord._id }, { $set: { isRevoked: true } });

  // Issue new token in same family
  const newToken = crypto.randomBytes(40).toString('hex');
  await db.refreshTokens.insertOne({
    token: newToken,
    userId: tokenRecord.userId,
    familyId: tokenRecord.familyId,
    isRevoked: false,
    expiresAt: new Date(Date.now() + 7 * 86400000)
  });

  const newAccessToken = generateAccessJWT(tokenRecord.userId);
  return { newAccessToken, newRefreshToken: newToken };
}`,
    },
    interviewAnswer:
      'Stateless JWTs cannot be revoked instantly without maintaining a distributed denylist, which negates their stateless benefit. To balance security and scalability, we issue short-lived access JWTs (10–15 minutes) paired with rotating refresh tokens stored in HttpOnly, Secure cookies. Each refresh request yields a fresh refresh token and revokes the previous one. If a consumed refresh token is presented again, the server detects a token theft replay attack and immediately terminates the entire session family, protecting user accounts.',
    tradeoffsAndGotchas: [
      'Storing access JWTs in browser localStorage exposes them to theft via XSS vulnerabilities; storing in HttpOnly cookies protects against XSS but requires SameSite flags to protect against CSRF.',
      'Include minimal claims in JWT payloads (userId, role); never store sensitive data like passwords or PII in unencrypted JWTs.',
    ],
    followUpQuestions: [
      'What is the difference between symmetric HMAC signing (HS256) and asymmetric RSA/ECDSA (RS256) for microservices?',
      'How does OAuth 2.0 PKCE (Proof Key for Code Exchange) prevent authorization code interception in Single Page Apps?',
    ],
  },
  {
    id: 'be-auth-rbac-engine',
    title: 'Role-Based Access Control (RBAC) & Permission Middleware',
    subtitle: 'Roles, granular permissions, resource-level ownership, Express middleware',
    phase: 'phase-2-backend',
    category: 'Authentication & Security',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'RBAC decouples users from actions by assigning permissions to roles, and roles to users. Authorization middleware verifies both generic permissions and resource-level ownership (preventing IDOR).',
    howItWorks:
      'Authentication establishes WHO the user is (req.user). Authorization establishes WHAT they are allowed to do. Roles (Admin, Approver, Viewer) aggregate permissions (agreements:approve, orders:read). Middleware checks permission sets. Crucially, resource ownership checks (e.g. order.userId === req.user.id) must accompany role checks to prevent Insecure Direct Object Reference (IDOR) attacks.',
    practicalExample: {
      title: 'Composable Permission & Ownership Guard',
      language: 'typescript',
      code: `function requirePermission(requiredPerm: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
    if (!req.user.permissions.includes(requiredPerm)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
}

// Ownership check preventing IDOR:
async function requireOrderOwnership(req: Request, res: Response, next: NextFunction) {
  const order = await orderService.getById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  
  // Admin can view all, otherwise must own the resource
  if (req.user.role !== 'ADMIN' && order.customerId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden: Access denied to this order' });
  }
  req.order = order;
  next();
}`,
    },
    interviewAnswer:
      'RBAC assigns fine-grained permissions to roles rather than hardcoding role checks throughout controllers. In Express, we use middleware factories (requirePermission("agreement:write")) to validate user capabilities before executing business logic. Furthermore, to guard against IDOR vulnerabilities, every endpoint accepting a resource ID checks whether the requester owns that resource or possesses an administrative override before modifying data.',
    tradeoffsAndGotchas: [
      'Role explosions: When roles proliferate (FinanceL1, FinanceL2, HRApprover), transition to Attribute-Based Access Control (ABAC) where policies evaluate context (e.g. approvalAmount <= $10,000).',
    ],
    followUpQuestions: [
      'How did you structure the L1-L3 approval engine permissions and state transitions in your Probo project?',
    ],
  },

  // ==========================================
  // MONGODB & DATABASE CONCEPTS
  // ==========================================
  {
    id: 'be-db-mongo-modeling-embed-ref',
    title: 'MongoDB Schema Design: Embedding vs Referencing',
    subtitle: 'Bounded data vs 1:N growth, 16MB document limit, access pattern modeling',
    phase: 'phase-2-backend',
    category: 'Databases & MongoDB',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'In MongoDB, embed data when entities are read together and bounded in size (e.g. Order Items in an Order). Reference when data is unbounded (e.g. Order Logs, User Comments) or independently queried.',
    howItWorks:
      'MongoDB imposes a strict 16MB document size limit. Embedding provides atomic reads and writes in a single disk seek with zero joins. However, embedding unbounded arrays (e.g., an array of logs that grows indefinitely) causes document growth, fragmenting memory and eventually hitting the 16MB ceiling. Referencing stores separate documents linked by ObjectId, queried using $lookup or application-level joins, trading write performance for normalization and flexibility.',
    practicalExample: {
      title: 'Order Schema: Embedding Items, Referencing Customer',
      language: 'javascript',
      code: `// Embedded for Bounded 1:Few (Order Items belong exclusively to this order)
const OrderSchema = {
  _id: new ObjectId(),
  orderNumber: "VS-84920",
  customerId: new ObjectId("64a8b..."), // Reference to Customer collection
  status: "CONFIRMED",
  items: [ // Embedded: Bounded array, never exceeds ~50 items, read together
    { productId: new ObjectId("..."), title: "Sony WH-1000XM5", price: 29990, qty: 1 }
  ],
  pricing: { subtotal: 29990, tax: 5398, total: 35388 },
  createdAt: new Date()
};`,
    },
    interviewAnswer:
      'In MongoDB, schema design is dictated by application query access patterns rather than relational normalization. We embed when child data is strictly bounded and frequently read/written alongside the parent document (such as line items within an e-commerce order). We use references when relationships are 1-to-many unbounded (e.g. logs, comments), when entities are queried independently (e.g. product catalog), or when data changes frequently across multiple contexts to avoid updating thousands of denormalized documents.',
    tradeoffsAndGotchas: [
      'Denormalizing historical data is intentional: line items should embed the product price at the exact moment of purchase so future price edits do not retroactively alter completed orders.',
      'Avoid 1:N relationships where the parent embeds an unbounded array of ObjectIds (e.g. user.orderIds); instead, use child referencing (order.userId).',
    ],
    followUpQuestions: [
      'What are the performance costs of MongoDB $lookup compared to PostgreSQL native relational JOINs?',
    ],
  },
  {
    id: 'be-db-mongo-indexing-compound',
    title: 'MongoDB Indexes & The ESR Rule',
    subtitle: 'Equality, Sort, Range order, COLLSCAN vs IXSCAN, explain() analysis',
    phase: 'phase-2-backend',
    category: 'Databases & MongoDB',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'Indexes provide B-Tree pointers to documents, transforming slow COLLSCAN (full table scans) into fast IXSCAN lookups. The ESR rule dictates compound index ordering: Equality fields first, then Sort fields, then Range fields.',
    howItWorks:
      'When executing db.orders.find({ status: "PAID", createdAt: { $gte: date } }).sort({ total: -1 }): 1) Equality (=) filters exact values (status: 1); 2) Sort (total: -1) ensures matching entries are already ordered in index nodes, avoiding expensive in-memory sort; 3) Range (<, >, $in) filters values last. If range preceded sort, the B-Tree sort order would be interrupted, forcing the database engine to perform an in-memory blocking sort.',
    practicalExample: {
      title: 'Compound Index with ESR Rule',
      language: 'javascript',
      code: `// Query:
// find({ status: "ACTIVE", price: { $gte: 1000, $lte: 5000 } }).sort({ rating: -1 })

// Correct Compound Index adhering to E -> S -> R:
// 1. Equality: status
// 2. Sort: rating
// 3. Range: price
db.products.createIndex({ status: 1, rating: -1, price: 1 });

// Verification with explain():
const plan = db.products.find({
  status: "ACTIVE",
  price: { $gte: 1000, $lte: 5000 }
}).sort({ rating: -1 }).explain("executionStats");

console.log(plan.executionStats.totalDocsExamined); // Should match nReturned
console.log(plan.queryPlanner.winningPlan.stage);   // "IXSCAN", not "COLLSCAN"`,
    },
    interviewAnswer:
      'Without indexes, MongoDB scans every document in a collection (COLLSCAN). An index creates a sorted B-Tree structure for logarithmic lookups (IXSCAN). For compound indexes, we strictly adhere to the ESR rule: Equality fields first, Sort fields second, and Range fields third. Equality fields narrow down the index subtree; having Sort next allows the engine to retrieve documents in pre-sorted order without exceeding the 32MB in-memory sort limit; Range fields are filtered last without breaking sort order.',
    tradeoffsAndGotchas: [
      'Every index speeds up queries but degrades write latency (insert/update/delete) because all associated B-Trees must be updated synchronously.',
      'Indexes on low-cardinality fields alone (e.g. boolean isVerified) are inefficient because the engine still has to examine roughly 50% of the collection.',
    ],
    followUpQuestions: [
      'What is an Index Prefix in MongoDB, and why does an index on { a: 1, b: 1, c: 1 } cover queries on { a } and { a, b }, but not { b, c }?',
      'What is a Covered Query in MongoDB?',
    ],
  },
  {
    id: 'be-db-mongo-transactions-atomic',
    title: 'Atomic Document Updates vs Multi-Document Transactions',
    subtitle: '$inc, $set, findOneAndUpdate, ACID transactions across collections',
    phase: 'phase-2-backend',
    category: 'Databases & MongoDB',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'In MongoDB, all modifications to a single document are natively atomic. Multi-document transactions provide ACID guarantees across multiple collections but incur significant performance overhead.',
    howItWorks:
      'Single document atomicity means concurrent writes to the same document never interleave or corrupt data. Operations like findOneAndUpdate with conditional filters (e.g. { _id, stock: { $gte: qty } }, { $inc: { stock: -qty } }) prevent race conditions natively without transactions. For operations that must span multiple documents or collections (e.g. transferring balances between two accounts), MongoDB supports multi-document transactions using replica sets via session.withTransaction().',
    practicalExample: {
      title: 'Conditional Atomic Write vs Multi-Doc Transaction',
      language: 'javascript',
      code: `// 1. Atomic Single-Doc Inventory Reservation (Fast, O(1), No locks):
const reserved = await db.collection('inventory').findOneAndUpdate(
  { productId: id, availableStock: { $gte: requestedQty } },
  { $inc: { availableStock: -requestedQty, reservedStock: requestedQty } },
  { returnDocument: 'after' }
);
if (!reserved) throw new Error('Out of stock - Race condition avoided!');

// 2. Multi-Document Transaction across Orders and Accounts:
const session = client.startSession();
try {
  await session.withTransaction(async () => {
    await orders.insertOne([{ ...orderData }], { session });
    await wallets.updateOne({ userId }, { $inc: { balance: -amount } }, { session });
  });
} finally {
  await session.endSession();
}`,
    },
    interviewAnswer:
      'In MongoDB, every update to a single document is inherently atomic. By designing schemas to embed related state, we can use conditional atomic operators like findOneAndUpdate and $inc to handle inventory reservations or status transitions without locks or transactions. When cross-collection consistency is non-negotiable, we use multi-document ACID transactions via sessions. However, transactions hold write locks across replica sets, increasing latency and risk of write conflicts under high throughput.',
    tradeoffsAndGotchas: [
      'Transactions cannot execute against standalone MongoDB servers; a replica set is required.',
      'Transactions timing out: MongoDB transactions abort automatically if they run longer than transactionLifetimeLimitSeconds (default 60 seconds).',
    ],
    followUpQuestions: [
      'How does optimistic concurrency control with a version field (__v) prevent lost updates in MongoDB?',
    ],
  },

  // ==========================================
  // THIRD-PARTY APIS, MESSAGING & WEBHOOKS
  // ==========================================
  {
    id: 'be-webhooks-idempotent-receiver',
    title: 'Idempotent Webhook Processing & Security',
    subtitle: 'HMAC signature verification, raw request body, replay protection, event deduplication',
    phase: 'phase-2-backend',
    category: 'Webhooks & Messaging',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'Webhooks deliver asynchronous event notifications (payments, order updates). Receivers must verify HMAC signatures using raw payload bytes, record event IDs atomically, and safely deduplicate retried events.',
    howItWorks:
      '1. Verification: Third parties (Stripe, Razorpay, OMS) sign the payload using HMAC-SHA256 with a shared secret, passing the signature in a header. The receiver computes the HMAC over the RAW (unparsed) request body and compares using crypto.timingSafeEqual to prevent timing attacks. 2. Deduplication: The receiver inserts the external event ID into a processed_events table with a unique constraint. If a duplicate arrives, the database throws a unique constraint violation, and the server returns HTTP 200 OK immediately without re-processing business logic. 3. Fast ACK: Acknowledge with 200 OK fast and push work to an async background worker queue.',
    practicalExample: {
      title: 'Production Webhook Receiver Flow',
      language: 'typescript',
      code: `import crypto from 'crypto';

export async function handleWebhook(req: Request, res: Response) {
  const signature = req.headers['x-webhook-signature'] as string;
  const rawBody = (req as any).rawBody; // Unparsed Buffer

  // 1. Timing-safe signature verification
  const expectedSig = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET!)
    .update(rawBody)
    .digest('hex');

  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSig)
  );
  if (!isValid) return res.status(401).send('Invalid signature');

  const { eventId, eventType, data } = JSON.parse(rawBody.toString());

  // 2. Atomic Event Deduplication via Database Unique Index
  try {
    await db.processedEvents.insertOne({
      eventId,
      eventType,
      receivedAt: new Date()
    });
  } catch (err: any) {
    if (err.code === 11000) { // MongoDB duplicate key code
      // Duplicate event already processed! Return 200 OK to stop retries.
      return res.status(200).json({ status: 'Already processed' });
    }
    throw err;
  }

  // 3. Enqueue for background worker processing
  await eventQueue.add('process-order-status', { eventId, data });
  
  // 4. Fast ACK to prevent provider retry timeouts
  return res.status(200).json({ received: true });
}`,
    },
    interviewAnswer:
      'A secure webhook receiver requires three non-negotiables: 1) Signature Verification using HMAC-SHA256 and timing-safe equality on the raw unparsed request buffer to verify authenticity and integrity; 2) Atomic Deduplication using a unique constraint on the provider’s event ID so duplicate deliveries (caused by network retries) are safely ignored; 3) Fast Acknowledgement (HTTP 200 within <200ms) by queuing the payload into BullMQ/Redis or RabbitMQ for asynchronous worker processing to prevent provider timeouts.',
    tradeoffsAndGotchas: [
      'Parsing request body with express.json() before HMAC verification mutates whitespace and key order, causing signature mismatch. Always capture raw request body buffer.',
      'Always return HTTP 200 for recognized duplicate events; returning 400 or 500 causes the provider to keep retrying indefinitely.',
    ],
    followUpQuestions: [
      'What is the Transactional Outbox Pattern and how does it guarantee that database state changes and outbound event publishing stay synchronized?',
    ],
  },
  {
    id: 'be-retries-exponential-backoff',
    title: 'Retry Policies: Exponential Backoff & Full Jitter',
    subtitle: 'Transient vs permanent failures, thundering herd problem, retry budgets',
    phase: 'phase-2-backend',
    category: 'Webhooks & Messaging',
    priority: 'P0',
    estimatedMins: 10,
    theGist:
      'Retrying failed requests immediately can overwhelm recovering servers. Exponential backoff increases delays exponentially, while random jitter decorrelates retry spikes (preventing thundering herd).',
    howItWorks:
      'Delay formula: delay = min(maxDelay, baseDelay * 2^attempt). Full jitter picks a random value between 0 and delay: sleep = Math.random() * delay. Only transient errors (HTTP 429, 502, 503, 504, connection timeouts) should be retried. Permanent errors (HTTP 400 Bad Request, 401 Unauthorized, 404 Not Found) should fail immediately without retries.',
    practicalExample: {
      title: 'Exponential Backoff with Full Jitter',
      language: 'javascript',
      code: `async function retryWithBackoff(fn, retries = 3, baseDelay = 100, maxDelay = 3000) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const isTransient = err.status >= 500 || err.status === 429 || err.code === 'ECONNRESET';
      if (!isTransient || attempt === retries - 1) {
        throw err; // Permanent error or exhausted retries
      }

      // Exponential delay with Full Jitter
      const exponential = Math.min(maxDelay, baseDelay * Math.pow(2, attempt));
      const jitterDelay = Math.random() * exponential;
      
      console.warn(\`Attempt \${attempt + 1} failed. Retrying in \${Math.round(jitterDelay)}ms...\`);
      await new Promise(resolve => setTimeout(resolve, jitterDelay));
    }
  }
}`,
    },
    interviewAnswer:
      'When integrating with third-party APIs (WhatsApp gateways, payment providers), blind retries cause cascading server crashes through the thundering herd problem. We classify errors into transient and permanent: only transient errors (5xx, timeouts, 429) are retried. We apply exponential backoff combined with full jitter (randomizing sleep within the exponential ceiling) so thousands of concurrent retrying clients spread out across time rather than hitting the backend in synchronized waves.',
    tradeoffsAndGotchas: [
      'Always set an overall timeout (via AbortController) across all retry attempts combined to avoid hanging indefinitely.',
      'Check for HTTP 429 Retry-After headers and honor provider-specified cool-off intervals.',
    ],
    followUpQuestions: [
      'What is a Circuit Breaker pattern and when should it trip to prevent calling a failing dependency?',
    ],
  },
];
