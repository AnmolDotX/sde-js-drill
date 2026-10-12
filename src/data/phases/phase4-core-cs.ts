import { TopicItem } from '../types';

export const phase4Topics: TopicItem[] = [
  // ==========================================
  // DBMS & ADVANCED DATABASE CONCEPTS
  // ==========================================
  {
    id: 'db-acid-isolation-levels',
    title: 'ACID Properties & Transaction Isolation Levels',
    subtitle: 'Dirty reads, non-repeatable reads, phantom reads, Read Committed vs Serializable',
    phase: 'phase-4-core-cs',
    category: 'DBMS & SQL',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'ACID guarantees database reliability. Isolation levels determine how concurrent transactions view uncommitted or newly committed changes, balancing data correctness against concurrency throughput.',
    howItWorks:
      '1. Atomicity: All operations succeed, or all roll back. 2. Consistency: Database transitions from one valid state to another, enforcing constraints. 3. Isolation: Transactions execute independently without interleaving anomalies. 4. Durability: Once committed, data survives power failures or crashes (WAL log). Concurrency Anomalies: Dirty Read (reading uncommitted changes that roll back); Non-Repeatable Read (re-reading same row yields changed values); Phantom Read (re-running query yields newly inserted rows). Standard Isolation Levels: Read Uncommitted (allows dirty reads) -> Read Committed (default in PG/Oracle; no dirty reads) -> Repeatable Read (default in MySQL InnoDB; snapshot read) -> Serializable (strict serialization; eliminates all anomalies via 2-phase locking or SSI).',
    practicalExample: {
      title: 'PostgreSQL Isolation Level Configuration',
      language: 'sql',
      code: `-- Set transaction isolation level
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;

SELECT balance FROM accounts WHERE user_id = 42;
-- In Repeatable Read, another transaction committing an update
-- will NOT change the balance read by this transaction.

COMMIT;`,
    },
    interviewAnswer:
      'ACID defines the foundational guarantees of relational databases: Atomicity via rollback logs, Consistency via schema constraints, Isolation via MVCC and locks, and Durability via write-ahead logging (WAL). The four SQL isolation levels trade consistency for concurrency throughput. Most production systems use Read Committed or Repeatable Read using Multi-Version Concurrency Control (MVCC) to avoid blocking reads while preventing dirty and non-repeatable reads. Serializable guarantees perfect correctness but risks serialization failures under high concurrent write loads.',
    tradeoffsAndGotchas: [
      'PostgreSQL does not implement Read Uncommitted: specifying Read Uncommitted automatically behaves as Read Committed.',
      'In MongoDB, multi-document transactions default to "snapshot" isolation level.',
    ],
    followUpQuestions: [
      'How does Multi-Version Concurrency Control (MVCC) allow non-blocking concurrent reads and writes in PostgreSQL?',
      'What is write skew anomaly and which isolation level prevents it?',
    ],
  },
  {
    id: 'db-normalization-vs-denormalization',
    title: 'Database Normalization (1NF, 2NF, 3NF) vs Denormalization',
    subtitle: 'Functional dependencies, data anomalies, read vs write performance trade-offs',
    phase: 'phase-4-core-cs',
    category: 'DBMS & SQL',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'Normalization organizes data to eliminate update, insertion, and deletion anomalies. Denormalization intentionally reintroduces redundancy to accelerate complex read queries at scale.',
    howItWorks:
      '1. 1NF (First Normal Form): Atomic values (no arrays or comma-separated lists in cells), unique primary key. 2. 2NF: Must be in 1NF, and all non-key columns must depend on the ENTIRE primary key (eliminates partial dependency in composite keys). 3. 3NF: Must be in 2NF, and no non-key column depends on another non-key column (eliminates transitive dependencies). When scaling reads: Joining 6 normalized tables under 50,000 req/sec bottlenecks database CPU. Denormalizing (e.g., storing customer_name directly inside the orders table) trades extra write maintenance for fast single-table reads.',
    practicalExample: {
      title: '3NF vs Denormalized Read Model',
      language: 'sql',
      code: `-- 3NF (Normalized):
-- orders (id, customer_id, total)
-- customers (id, name, email, city_id)
-- cities (id, name, state)
-- Query requires 3 JOINs!

-- Denormalized for Fast Read Analytics:
CREATE TABLE order_read_summaries (
  order_id UUID PRIMARY KEY,
  customer_name VARCHAR(100),
  customer_city VARCHAR(100),
  total_amount NUMERIC(10,2),
  created_at TIMESTAMPTZ
);
-- Fast single-row lookup without JOIN overhead!`,
    },
    interviewAnswer:
      'Normalization (1NF through 3NF) systematically decomposes tables to eliminate data redundancy and prevent insertion, update, and deletion anomalies. In OLTP systems, 3NF is standard for write integrity. However, in high-throughput read-heavy applications, multi-table JOINs become expensive bottlenecks. We strategically denormalize data by storing precomputed aggregates (e.g. product review ratings) or point-in-time snapshots (e.g. order item pricing) to enable single-table index scans.',
    tradeoffsAndGotchas: [
      'Denormalization requires application or event-driven mechanisms (like CDC or message queues) to keep duplicated data in sync when the primary entity updates.',
      'Order line items MUST store product purchase-time prices—this is not just denormalization, it is an immutable business requirement.',
    ],
    followUpQuestions: [
      'What anomalies occur if a table violates Second Normal Form (2NF)?',
    ],
  },
  {
    id: 'db-cache-aside-redis',
    title: 'Cache-Aside Pattern, Redis & Cache Consistency',
    subtitle: 'Read/write flow, cache stampede, TTL, dual-write consistency problem',
    phase: 'phase-4-core-cs',
    category: 'DBMS & SQL',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'In Cache-Aside, the application queries Redis first; on a miss, it fetches from the DB, populates the cache with a TTL, and returns. On writes, the application updates the DB and deletes the cached key.',
    howItWorks:
      'Read Flow: 1) App checks Redis: if hit, return immediately; 2) If miss, read from primary database; 3) Write to Redis with a TTL; 4) Return data. Write Flow: 1) Update primary database first; 2) Invalidate (delete) the cache entry in Redis. Deleting is preferred over updating the cache directly because updating can introduce race conditions if two writes complete out of order. Cache Stampede (Thundering herd): Occurs when a popular key expires and thousands of requests hit the DB at once. Mitigated using mutex locks (Redlock) or probabilistic early expiration (XFetch).',
    practicalExample: {
      title: 'Production Cache-Aside Implementation',
      language: 'typescript',
      code: `async function getProductById(productId: string) {
  const cacheKey = \`product:\${productId}\`;
  
  // 1. Check Redis
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // 2. Fetch from Primary Database on cache miss
  const product = await db.products.findById(productId);
  if (!product) return null;

  // 3. Populate cache with 15-minute TTL + random jitter to prevent simultaneous expiry
  const ttl = 900 + Math.floor(Math.random() * 60);
  await redis.set(cacheKey, JSON.stringify(product), 'EX', ttl);

  return product;
}

async function updateProduct(productId: string, updateData: any) {
  // 1. Update database first
  await db.products.updateOne({ _id: productId }, { $set: updateData });
  
  // 2. Invalidate cache key (delete, don't overwrite!)
  await redis.del(\`product:\${productId}\`);
}`,
    },
    interviewAnswer:
      'The Cache-Aside pattern decouples the cache from the database, giving the application explicit control. Reads check Redis first, falling back to the database and backfilling the cache with a TTL. On writes, we commit changes to the primary database first and delete the Redis key rather than updating it, avoiding write-ordering race conditions. To prevent cache stampedes when popular keys expire, we add random jitter to TTL durations and employ distributed locks on cache misses.',
    tradeoffsAndGotchas: [
      'Dual-write failure: If the database write succeeds but the Redis deletion fails (e.g. network partition), stale data remains in cache until TTL expires. A message queue or Transactional Outbox pattern guarantees eventual cache invalidation.',
    ],
    followUpQuestions: [
      'What is the difference between Cache-Aside, Read-Through, and Write-Behind caching patterns?',
    ],
  },

  // ==========================================
  // OPERATING SYSTEMS FOR BACKEND SDEs
  // ==========================================
  {
    id: 'os-process-thread-memory',
    title: 'Operating Systems: Process vs Thread & Memory Allocation',
    subtitle: 'Address spaces, context switches, stack vs heap, RSS vs V8 heap',
    phase: 'phase-4-core-cs',
    category: 'Operating Systems',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'A Process has its own isolated virtual address space; Threads live inside a process and share memory. In Node.js, V8 manages heap memory, while total OS memory is measured as Resident Set Size (RSS).',
    howItWorks:
      '1. Process Isolation: Each process has its own page table, heap, stack, and file descriptors. Inter-Process Communication (IPC) requires pipes, sockets, or shared memory. 2. Threads: Lightweight units of execution within a process that share the heap and code segment, each having its own call stack. Context-switching between threads is much cheaper than between processes. 3. Memory Structure: Stack stores primitive variables and function frames (fast, LIFO, auto-deallocated); Heap stores dynamically allocated objects (managed by garbage collection). 4. In Node.js: process.memoryUsage() reports rss (total RAM allocated to the process by OS), heapTotal (V8 allocated memory), and heapUsed (actively utilized objects).',
    practicalExample: {
      title: 'Node.js Memory Monitoring & OOM Warning',
      language: 'javascript',
      code: `function logMemoryHealth() {
  const { rss, heapTotal, heapUsed, external } = process.memoryUsage();
  const toMB = (bytes) => Math.round((bytes / 1024 / 1024) * 100) / 100;

  console.log({
    rss: \`\${toMB(rss)} MB\`,           // Total memory held in OS RAM
    heapTotal: \`\${toMB(heapTotal)} MB\`, // V8 memory reserved
    heapUsed: \`\${toMB(heapUsed)} MB\`,   // Memory currently occupied by JS objects
    external: \`\${toMB(external)} MB\`,   // Memory held by C++ bindings (Buffers)
  });
}
logMemoryHealth();`,
    },
    interviewAnswer:
      'A process is an isolated executing program instance with its own virtual memory space, file descriptors, and security context. A thread is an execution unit within a process; threads share the heap and process memory while retaining private execution stacks. Node.js executes JavaScript on a single main thread, delegating blocking tasks to libuv threads or worker threads. Memory-wise, the stack stores execution frames while the heap stores objects. Understanding RSS versus heapUsed is critical in Docker containers: if a process exceeds container memory limits, the Linux kernel Out-Of-Memory (OOM) killer abruptly terminates it with SIGKILL.',
    tradeoffsAndGotchas: [
      'Buffers in Node.js are allocated outside V8 heap memory in C++ memory (reported under "external"); a memory leak in Buffers will increase RSS without showing up in heapUsed.',
      'Worker threads in Node share memory via SharedArrayBuffer, requiring Atomics for safe synchronization.',
    ],
    followUpQuestions: [
      'What causes Linux kernel Out-Of-Memory (OOM) killer to terminate a container with exit code 137?',
    ],
  },
  {
    id: 'os-nonblocking-io-file-descriptors',
    title: 'Non-Blocking I/O, Sockets & File Descriptors',
    subtitle: 'Linux file descriptors, epoll/kqueue, EMFILE errors, socket limits',
    phase: 'phase-4-core-cs',
    category: 'Operating Systems',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'In Linux, everything is a file. Network sockets and open files are tracked as File Descriptors (FDs). Non-blocking I/O uses OS multiplexing (epoll) so a single thread can monitor thousands of active sockets simultaneously.',
    howItWorks:
      'In traditional blocking I/O, a thread reading from a socket blocks until bytes arrive, requiring 1 thread per client (C10K problem). In non-blocking I/O, Node.js registers file descriptors with the OS event multiplexer (epoll on Linux, kqueue on macOS). The OS notifies libuv when data is ready on any socket, allowing a single thread to handle tens of thousands of concurrent connections. Each process has an open file descriptor limit (ulimit -n, default often 1024); exceeding this causes fatal "EMFILE: too many open files" errors.',
    practicalExample: {
      title: 'Diagnosing Open Sockets & Limits',
      language: 'bash',
      code: `# Check current process file descriptor limit:
ulimit -n

# Check open file descriptors and sockets for a running Node process PID:
lsof -p <PID> | wc -l

# View active TCP network connections:
ss -s`,
    },
    interviewAnswer:
      'In Unix-like systems, all I/O channels—files, pipes, TCP sockets—are represented as integer file descriptors. Node.js achieves high concurrency on a single thread through non-blocking I/O backed by libuv and OS event notification mechanisms like epoll on Linux. Rather than dedicating a thread per connection, epoll monitors thousands of registered file descriptors and wakes up the event loop only when I/O is ready. In production, tuning file descriptor limits (ulimit -n) is essential to prevent EMFILE socket starvation under load.',
    tradeoffsAndGotchas: [
      'Leaking unclosed database connections or dangling HTTP Agent sockets will rapidly exhaust process file descriptors, causing all new incoming requests to be dropped.',
    ],
    followUpQuestions: [
      'What is the difference between synchronous file reading (fs.readFileSync) and asynchronous non-blocking network socket reads in Node.js?',
    ],
  },

  // ==========================================
  // COMPUTER NETWORKING
  // ==========================================
  {
    id: 'net-url-to-page-lifecycle',
    title: 'Networking: What Happens When You Enter a URL in the Browser',
    subtitle: 'DNS, TCP 3-way handshake, TLS 1.3, HTTP request, reverse proxy, DOM/CSSOM render',
    phase: 'phase-4-core-cs',
    category: 'Computer Networking',
    priority: 'P0',
    estimatedMins: 15,
    theGist:
      'Traces the complete lifecycle from entering a URL to the browser painting pixels: DNS resolution -> TCP handshake -> TLS negotiation -> HTTP request -> reverse proxy routing -> backend processing -> browser rendering pipeline.',
    howItWorks:
      '1. DNS Resolution: Browser checks local cache -> OS hosts cache -> recursive resolver -> Root DNS -> TLD (.com) -> Authoritative Nameserver; returns IP. 2. TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK. 3. TLS Handshake: ClientHello (supported ciphers) -> ServerHello (certificate, public key) -> Session Key exchange (TLS 1.3 completes in 1 RTT). 4. HTTP Request: Browser sends GET request with headers (User-Agent, Cookies). 5. Infrastructure: Request hits CDN/Load Balancer -> Reverse Proxy (Nginx) -> Node.js service. 6. Response: HTTP 200 returned with HTML payload. 7. Browser Rendering: Parses HTML into DOM, parses CSS into CSSOM, combines into Render Tree, executes Layout (reflow), Paint, and Composite steps.',
    practicalExample: {
      title: 'The Network & Rendering Sequence',
      language: 'markdown',
      code: `[Browser] -> (DNS Query: A Record) -> [DNS Server]
[Browser] <-> (SYN / SYN-ACK / ACK) <-> [Server TCP]
[Browser] <-> (ClientHello / ServerHello / KeyExchange) <-> [Server TLS]
[Browser] ---> HTTP GET /index.html ---> [Nginx Load Balancer]
                                             |
                                             v
                                        [Node.js Express]
[Browser] <--- 200 OK (HTML stream) <--- [Nginx]
[Browser] parses DOM + CSSOM -> Render Tree -> Layout -> Paint`,
    },
    interviewAnswer:
      'When a user enters a URL like "vijaysales.com", the browser first resolves the domain to an IP address through hierarchical DNS lookup (browser cache, OS cache, resolver, authoritative nameserver). Next, it establishes a reliable connection via the TCP 3-way handshake (SYN, SYN-ACK, ACK), followed by TLS 1.3 handshake to establish encrypted symmetric session keys. The browser then dispatches the HTTP request, which reaches an edge CDN or reverse proxy load balancer, routing to the backend service. Once HTML arrives, the browser engine constructs the DOM and CSSOM trees, combines them into a Render Tree, computes layout coordinates, and paints pixels onto the screen.',
    tradeoffsAndGotchas: [
      'DNS caching: DNS records respect TTLs; setting TTL too high delays deployment switchovers, while too low increases lookup latency.',
      'Connection reuse: HTTP/1.1 Keep-Alive and HTTP/2 multiplexing eliminate repeating the TCP/TLS handshakes for subsequent asset requests.',
    ],
    followUpQuestions: [
      'How does HTTP/2 multiplexing eliminate the Head-of-Line blocking problem inherent in HTTP/1.1?',
    ],
  },
  {
    id: 'net-cors-preflight',
    title: 'CORS, Preflight OPTIONS & Browser Same-Origin Policy',
    subtitle: 'Why Postman works but browser fails, Access-Control-Allow-Origin, credentials flag',
    phase: 'phase-4-core-cs',
    category: 'Computer Networking',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'Cross-Origin Resource Sharing (CORS) is a browser security mechanism, NOT an API firewall. Browsers block cross-origin responses unless the server explicitly grants permission via Access-Control headers.',
    howItWorks:
      'The Same-Origin Policy (SOP) restricts scripts on origin A (https://app.com) from reading responses from origin B (https://api.com). For non-simple requests (methods other than GET/POST/HEAD, or custom headers like Authorization or Content-Type: application/json), the browser automatically dispatches an HTTP preflight OPTIONS request asking the server for permission. The server must respond with Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers. If Access-Control-Allow-Credentials: true is needed, origin cannot be wildcard (*).',
    practicalExample: {
      title: 'Express CORS Configuration Done Right',
      language: 'javascript',
      code: `const cors = require('cors');

const allowedOrigins = ['https://vijaysales.com', 'https://admin.vijaysales.com'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server or mobile native requests without origin header
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true, // Allow cookies and authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Idempotency-Key']
}));`,
    },
    interviewAnswer:
      'CORS is enforced strictly by the browser to protect users from malicious sites reading private data from authenticated origins. This is why requests succeed in Postman or cURL (which do not enforce browser SOP) but fail in the browser. For requests with JSON bodies or auth tokens, browsers send an initial preflight OPTIONS request. The server must explicitly return Access-Control-Allow-Origin matching the client domain. If credentials (cookies) are permitted, the server must never return a wildcard (*) origin; it must echo the specific allowed origin.',
    tradeoffsAndGotchas: [
      'CORS does not stop the server from executing non-preflight requests! Simple POST requests are still dispatched and executed on the backend—the browser merely blocks the client JS from reading the response.',
    ],
    followUpQuestions: [
      'What headers make a request "simple" vs requiring a preflight OPTIONS request?',
    ],
  },
  {
    id: 'net-websockets-sse-polling',
    title: 'Real-Time Communication: WebSockets vs SSE vs Long Polling',
    subtitle: 'Full-duplex TCP vs unidirectional HTTP stream, live order tracking trade-offs',
    phase: 'phase-4-core-cs',
    category: 'Computer Networking',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'WebSockets provide persistent, full-duplex TCP communication. Server-Sent Events (SSE) offer unidirectional server-to-client HTTP streaming with native reconnection. Polling periodically queries endpoints.',
    howItWorks:
      '1. Short Polling: Client sends HTTP request every N seconds; high server overhead, high latency. 2. Long Polling: Client opens HTTP request; server holds it open until data is available, responds, and closes; client opens next request. 3. WebSockets (ws://): Starts as HTTP upgrade handshake; upgrades to a persistent, bidirectional binary/text TCP framing connection. Ideal for chat, collaborative whiteboards, multiplayer gaming. 4. Server-Sent Events (SSE): Standard HTTP GET with text/event-stream; lightweight, operates over HTTP/2, built-in browser reconnection via EventSource; unidirectional (server -> client). Ideal for live order status, sports scores, stock feeds.',
    practicalExample: {
      title: 'Server-Sent Events (SSE) in Express',
      language: 'javascript',
      code: `app.get('/api/orders/:id/live-status', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const sendEvent = (data) => {
    res.write(\`data: \${JSON.stringify(data)}\\n\\n\`);
  };

  // Subscribe to order updates from Redis pub/sub
  const unsubscribe = orderEmitter.subscribe(req.params.id, (update) => {
    sendEvent(update);
  });

  req.on('close', () => {
    unsubscribe();
    res.end();
  });
});`,
    },
    interviewAnswer:
      'For live order tracking, WebSockets provide full-duplex communication over a single TCP connection, but require custom reconnection protocols, heartbeat pings, and sticky load balancer sessions. Server-Sent Events (SSE) run on standard HTTP, support native automatic browser reconnects via EventSource, and multiplex seamlessly over HTTP/2 without sticky sessions. Because live order tracking is primarily unidirectional (server pushes rider coordinates to client), SSE or adaptive short-polling is often significantly lighter and more resilient than WebSockets on mobile networks.',
    resumeConnection:
      'Connects directly to Flipkart live order tracking coordinate updates.',
    tradeoffsAndGotchas: [
      'In HTTP/1.1, browsers enforce a limit of 6 concurrent SSE connections per domain; with HTTP/2, all streams multiplex over a single connection.',
    ],
    followUpQuestions: [
      'How does horizontal scaling with Redis Pub/Sub allow WebSockets or SSE connections across multiple Node.js server pods?',
    ],
  },

  // ==========================================
  // SOLID PRINCIPLES & CLEAN ARCHITECTURE
  // ==========================================
  {
    id: 'solid-principles-node',
    title: 'SOLID Principles in Practical TypeScript / Node.js',
    subtitle: 'Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion',
    phase: 'phase-4-core-cs',
    category: 'SOLID & Design Patterns',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'SOLID principles guide maintainable software design. In modern TypeScript, they ensure services are modular, extensible without breaking changes, and easily unit-testable.',
    howItWorks:
      '1. Single Responsibility (SRP): A class/module should have only one reason to change. Separate business validation from email notification delivery. 2. Open/Closed (OCP): Open for extension, closed for modification. Add new payment gateways by implementing a PaymentProvider interface rather than chaining if-else statements in checkout. 3. Liskov Substitution (LSP): Subtypes must be substitutable for their base types without altering correctness. 4. Interface Segregation (ISP): Clients should not depend on methods they do not use; prefer small, focused interfaces. 5. Dependency Inversion (DIP): High-level business logic must depend on abstractions (interfaces), not concrete implementations (e.g. OrderService depends on IOrderRepository, injected via constructor).',
    practicalExample: {
      title: 'Dependency Inversion & Open/Closed in Notification Service',
      language: 'typescript',
      code: `// Abstraction
interface INotificationProvider {
  channel: 'SMS' | 'WHATSAPP' | 'EMAIL';
  send(recipient: string, message: string): Promise<boolean>;
}

// Concrete Implementations (Open for extension)
class TwilioSmsProvider implements INotificationProvider {
  channel = 'SMS' as const;
  async send(recipient: string, message: string) { /* call Twilio */ return true; }
}

class MetaWhatsAppProvider implements INotificationProvider {
  channel = 'WHATSAPP' as const;
  async send(recipient: string, message: string) { /* call Meta Graph API */ return true; }
}

// High-level service depends on abstraction (DIP)
class NotificationService {
  constructor(private providers: Map<string, INotificationProvider>) {}

  async dispatch(channel: string, to: string, msg: string) {
    const provider = this.providers.get(channel);
    if (!provider) throw new Error(\`Unsupported channel \${channel}\`);
    return await provider.send(to, msg);
  }
}`,
    },
    interviewAnswer:
      'SOLID principles prevent tightly coupled spaghetti code. In Node.js, the most impactful principles are the Single Responsibility Principle—keeping controllers, services, and data repositories segregated—and the Dependency Inversion Principle, where business services depend on repository and provider interfaces rather than hardcoding direct database or third-party SDK calls. This allows seamless swapping of database drivers, easy unit testing via mocks, and adding new features (like a new WhatsApp notification provider) without modifying core order processing logic.',
    tradeoffsAndGotchas: [
      'Avoid over-abstraction: creating dozens of abstract classes and single-method interfaces for a simple 3-endpoint CRUD microservice violates YAGNI (You Aren’t Gonna Need It).',
    ],
    followUpQuestions: [
      'What is the difference between Dependency Injection (DI) and Dependency Inversion (DIP)?',
    ],
  },

  // ==========================================
  // ER DIAGRAMS PRACTICE
  // ==========================================
  {
    id: 'er-ecommerce-order-management',
    title: 'ER Diagram: E-Commerce Order Management System',
    subtitle: 'Customers, orders, order items, products, addresses, payments, shipments',
    phase: 'phase-4-core-cs',
    category: 'ER Diagrams',
    priority: 'P0',
    estimatedMins: 15,
    theGist:
      'Model an end-to-end retail order lifecycle capturing multi-item orders, historical price immutability, payment attempts, and shipment tracking.',
    howItWorks:
      'Key Entities & Cardinality: 1) CUSTOMERS (1:N) ORDERS; 2) ORDERS (1:N) ORDER_ITEMS; 3) PRODUCTS (1:N) ORDER_ITEMS (M:N resolved via associative entity ORDER_ITEMS); 4) ORDERS (1:N) PAYMENTS (to support retries and partial payments); 5) ORDERS (1:N) SHIPMENTS; 6) CUSTOMERS (1:N) ADDRESSES (Shipping vs Billing). Crucial schema rule: ORDER_ITEMS must store unit_price_at_purchase to preserve historical accuracy when product prices change in the catalog.',
    practicalExample: {
      title: 'Relational Schema DDL Blueprint',
      language: 'sql',
      code: `CREATE TABLE customers (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY,
  customer_id UUID REFERENCES customers(id),
  status VARCHAR(30) NOT NULL, -- PENDING, PAID, SHIPPED, DELIVERED, CANCELLED
  total_amount NUMERIC(12,2) NOT NULL,
  shipping_address_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10,2) NOT NULL -- Snapshot price!
);

CREATE TABLE payments (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  gateway_transaction_id VARCHAR(100),
  amount NUMERIC(12,2) NOT NULL,
  status VARCHAR(20) NOT NULL, -- INITIATED, SUCCESS, FAILED
  created_at TIMESTAMPTZ DEFAULT NOW()
);`,
    },
    interviewAnswer:
      'For e-commerce order management, the relational schema models Customers, Orders, OrderItems, Products, Payments, and Shipments. The core relationship is the 1-to-Many between Orders and OrderItems, which resolves the M-to-N relationship between Orders and Products. Crucially, the OrderItems table preserves the product unit price at the time of purchase to guarantee immutable historical financial records. Payments are modeled as 1-to-many against Orders to track failed retry attempts and split payments.',
    diagramType: 'er',
    diagramCode: `erDiagram
    CUSTOMERS ||--o{ ORDERS : places
    CUSTOMERS ||--o{ ADDRESSES : owns
    ORDERS ||--|{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : references
    ORDERS ||--o{ PAYMENTS : records
    ORDERS ||--o{ SHIPMENTS : fulfills`,
    tradeoffsAndGotchas: [
      'In MongoDB: The Order document directly embeds the array of OrderItems and the shipping address snapshot because they are bounded and read together.',
    ],
    followUpQuestions: [
      'How do you model partial returns and refunds on individual order items?',
    ],
  },
  {
    id: 'er-approval-workflow-engine',
    title: 'ER Diagram: L1–L3 Multi-Tier Approval Workflow',
    subtitle: 'Agreements, approval steps, tiers, approver roles, immutable audit trail',
    phase: 'phase-4-core-cs',
    category: 'ER Diagrams',
    priority: 'P0',
    estimatedMins: 15,
    theGist:
      'Model an enterprise approval engine capturing document submissions, dynamic tier rules, approver assignments, and an append-only compliance audit trail.',
    howItWorks:
      'Key Entities: 1) USERS (Employees, approvers); 2) ROLES & PERMISSIONS; 3) AGREEMENTS (The subject undergoing review); 4) APPROVAL_STEPS (Specific required levels L1, L2, L3 with status: PENDING, APPROVED, REJECTED); 5) AUDIT_LOGS (Append-only table recording every decision with timestamp and actor ID). The current_tier and version fields on AGREEMENTS support optimistic locking.',
    practicalExample: {
      title: 'Approval Engine Schema',
      language: 'sql',
      code: `CREATE TABLE agreements (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  creator_id UUID REFERENCES users(id),
  status VARCHAR(30) NOT NULL, -- DRAFT, PENDING_L1, PENDING_L2, PENDING_L3, APPROVED, REJECTED
  current_tier INT DEFAULT 1,
  version INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE approval_steps (
  id UUID PRIMARY KEY,
  agreement_id UUID REFERENCES agreements(id),
  tier INT NOT NULL, -- 1, 2, 3
  assigned_role VARCHAR(50) NOT NULL,
  approver_id UUID REFERENCES users(id),
  decision VARCHAR(20) NOT NULL, -- PENDING, APPROVED, REJECTED
  decided_at TIMESTAMPTZ,
  remarks TEXT
);

CREATE TABLE approval_audit_logs (
  id BIGSERIAL PRIMARY KEY,
  agreement_id UUID NOT NULL,
  actor_id UUID NOT NULL,
  previous_status VARCHAR(30),
  new_status VARCHAR(30),
  action VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`,
    },
    interviewAnswer:
      'The approval engine ER design links Agreements to multiple ApprovalSteps and an immutable AuditLog. Each approval tier (L1, L2, L3) is enforced by step records assigned to specific roles or users. To prevent concurrency race conditions, the Agreements table includes a version integer for optimistic locking. The append-only AuditLog guarantees compliance traceability, recording the actor, action, previous status, and timestamp for every single decision.',
    resumeConnection:
      'Connects directly to the Probo L1-L3 approval engine story on your resume.',
    diagramType: 'er',
    diagramCode: `erDiagram
    USERS ||--o{ AGREEMENTS : creates
    AGREEMENTS ||--|{ APPROVAL_STEPS : requires
    USERS ||--o{ APPROVAL_STEPS : acts_as_approver
    AGREEMENTS ||--|{ APPROVAL_AUDIT_LOGS : generates_history
    USERS ||--o{ APPROVAL_AUDIT_LOGS : recorded_as_actor`,
    tradeoffsAndGotchas: [
      'Delegation: If an executive delegates authority to a colleague, add a delegated_to_id column in APPROVAL_STEPS with expiration bounds.',
    ],
    followUpQuestions: [
      'How do you model parallel approvals where two departments at L2 must both approve before moving to L3?',
    ],
  },
];
