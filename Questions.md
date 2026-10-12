Baba, let's prepare strategically for Wednesday. We have roughly two days, so the goal isn't to learn every technology from scratch. It's to make sure you can explain your existing work confidently, defend your technical decisions, answer follow-up questions, and handle practical problems.

I've reviewed your attached resume. Your strongest interview material is your Flipkart experience, your Probo approval engine, your full-stack work with PostgreSQL and REST APIs, and your cross-platform React experience.

One important distinction: your resume presents you as a frontend-focused full-stack engineer with 2+ years of experience. We should build on that actual experience rather than pretend you've worked with technologies you haven't used.

## 1. Our interview preparation strategy

Priority 1 — JavaScript, TypeScript and React

Event loop, promises, closures, rendering, hooks, re-renders, state management, performance, component design and TypeScript.

Priority 2 — Node.js, REST APIs and databases

API design, middleware, validation, authentication, SQL indexing, transactions, MongoDB fundamentals and error handling.

Priority 3 — Architecture and system design

BFF-driven UI, approval workflows, third-party integrations, webhooks, retries, caching and production reliability.

Priority 4 — DSA, testing and project discussion

Arrays, strings, hash maps, stack patterns, API data transformations, Jest, React Testing Library and Playwright.

We'll use the Vijay Sales job description and the question list you pasted as our working syllabus. The specific interview rounds described there are predictions, not a verified account of Vijay Sales' actual interview process.

## 2. Your resume: the four stories we must master

These are likely to generate deeper technical discussion because they demonstrate ownership and concrete engineering decisions.

![Tamanna - BNPL App Redesign by Sadath N on Dribbble](https://images.openai.com/static-rsc-4/DblLz5ERCyMabdOiZan-sSn8N2oZs4_1gtsNZjT40IddAbYx5dZsMDxK4MxPRRJXQPaZYmwpOko0zM-eVB1olCmwxoye8AOs3f8LZEj4oyk1Nl3XXmHdDHbd73tOn2MMOqprMnlK19oqE6z10GJxqH_jiWWFRbuL_-RH3crlZl4?purpose=inline)

Add to Favorites

1. Flipkart — PAN verification and BFF-driven UI

Explain the legacy class-component codebase, backend-driven rendering, reusable bottom-sheet design, cross-platform delivery and the business impact of orders worth over ₹2 lakh being held up.

![Food Delivery Live Tracking Screen | 黑哥 AI](https://images.openai.com/static-rsc-4/x1I3hjihQLzDeUq7VFAvqUEtEBuVf5Tu4EkwA0kkeZGVDCPxD-2wtv-lZ5gZ2lL_gAA2xvWCmuaumlbPBfxeF9dhspeZowaRkos-j4etkKcjch_o1sBkCYmj2dwfKb6pKwW5qNd2C6iauHn0MCOGfEJwO6bnSH6WaipFtGlP1nU?purpose=inline)

Add to Favorites

2. Flipkart — Live order-tracking map

Explain coordinate handling, encoded polylines, route rendering, update frequency, performance trade-offs and what you would do for low-end devices.

![Vendor Approvals (BC365) - CNB](https://images.openai.com/static-rsc-4/YGJFejDA13K-5wAfw1nYg4SdbCtkb6_C-K_lLH4XM6Yx-i2bZ9le8BIGFni8ldxEwzCAoesnBpfnvdQ6eJcwGI9Od81hffe0x4qzftNxa9zZCiMO9w2KHvKTAO8seHESUoOS9vmQu4Gl3NMxzvtJLd6pZYKAX_JbjQePgXQBSC8?purpose=inline)

Add to Favorites

3. Probo — L1–L3 approval engine

Explain the data model, authorization rules, approval transitions, database transactions, audit history and why you chose your implementation.

![Flipper - Debug tools | WaveMaker Docs](https://images.openai.com/static-rsc-4/nYyIDmnF14HLPBaGfylqhvpRHUWT0tn69D9aDenku-RGH3MFoHZMbDN-qxbsjEhZbe6VBD9eC1j26rN2--hjQLAhlGJsj1mNtVlYoDddkesBIhzQfRy93guqv4lIIOLeg6Vu0_hT9pj-8dFhSZxnIA-b7iAAPSzvymnrDQRCBu4?purpose=inline)

Add to Favorites

4. Flipkart — Network inspection and response-override tool

Explain request interception, mock responses, debugging workflows, proxy fundamentals and the boundary between what you implemented and what the underlying platform provides.

For each story, we'll prepare a concise explanation, a technical deep dive, a realistic example, trade-offs, likely follow-up questions, and a truthful account of your individual contribution.

## 3. How we'll cover every question

Whenever you bring me a topic or a question from Gemini's list, we'll work through it using this structure:

1. The gist: Understand the concept in plain English before memorizing terminology.

2. How it works: Build the correct technical mental model, including the important internals.

3. Practical example: Use JavaScript/TypeScript, React, Node.js, SQL or another relevant technology.

4. Interview-ready answer: A natural answer you can deliver in approximately 30–90 seconds.

5. Resume connection: Connect the concept to your actual Flipkart or Probo work wherever appropriate.

6. Follow-up questions: Cover the deeper questions an interviewer might ask after your first answer.

7. Common mistakes: Identify misconceptions, weak explanations and claims you shouldn't make.

8. Mock interview: When you're ready, I'll ask you questions one at a time, evaluate your answers and help you improve them.

I'll distinguish between what you actually implemented, what you understand conceptually, and what you would design differently today. That distinction matters when an interviewer probes your experience.

## 4. Our two-day schedule

| When             | Main focus                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Day 1            | JavaScript/TypeScript, React, frontend performance, Node.js and REST APIs                           |
| Day 2            | SQL/MongoDB, authentication, system design, webhooks, testing, DSA and resume-based mock interviews |
| Before Wednesday | Revise weak areas, rehearse your introduction and practice concise technical explanations           |

We'll adjust this schedule to the questions you bring rather than rigidly following a checklist.

## 5. Let's start

You don't need to resend your resume or paste the question list again. I've got the resume content and your initial syllabus in this conversation.

Send me the first question you want to prepare. I'll explain it from the fundamentals and help you develop an answer that sounds like an engineer who understands the implementation, not someone who has memorized a definition.

---

For this Vijay Sales Full Stack Engineer (JavaScript) interview, we'll prioritize JavaScript fundamentals, React internals, machine coding, and practical frontend DSA at a 3+ years engineering level.

The JD specifically emphasizes async JavaScript, React performance on low-end devices, reusable component libraries, testing, and end-to-end feature ownership. Those deserve more preparation time than obscure JavaScript trivia.

Use the checklist below as our syllabus. You can mark topics as you revise them, and we'll discuss them one at a time. I've separated essential topics from advanced follow-ups so we can use the remaining time effectively.

# Priority 1 — Frontend interview syllabus

## Your revision tracker

0 of 91 topics completed

# 0%

AllMust knowHigh

Reset

1. JavaScript fundamentals

0/10 complete

Must know

Execution context and call stack

Global/function execution context, lexical environment, scope chain

Hoisting and temporal dead zone

var vs let vs const, function declarations vs expressions

Closures

Lexical scope, practical use cases, stale closures

this keyword

Global, regular functions, methods, arrow functions, call/apply/bind

Prototypes

Prototype chain, inheritance, classes, new keyword

Equality and coercion

== vs ===, truthy/falsy values, type conversion

Data types and memory

Primitives vs objects, reference semantics, shallow vs deep copy

Array and object operations

map/filter/reduce, find, some/every, destructuring, spread, optional chaining

Mutation and immutability

Object.assign, structuredClone, copying nested objects

Modules

ES modules, named/default exports, import behavior, circular dependencies

2. Asynchronous JavaScript and browser runtime

0/10 complete

Must know

Event loop

Call stack, browser task queues, microtasks and macrotasks

Promises

States, chaining, error propagation, then/catch/finally

Promise combinators

Promise.all, allSettled, race, any

async/await

Execution flow, sequential vs parallel requests, error handling

Timers

setTimeout, setInterval, why timers are not exact

Concurrency control

Limited parallelism, request deduplication, cancellation

AbortController

Cancel fetch requests and avoid stale responses

Debounce and throttle

Implement both and explain their use cases

Browser APIs

fetch, localStorage, sessionStorage, cookies, URLSearchParams

Event propagation

Capturing, bubbling, delegation, preventDefault vs stopPropagation

3. React fundamentals and internals

0/15 complete

Must know

Rendering lifecycle

Render vs commit, mount/update/unmount, effects

Reconciliation

Virtual DOM, keys, component identity, list rendering

State and props

Data flow, lifting state, controlled vs uncontrolled inputs

Hooks rules

Why hooks must be called consistently and at the top level

useState

Functional updates, batching, stale state, state immutability

useEffect

Dependencies, cleanup, subscriptions, race conditions

useRef

DOM references, mutable values, avoiding renders

useMemo and useCallback

Memoization, dependency identity, when not to use them

React.memo

Prop comparison, referential equality, limitations

Context API

Provider updates, rerender behavior, avoiding overuse

Custom hooks

Extracting reusable stateful behavior

Error handling

Error boundaries, async errors, fallback UI

Forms

Validation, controlled inputs, form submission, accessibility

Component composition

Children, compound components, render props, reusable APIs

Class components

Lifecycle methods, setState, migration/interoperability with hooks

4. React performance and mobile-first engineering

0/10 complete

Must know

Diagnosing slow renders

React DevTools Profiler, identifying unnecessary rerenders

List performance

Stable keys, pagination, infinite scroll, virtualization

Large bundle optimization

Code splitting, lazy loading, dynamic imports

Network performance

Caching, request waterfalls, deduplication, debouncing

Expensive calculations

Memoization, moving work off the main thread when justified

Low-end device constraints

Memory, CPU, network latency, battery and touch responsiveness

Image and asset optimization

Responsive images, lazy loading, appropriate formats

Layout and rendering

Layout thrashing, forced reflow, CSS containment basics

Core Web Vitals

LCP, INP and CLS; measurement and remediation

Production debugging

Performance traces, error monitoring, reproduction and verification

5. TypeScript for React

0/8 complete

Must know

Type system basics

any vs unknown vs never, union and intersection types

Interfaces and type aliases

Extending, composing and discriminated unions

Generics

Generic functions, components, API response types

Utility types

Partial, Pick, Omit, Record, Required, ReturnType

Narrowing

typeof, in, instanceof, custom type guards

React prop typing

Children, callbacks, optional props, event types

API and form typing

Nullable data, unknown external payloads, Zod inference

Async typing

Promise<T>, typed fetch responses, errors and safe parsing

6. Machine coding — implement React components

0/12 complete

Must know

Searchable autocomplete

Debounce, keyboard navigation, loading, empty states, race conditions

Paginated data table

Sorting, filtering, pagination, stable keys

Infinite-scroll feed

IntersectionObserver, loading states, duplicate prevention

Multi-step form

Validation, step navigation, preserving form state

Modal/dialog

Portals, Escape handling, focus management, cleanup

Tabs and accordion

Controlled/uncontrolled APIs, keyboard accessibility

Toast notification system

Timers, queue management, cleanup and context

Star rating/review form

Controlled inputs, validation, accessible interaction

Nested comments/tree

Recursive rendering, expansion state, stable IDs

Shopping cart

Derived totals, quantity changes, immutable updates

File upload component

Validation, progress, errors, cancellation

Reusable data-fetching hook

Loading/error/success states, cancellation and stale responses

7. Frontend DSA and coding patterns

0/10 complete

Must know

Arrays and strings

Two Sum, deduplication, frequency counting, transformations

Hash maps and sets

Group Anagrams, lookup optimization, unique elements

Sliding window

Longest substring without repeating characters

Two pointers

Sorted array problems, pair search, in-place transformations

Stack

Valid parentheses, MinStack, monotonic stack basics

Recursion

Nested array flattening, tree traversal, recursive UI

Sorting and searching

Binary search, comparator functions, sorting API data

Intervals

Merge intervals, calendar/time overlap problems

Data transformation

Flatten nested JSON, group by field, normalize entities

Async coding patterns

Promise.all, concurrency-limited mapping, retry with backoff

8. Browser, HTML, CSS and accessibility

0/8 complete

High

Semantic HTML

Forms, labels, buttons, landmarks

CSS layout

Flexbox, Grid, positioning, stacking contexts and z-index

Responsive design

Mobile-first breakpoints, fluid layouts, touch targets

CSS performance

Animations, layout vs composite properties

Accessibility

Keyboard navigation, focus management, ARIA, screen readers

Browser rendering

DOM/CSSOM, render tree, layout, paint, compositing

Storage and security

Cookie flags, XSS, CSRF, safe DOM updates

Networking basics

HTTP methods, status codes, CORS, caching, TLS basics

9. Testing and frontend architecture

0/8 complete

High

Jest/Vitest fundamentals

Mocks, spies, timers, asynchronous tests

React Testing Library

User-visible behavior, queries, interactions

Component test cases

Loading, success, error, empty and edge states

Playwright

Critical user journeys, selectors, flaky test prevention

Frontend architecture

Feature folders, component boundaries, shared libraries

State management

Local state vs Context vs Redux/Zustand vs server state

TanStack Query

Caching, invalidation, retries, optimistic updates

Git and code review

Small diffs, regression risks, CI checks

Copy full checklist

## 10. Machine-coding questions: practice in this order

For a 3+ years full-stack role, don't just make the UI look correct. Expect discussion of state ownership, API failures, cleanup, accessibility, component reuse and edge cases.

| Priority | Component                                | What it tests                             |
| -------- | ---------------------------------------- | ----------------------------------------- |
| 1        | Search with debounce and API integration | Hooks, async requests, race conditions    |
| 2        | Data table with sorting and pagination   | State, array methods, derived data        |
| 3        | Star rating and review submission        | Controlled components, validation         |
| 4        | Modal and toast system                   | Portals, effects, timers, accessibility   |
| 5        | Multi-step form                          | Validation, state persistence             |
| 6        | Autocomplete                             | Keyboard navigation, debounce, caching    |
| 7        | Infinite-scroll product feed             | Pagination, loading, duplicate prevention |
| 8        | Shopping cart                            | Immutable updates, derived totals         |
| 9        | Nested comments or file explorer         | Recursion, tree state                     |
| 10       | File upload                              | FormData, progress, error handling        |

My recommendation: Start with the searchable autocomplete, then build a product listing page with filtering, sorting and pagination. These map naturally to a retail company's customer-facing applications.

## 11. Basic DSA: what you should be able to code

Focus on implementing solutions in JavaScript without relying on memorized code.

- Two Sum

- Remove duplicates from an array

- Find the frequency of each element

- Group objects by a property

- Flatten a nested array

- Flatten a nested object or API response

- Find the first non-repeating character

- Longest substring without repeating characters

- Valid parentheses

- Merge two sorted arrays

- Binary search

- Sort and filter products by price or rating

- Implement debounce and throttle

- Implement `Promise.all`

- Limit concurrent API requests

For each, understand the brute-force approach, optimized approach, time and space complexity, and edge cases. Advanced dynamic programming and graph algorithms are lower priority for this particular preparation window.

## 12. Tailor the preparation to your interview

What interview format have they told you about?

Machine coding / live coding

Technical discussion

Both coding and discussion

Not sure yet

How comfortable are you with frontend fundamentals right now?

Know the concepts; need revision

Some concepts are strong, others are weak

Need to rebuild fundamentals

Which areas currently need the most work?

JavaScript

React

Machine coding

DSA

TypeScript

Browser/CSS

Tailor my preparation

You can answer those questions or simply start with the first topic.

Let's begin with JavaScript execution context, scope, hoisting and closures, then move to the event loop and promises. Those fundamentals underpin many of the React questions and machine-coding exercises we'll cover.

---

For the second phase, we'll prepare for Backend Engineering, System Design, Low-Level Design (LLD), Node.js/MongoDB machine coding, and practical DSA at the level expected of a 3+ years Full Stack Engineer.

For Vijay Sales, the emphasis should be on building reliable business features: order-status APIs, review submission, approval workflows, customer-support integrations, and messaging systems. You should be able to explain not only how to build an endpoint, but also how it behaves when requests are duplicated, databases fail, or third-party services become unavailable.

# Phase 2 — Backend, System Design and LLD syllabus

## Priority order

P0

Node.js, REST APIs and MongoDB

Core requirements explicitly listed in the job description.

P0

Practical backend machine coding

Implement working endpoints, schemas, validation and error handling.

P1

System design, integrations and reliability

Webhooks, messaging, retries, queues, caching and failure recovery.

P1

LLD, testing and production operations

Service boundaries, reusable architecture, tests, monitoring and deployment.

The priority labels are my recommendations based on the supplied JD, not confirmed details about the company's interview questions.

## 1. Node.js and backend fundamentals

Priority: P0 — must prepare

These questions test whether you understand the runtime and can build APIs that are maintainable and reliable.

## Backend revision tracker

0/78 topics completed

# 0%

Must know (P0)Next priority (P1)All topics

Reset

A. Node.js internals and asynchronous execution

0/9 complete

P0

Node.js architecture

V8, libuv, event loop, thread pool, non-blocking I/O

Event loop phases

Timers, poll, check, setImmediate and process.nextTick

Concurrency vs parallelism

How Node.js handles many I/O requests; CPU-bound work

Worker threads and child processes

When to use each; avoiding event-loop blocking

Streams and buffers

Readable, writable, duplex, backpressure, file streaming

Error handling

Operational vs programmer errors; sync and async failures

Memory management

Garbage collection, memory leaks, heap growth, large payloads

Process lifecycle

Environment variables, graceful shutdown, signals, health checks

CommonJS vs ES modules

require, import, module boundaries and interoperability

B. REST API design and Express.js

0/13 complete

P0

REST principles

Resources, HTTP verbs, statelessness, resource naming

HTTP status codes

200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500

Request lifecycle

Router, middleware, controller, service, repository

Validation

Zod schemas, type coercion, allowlists, reject invalid input

Centralized error handling

Error middleware, consistent error responses, logging

Pagination

Offset vs cursor pagination, stable ordering

Filtering and sorting

Safe query parameters, allowlisted sort fields

API versioning

Backward compatibility and deprecation

Idempotency

Safe retries for order creation, payments and review submission

Rate limiting

Per-user/IP limits, distributed rate limiting basics

File and payload limits

Request size limits, content types, upload validation

API documentation

OpenAPI/Swagger, contracts, example responses

Security headers and CORS

Allowed origins, credentials, preflight requests

C. Authentication, authorization and security

0/10 complete

P0

Authentication vs authorization

Identity verification vs permission checks

JWT

Signing, verification, expiry, claims, secure storage

Access and refresh tokens

Rotation, revocation, replay detection

OAuth 2.0

Authorization code flow and delegated authorization

RBAC

Roles, permissions, resource-level access

Password security

Argon2/bcrypt, salts, password reset flows

Cookie security

HttpOnly, Secure, SameSite, CSRF protection

OWASP risks

Injection, broken access control, XSS, SSRF, secrets exposure

Webhook verification

HMAC signatures, timestamps, replay protection

Secrets management

Environment variables, secret stores, key rotation

D. MongoDB data modeling and querying

0/16 complete

P0

Document model

Documents, collections, BSON, schema flexibility

Embedding vs referencing

Bounded nested data vs independently queried entities

Schema design

Orders, customers, products, reviews and approval workflows

CRUD operations

find, insertOne, updateOne, deleteOne, bulkWrite

Query operators

$in, $or, $and, $gte, $exists, $elemMatch

Indexes

Single-field, compound, unique, partial, multikey indexes

Compound index ordering

Equality-sort-range considerations and index prefixes

Explain plans

COLLSCAN vs IXSCAN, selectivity, examined documents

Aggregation pipelines

$match, $group, $project, $unwind, $lookup, $sort

Pagination at scale

Range queries and ObjectId or compound cursors

Atomic updates

$set, $inc, conditional updates, findOneAndUpdate

Transactions

Multi-document transactions and their trade-offs

Consistency and concurrency

Optimistic concurrency, version fields, lost updates

TTL indexes

Expiring temporary records, limitations and appropriate use

MongoDB vs SQL

Joins, normalization, relationships, transactions and trade-offs

Connection management

Connection pools, timeouts, retryable operations

G. Third-party APIs, messaging and webhooks

0/12 complete

P0

External API integration

Timeouts, response validation, auth and error mapping

Timeouts and cancellation

AbortController and avoiding indefinitely pending calls

Retry policies

Exponential backoff, jitter, retry budgets

Retry classification

Retry transient errors, avoid retrying permanent failures blindly

Idempotent webhook handlers

Duplicate delivery, event IDs and atomic deduplication

Webhook signature validation

Authenticity, raw request body and timing-safe comparisons

Delivery states

Accepted, queued, sent, delivered, failed and status callbacks

Queues and workers

Async processing, acknowledgements, visibility timeouts

Dead-letter queues

Poison messages, retry exhaustion and manual replay

Transactional outbox

Persisting business changes and pending events reliably

WhatsApp/SMS/email fallbacks

Provider failures, delivery callbacks, channel preferences

Rate limits and backpressure

Provider quotas, concurrency caps and queue growth

Copy backend checklist

## 2. Backend machine coding — practical exercises

These are the exercises I would prioritize for this JD. Ideally, use Node.js + Express + MongoDB + TypeScript, but use JavaScript if that lets you demonstrate the logic more confidently.

![E-commerce admin dashboard (Order page) | Dashboard design, Ui design dashboard, Web design](https://images.openai.com/static-rsc-4/iKPmev8z8xk9aUlV-3-TxyQzY4c6_DaFhjkvOgLJd4C_lP7H9lnsoQjdmEgurA6AWrFCgX3sN-DNEkvLvajYismsh1wY7C9j5ihhl7CvJh342mjGy9ZZHfAhI0UlhoICtlJ3P4ChZYe9QZEXGaPTaQWUPfQr1zT8owniNBklPi4?purpose=inline)

Add to Favorites

Exercise 1: Order management API

Highest priority

Create an order, fetch by ID, list with pagination and filters, update status, and validate allowed state transitions.

Tests: REST conventions, schema design, validation, authorization and business rules.

![Open Flutter Project: Product Reviews in E-commerce App | by Andrey Poteryahin | Medium](https://images.openai.com/static-rsc-4/kCQd6uN-s5wdNHm6W2gSohv7uuJLoqiSm1CSk8x48UudYNSU85dwqgPFM33DfyGChqK-7Tpdm7c9REjgb7cPjGhEuCq8sjOnDEY4y_LruOWGf8Zq65ycd1e8i0c3zutCSzhzhvjtVa1QB5LhTqMB9F_XpXfOF594i5R73qoUpE8?purpose=inline)

Add to Favorites

Exercise 2: Product reviews API

Submit a rating and review, list reviews for a product, calculate aggregates, and prevent duplicate submissions where required.

Tests: unique indexes, pagination, validation, moderation and aggregation.

![Contract Management Portfolio | CaseDocker](https://images.openai.com/static-rsc-4/69T3BK9qxN2d9Qhy6G0OQgk8f-KbmlPW2Zzoh8hg3QwNeURZ4OdvZHi5G_9lGUMorHCzAfAlx846RkARCL985Tr35m-i976Wu4re9eODhHxMcwJ_d5JLsD2_s37A1a85h95pb0WIOJIblaXkgJYG4VIkcfSyuiPrV76RM34EaXg?purpose=inline)

Add to Favorites

Exercise 3: L1–L3 approval engine

Submit an agreement, route it to the right approver, approve or reject it, and maintain an audit trail.

Tests: RBAC, state machines, conditional updates, transactions and concurrency.

![Message Delivery Status - YoPrint Knowledge Base](https://images.openai.com/static-rsc-4/bbaAu4QgLviyGZL1TA4aJGueLr1qriGFvY0Td8cbpBz8-t7dSWcqKEMSbLW7IM0R2u5jU2oP38MeRQOo9yw6DYU_fRxHPF4058C1ieH37X9_HTjLhyVLAUajDkRFWN9_40NpaKnTOlhsje-3FxRmh2d_3KWJ9Pzeaqhm-0f57Q8?purpose=inline)

Add to Favorites

Exercise 4: Notification service

Accept a notification request, queue it, retry transient failures and fall back from one delivery channel to another.

Tests: async jobs, retries, idempotency, provider abstraction and delivery tracking.

![Webhook Event Logs](https://images.openai.com/static-rsc-4/RrKnrufVzB_hNSrB3IueC8lXR2-qFem0lbLNpl4KHRXJX0qgSTyTrzyihmEgrMJDt_y4O9XWgBwcscovUeoL7vsg7MUlxt2cF5sGQ8lKNyzi2-GL86xxA91PywYMVX2s6OSR4h0CrVnqWCD_IWcvf3t2udNPZ4qi9sig1yReA80?purpose=inline)

Add to Favorites

Exercise 5: Webhook receiver

Verify signatures, store event IDs, handle duplicates safely and process order-status events.

Tests: security, event processing, deduplication and failure recovery.

For every exercise, we'll work through the requirements, schema, endpoint contract, folder structure, implementation, tests and interviewer follow-ups. We won't build unnecessary infrastructure if the interview only allows 45–60 minutes.

## 3. System design — questions relevant to Vijay Sales

At this experience level, focus on a clear design process: requirements → APIs → data model → components → failure modes → scaling. Don't start by drawing Kafka, Redis and ten microservices before explaining the actual problem.

### P0: Must-practice design questions

1. Design an order management system

Customers create orders, operations teams update status, and support agents retrieve order information.

2. Design a customer support bot backend

A bot must retrieve order status and invoice information from internal systems.

3. Design a notification service

Send order confirmations and delivery updates over WhatsApp, email and SMS.

4. Design a product reviews service

Customers submit reviews and ratings; product pages display average ratings and review lists.

5. Design a webhook processing pipeline

An external OMS sends order-status events, occasionally duplicating or delaying them.

6. Design an inventory reservation flow

Multiple customers attempt to buy the last available unit.

### P1: Additional system design questions

- How would you prevent duplicate order creation when a client retries a request?

- How would you handle a WhatsApp provider outage without losing notifications?

- How would you make sure a delayed event doesn't overwrite a newer order status?

- How would you cache order-status lookups without serving stale information for too long?

- How would you design audit logs for sensitive customer and invoice operations?

- When would you use Redis, a message queue or a database-backed job queue?

- When would a modular monolith be better than microservices?

- How would you handle MongoDB growth, slow queries and connection-pool saturation?

- How would you monitor latency, failures and queue backlog in production?

## 4. Low-Level Design (LLD)

LLD is about translating requirements into classes, modules, interfaces and responsibilities. For a JavaScript/TypeScript full-stack role, demonstrate good boundaries without overengineering.

| Design exercise      | Concepts to prepare                                        |
| -------------------- | ---------------------------------------------------------- |
| Notification service | `NotificationProvider`, provider adapters, fallback policy |
| Order service        | `OrderService`, repository, state transitions, validation  |
| Approval engine      | Roles, policies, workflow states, audit events             |
| Webhook processor    | Signature verifier, event handler, deduplication           |
| API client           | Timeout, retry, error normalization, cancellation          |
| Rate limiter         | Token bucket, sliding window, per-user limits              |
| In-memory cache      | TTL, eviction, cache invalidation                          |
| Job queue worker     | Job lifecycle, retry policy, dead-letter handling          |

### Questions interviewers may ask

1. Why should a controller not contain all business logic?

2. How would you inject dependencies into a service?

3. How do you make external providers interchangeable?

4. When is a repository abstraction useful, and when is it unnecessary?

5. How would you model an order lifecycle as a state machine?

6. How would you make a service testable without calling real third-party APIs?

7. When would you use composition instead of inheritance?

8. How do you avoid creating too many abstractions for a small application?

## 5. Backend DSA and practical coding

Focus on problems that directly support API development and production engineering.

### Must-practice coding questions

Group orders by customer ID

Hash map, reduce

Calculate product rating aggregates

Frequency counting, aggregation

Flatten nested JSON

Recursion, iterative traversal

Deduplicate webhook events

Set, map, idempotency keys

Merge overlapping delivery windows

Sorting, intervals

Implement an LRU cache

Map, doubly linked list

Implement a concurrency limiter

Promises, queues

Implement retry with exponential backoff

Async control flow, error classification

Implement debounce and throttle

Closures, timers

Build a basic rate limiter

Maps, timestamps, sliding window

Find the top K most-reviewed products

Hash map, sorting or heap

Process a large dataset in batches

Chunking, streams, bounded concurrency

0 of 12 completed

## 6. How to prioritize the remaining preparation time

You have limited time before Wednesday, so don't try to master every item in this syllabus.

First

Core

Node.js + REST + MongoDB

Understand the request lifecycle, validation, authentication, schema modeling, indexing and error handling. Implement a few endpoints yourself.

Second

Practical

Order API + approval engine

Connect these to your real experience and prepare for database consistency, authorization and concurrent requests.

Third

Design

Webhooks + notifications + system design

Focus on retries, idempotency, queues and third-party failures.

Finally

Revision

LLD + DSA + production questions

Practice explaining trade-offs out loud and solving one or two coding problems without help.

One important point: your Probo experience already gives you a strong foundation for the approval-engine discussion, and your Flipkart work provides relevant examples of integration and debugging. We should use those examples to demonstrate depth rather than invent production experience with MongoDB, Kafka or WhatsApp APIs.

Your next step: Start with Node.js internals and the event loop, then REST API design, authentication, and MongoDB. Bring me each question individually, and we'll build the conceptual understanding, practical implementation, interview answer and follow-up questions before moving on.

---

# Phase 3 — Resume-based tricky interview questions

My analysis: the Gemini list is a good starting point, but it focuses on only a few parts of your resume. For Vijay Sales, the bigger risk is not that you lack every technology in their stack. It's that an interviewer may take a claim from your resume, ask how you implemented it, and then keep probing until they understand the depth of your ownership.

Your resume gives us several strong areas to prepare:

- Flipkart: backend-driven UI, live order-tracking maps, React Native network inspection, deep links and navigation.

- Probo: L1–L3 RBAC approval engine, PostgreSQL indexing, employee and asset lifecycle management, JWT/OAuth 2.0, external API integrations.

- Zarasana: full-stack delivery, reusable UI components, CLI integration tooling and theming architecture.

- Testing and engineering practices: Jest, React Testing Library, Playwright, Git, Docker and production debugging.

The following is a targeted question bank based on your actual resume and the Vijay Sales JD. I'll distinguish between questions grounded in your resume, likely interviewer follow-ups, and hypothetical scenarios that test transferable skills.

## 1. Flipkart — resume deep dive

Priority P0 · Expect detailed questions about implementation, trade-offs and debugging.

### A. PAN verification bottom sheet and backend-driven UI

Your resume says you built a reusable, responsive PAN verification bottom sheet in a legacy class-component React codebase, with a backend-driven UI renderer, across m-site, React Native and web.

Questions to prepare

1. Walk me through the complete architecture of this feature.

Explain the user flow, API/BFF contract, renderer, component and submission lifecycle.

2. What exactly does backend-driven UI mean in your implementation?

Distinguish server-provided layout/configuration from client-side rendering and business logic.

3. How did you make one component work across m-site, React Native and web?

Platform-specific primitives, shared business logic, adapters and responsive behavior.

4. Why did you use a class component instead of hooks?

Existing codebase conventions, compatibility, lifecycle management and migration trade-offs.

5. What happens if the backend sends an unknown widget type or malformed configuration?

Schema validation, safe defaults, graceful fallback and telemetry.

6. How did you handle loading, validation, API errors and repeated submissions?

UI states, request lifecycle, server-side validation and duplicate prevention.

7. How would you test a backend-driven renderer?

Unit tests, contract fixtures, unknown widgets, platform tests and end-to-end flows.

8. How would you add a new field without breaking older clients?

Versioning, optional fields, defaults and backward-compatible contracts.

9. How would you investigate a regression that only happens on React Native?

Reproduction, platform differences, logs, request payloads and targeted tests.

10. What does the ₹2 lakh+ order impact actually mean?

Explain the documented business context and your contribution without claiming unsupported revenue impact.

0/10 prepared

Deeper concepts to revise: component registries, discriminated unions in TypeScript, configuration validation, feature flags, contract compatibility, shared versus platform-specific components, error boundaries and fallback UI.

### B. Live order-tracking map

Your resume explicitly mentions client-side route drawing from rider, origin and destination coordinates using encoded polylines.

| Interview question                             | What you should understand                                              |
| ---------------------------------------------- | ----------------------------------------------------------------------- |
| What is an encoded polyline?                   | Lossy coordinate encoding, decoding and precision                       |
| How do you draw the route?                     | Coordinates, map SDK/polyline API and rendering                         |
| How are live coordinates updated?              | Polling vs push updates, state updates and subscriptions                |
| What if coordinates arrive out of order?       | Timestamps, sequence numbers and stale-update rejection                 |
| How do you avoid rerendering the whole screen? | Component boundaries, memoization and stable props                      |
| What if GPS coordinates are noisy?             | Filtering, sampling and smoothing trade-offs                            |
| How do you conserve battery and data?          | Update frequency, lifecycle-aware subscriptions and distance thresholds |
| What if the app goes into the background?      | Pause/resume policy, app lifecycle and server-side tracking             |
| What if the route response is invalid?         | Validation, fallback UI, logging and recovery                           |
| How would you test it without a live rider?    | Deterministic coordinate fixtures and simulated update streams          |

Tricky follow-ups

- Does memoization solve every map performance problem?

- Would you decode the encoded polyline on every render?

- When would you move processing to a worker or native layer?

- What is the difference between reducing React renders and reducing map SDK rendering work?

- What would you measure before claiming that battery usage improved?

Be particularly careful with the distinction between work you actually performed and improvements you would propose. The resume confirms route rendering, but it doesn't specify your precise update mechanism or battery optimization work.

### C. React Native network inspection and response override

Your resume describes a Proxyman-style tool using a MITM proxy to capture Android/iOS traffic, override responses and serve mock endpoints.

Prepare these questions:

1. Explain how a forward proxy and a MITM proxy differ from an ordinary API client.

2. How does HTTPS interception work, and why does the client need to trust a proxy certificate?

3. What happens when certificate pinning is enabled?

4. How did you map a captured request to a mock response?

5. How would you match a mock using the HTTP method, URL, headers and request body?

6. How would you avoid returning the wrong mock when multiple requests have similar URLs?

7. How would you handle streaming, large payloads and binary responses?

8. How would you prevent sensitive headers and tokens from appearing in logs?

9. What should happen when no mock matches a request?

10. How would you test that the override tool doesn't modify production traffic?

Topics to revise: HTTP proxies, TLS certificates, request/response interception, certificate pinning, HTTP methods, mock matching, response fixtures, redaction and developer-tool architecture.

### D. Deep links and back navigation between m-site and React Native

This is one of the strongest architectural discussion areas in your resume because it involves two navigation environments.

Prepare:

- URL schemes, Universal Links/App Links and route parsing.

- Deep-link payload validation and mapping URLs to app routes.

- Navigation stacks versus browser history.

- Android back button behavior and iOS navigation behavior.

- Handling app cold starts versus already-running apps.

- Authentication and session state during deep-link navigation.

- Avoiding duplicate screens and navigation loops.

- Fallback behavior when a destination route is unsupported.

- Preserving state when moving between web and native experiences.

- Testing navigation from notifications, external URLs and in-app links.

Tricky question: "The user opens a deep link, logs in, presses Back, and returns to the wrong screen. How would you debug and fix it?"

A strong answer would start by tracing the route and navigation history, identifying which layer owns the history, and reproducing the behavior across cold and warm app launches. Avoid claiming a particular root cause unless it matches what actually happened in your project.

## 2. Probo — backend, database and authorization deep dive

Priority P0 · Especially important because Vijay Sales expects end-to-end backend ownership.

### A. L1–L3 RBAC approval engine

Your resume explicitly says you designed a multi-level approval engine for vendor agreements, eliminating manual compliance checks.

Explain the schema you used for users, roles, agreements and approvals.

How did you decide which person could approve an agreement?

How did you enforce L1 → L2 → L3 sequencing?

What happens if two approvers act simultaneously?

How did you prevent a user from approving their own request?

How did you record rejection, resubmission and audit history?

What if an approver leaves the organization?

What if a request is submitted twice?

How did you test authorization boundaries?

What made the engine scalable?

0/10 prepared

Topics to revise: RBAC vs ABAC, authorization middleware, relational modeling, transaction boundaries, optimistic concurrency, audit logs, workflow state machines, unique constraints and integration testing.

### B. PostgreSQL and query optimization

Your resume claims that you optimized database queries using indexing strategies to reduce latency. Expect the interviewer to ask for evidence and specifics.

- What query was slow, and how did you identify the bottleneck?

- What is an index, and why can too many indexes hurt writes?

- What is the difference between a single-column and composite index?

- How do you choose the order of columns in a composite index?

- What do `EXPLAIN` and `EXPLAIN ANALYZE` tell you?

- What is the difference between `INNER JOIN` and `LEFT JOIN`?

- How do transactions and isolation levels prevent inconsistent updates?

- What is the N+1 query problem?

- How would you paginate a large table?

- How would you prove that a change reduced query latency?

Prepare one real before-and-after example from your experience, if you have the measurements. If you don't remember exact timings, explain the actual optimization without inventing numbers.

### C. PostgreSQL → MongoDB translation

This is particularly relevant because your resume demonstrates SQL experience while the job description names MongoDB as the core database.

| Question                                        | What to prepare                                                         |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| How would you model L1–L3 approvals in MongoDB? | Agreement documents, approval history and query access patterns         |
| When would you embed approval steps?            | Bounded, frequently read together data                                  |
| When would you reference users or agreements?   | Independent lifecycle, shared entities or large/unbounded relationships |
| How do you enforce unique approvals?            | Unique indexes, document structure and application-level rules          |
| How do you prevent conflicting approvals?       | Atomic conditional updates and, where necessary, transactions           |
| How do you represent joins?                     | References, `$lookup`, or denormalized read models                      |
| How do you optimize a growing collection?       | Indexes, explain plans, pagination and data access patterns             |
| What becomes harder compared with SQL?          | Referential integrity, joins and cross-document consistency             |

Important: MongoDB isn't automatically more scalable or PostgreSQL automatically more consistent for every workload. Explain the requirements and trade-offs rather than treating either database as universally superior.

## 3. Security and authentication — tricky follow-ups

Your resume lists JWT and OAuth 2.0. Those terms invite questions beyond simply explaining what a token is.

| Interview question                                        | Expected depth                                                                       |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| What happens if an access JWT is stolen?                  | Short expiry, revocation strategies and risk containment                             |
| Can a JWT be revoked immediately?                         | Stateless validation limitations and server-side denylist/session version approaches |
| What is refresh-token rotation?                           | Single-use refresh tokens, replacement and replay detection                          |
| Where should tokens be stored in a browser?               | XSS/CSRF trade-offs, HttpOnly cookies and storage risks                              |
| How do you distinguish authentication from authorization? | Identity vs permission enforcement                                                   |
| How would you secure L1–L3 approval APIs?                 | Server-side role/resource checks and workflow validation                             |
| How do you prevent IDOR?                                  | Object-level access checks on every relevant request                                 |
| How do you secure webhooks?                               | Signature verification, timestamp tolerance, replay prevention                       |
| How do you handle token expiry during an API request?     | Controlled refresh, retry once where safe, and sign-out behavior                     |
| How do you store passwords?                               | Slow password hashing, salts and secure reset flows                                  |

For OAuth, know the authorization-code flow with PKCE, access versus refresh tokens, scopes and the distinction between an identity token and an API access token.

## 4. Zarasana — architecture, reusable components and full-stack ownership

Your resume includes a UI component library with CLI-based integration tooling, 10+ components and a theming architecture supporting multiple design systems. This can lead to practical architecture questions, not just CSS questions.

### A. UI component library and CLI

- How did you structure the component library and its exports?

- How did consumers install and import components?

- What problem does a CLI solve compared with copying components manually?

- How did you manage dependencies, peer dependencies and version compatibility?

- How did you prevent breaking changes from affecting existing consumers?

- How did you type component props and support customization?

- How did you implement themes without duplicating every component?

- How would you test generated files and CLI commands?

- How would you handle accessibility and keyboard interaction in shared components?

- How would you publish and version the package in a production workflow?

Topics: package exports, semantic versioning, npm/pnpm workspaces, TypeScript declarations, design tokens, CSS variables, peer dependencies, API design and component testing.

### B. Full-stack feature delivery

Your resume describes full-stack work across frontend and backend. Be ready to discuss how you move from a requirement to a release.

1. How do you clarify an ambiguous requirement with a product or business team?

2. How do you define the API contract before building the UI?

3. How do you handle API response changes without breaking the frontend?

4. How do you decide which validation belongs on the client versus the server?

5. How do you handle loading, empty, error and retry states?

6. How do you roll out a risky feature safely?

7. How do you investigate a bug that cannot be reproduced locally?

8. What would you monitor after deployment?

9. How do you decide whether to refactor existing code or deliver a minimal fix?

10. Tell me about a technical decision you would change if you rebuilt the feature today.

Prepare one genuine project example for requirements, implementation, testing and release. Don't imply that you owned deployment or operational monitoring for a feature unless you actually did.

## 5. Testing — what they can probe from your resume

Your listed stack includes Jest, React Testing Library and Playwright. The interviewer may ask how you choose the right level of test and whether you can identify meaningful edge cases.

How do unit, integration and E2E tests differ?

Know what each level verifies and the cost of maintaining it.

How would you test a debounced search component?

Fake timers, user interactions, API mocks, stale responses and cleanup.

How would you test an API controller?

Valid input, invalid input, auth failures, service failures and response contracts.

When should you mock a dependency?

Isolate the unit while keeping integration tests meaningful.

How do you avoid flaky Playwright tests?

Deterministic setup, resilient locators and waiting for observable conditions.

How would you test an L1–L3 approval engine?

State transitions, forbidden actions, concurrent approvals and audit events.

How would you test retries?

Fake timers, retryable vs permanent errors, retry limits and idempotency.

What should be covered by contract tests?

API shape, required fields, compatibility and external integration expectations.

0/8 prepared

A useful rule: test business rules and edge cases at the lowest appropriate level, integration behavior at the API/database boundary, and a small set of critical user journeys end to end.

## 6. Resume gaps and Vijay Sales-specific scenario questions

These topics aren't established by your resume as hands-on experience, but they appear in the JD. Prepare them as transferable design knowledge, and be clear if you've only studied them.

### A. Messaging and webhook architecture

- How does a WhatsApp Business integration receive delivery-status callbacks?

- What happens if a provider sends the same webhook three times?

- How do you authenticate an incoming webhook?

- How would you retry failed SMS or email delivery?

- How would you avoid sending a customer the same order update repeatedly?

- When would you put work into a queue instead of processing it inside the API request?

- What happens if a worker crashes after sending a message but before recording success?

- How do you distinguish queued, accepted, sent, delivered and failed?

- How do you prevent retries from overwhelming a provider?

- How would you route a notification to SMS if WhatsApp delivery fails?

Key concepts: at-least-once delivery, idempotent consumers, exponential backoff with jitter, queue acknowledgements, dead-letter queues, delivery callbacks and the transactional outbox pattern.

### B. Conversational AI and order-support bots

The JD mentions LangChain, Rasa and exposing business actions to a support bot.

Prepare these questions:

- What is tool calling, and how does it differ from ordinary text generation?

- How would an LLM retrieve a customer's order status?

- Why should an LLM never be trusted to authorize access to an invoice?

- How would you validate the order ID and authenticate the customer?

- What should happen when the OMS API times out?

- How would you prevent prompt injection from triggering unauthorized actions?

- When would you use retrieval-augmented generation (RAG) instead of a direct API tool?

- What information belongs in an audit log for bot-triggered actions?

- How would you measure the bot's reliability?

A strong design separates the AI layer from trusted business services. The model may propose an action; the backend must validate the request, enforce permissions and return only authorized data.

## 7. The highest-risk tricky questions — mock interview shortlist

If time is limited, prepare these 15 questions first. They combine your resume claims with the most relevant requirements in the JD.

## Mock interview checklist

0/15

Explain the complete architecture of your Flipkart backend-driven PAN verification component.

Flipkart · Architecture

How would you handle malformed or unknown widgets in a backend-driven renderer?

React · Resilience

How did your live tracking map receive coordinate updates, and how would you optimize it for low-end devices?

Flipkart · Performance

Explain the actual root cause of the deep-link/back-navigation bug you fixed.

Flipkart · Debugging

How does your network inspection tool intercept HTTPS traffic, and what happens with certificate pinning?

Flipkart · Networking

Walk me through your L1–L3 approval engine's schema, state transitions and authorization checks.

Probo · Backend

What happens if two approvers try to update the same agreement concurrently?

Database · Concurrency

Show how you diagnosed a slow SQL query and proved your index improved it.

Database · Performance

How would you redesign the approval engine in MongoDB?

MongoDB · Data modeling

How would you revoke a stolen JWT before its expiry?

Security · Authentication

How would you prevent duplicate order updates when webhooks are delivered more than once?

Integrations · Reliability

How would you design WhatsApp-to-SMS fallback without losing notifications?

System design · Messaging

How would you expose order-status lookup safely to an LLM support bot?

AI · Backend security

How would you test your approval workflow at unit, integration and E2E levels?

Testing · Quality

Describe one engineering decision you made, the trade-off involved and what you would improve today.

Ownership · Judgment

Start mock interview

## 8. How we'll prepare each answer

For every tricky question you bring, we'll use this structure:

1. What the interviewer is testing — the underlying concept and expected depth.

2. Conceptual explanation — understand the mechanism before memorizing terminology.

3. Practical example — code, schema, request flow or architecture as appropriate.

4. Interview-ready response — a concise answer grounded in your actual experience.

5. Follow-up questions — the deeper questions likely to follow.

6. Failure scenarios and trade-offs — how the design behaves under real conditions.

7. Honesty check — what your resume supports, what needs your confirmation and what should be described as a hypothetical design.

### My final assessment

Your strongest differentiator is the combination of real React work in a large codebase and backend workflow experience at Probo. The main preparation risks are defending the details behind your resume's technical claims, translating SQL knowledge to MongoDB, and demonstrating reliable backend design beyond basic CRUD.

Start with the Flipkart PAN verification component. It's a good first deep dive because it connects React architecture, API contracts, cross-platform engineering, error handling and business impact—the same areas this role expects you to understand end to end.

---

# Phase 4 — DBMS, Operating Systems, Networking, SOLID, ER Diagrams and UML

For your Vijay Sales Full Stack Engineer interview, these topics complete the preparation around JavaScript, React, Node.js, MongoDB and practical system design.

At the 3+ years level, don't study these subjects only as textbook definitions. You should be able to explain a concept, connect it to an actual backend problem, draw the relevant diagram and discuss trade-offs.

I've prioritized the topics for a JavaScript full-stack engineer working with REST APIs, databases, integrations, webhooks and production systems.

## 1. Database concepts — DBMS, SQL and MongoDB

## A. DBMS fundamentals

P0

0/46 concepts revised

Database fundamentals

DBMS vs RDBMS vs NoSQL

Relational tables, documents, rows and collections

Primary keys, foreign keys and unique constraints

Candidate keys, composite keys and surrogate keys

Relationships: 1:1, 1:N and M:N

Normalization: 1NF, 2NF, 3NF and denormalization

ACID properties and transaction boundaries

Isolation levels and common concurrency anomalies

Referential integrity and cascading operations

OLTP vs OLAP and transactional vs analytical workloads

SQL and PostgreSQL/MySQL

INNER JOIN, LEFT JOIN and self joins

GROUP BY, HAVING, aggregate functions

Subqueries, CTEs and window functions

Indexes: B-tree, composite, unique and partial

Index selectivity, column order and index prefixes

EXPLAIN / EXPLAIN ANALYZE and query plans

Transactions, COMMIT, ROLLBACK and isolation

Optimistic vs pessimistic locking

Deadlocks: causes, detection and prevention

Offset vs cursor pagination

N+1 queries and connection pooling

Schema migrations and backward-compatible changes

MongoDB

Documents, BSON, collections and ObjectId

Embedding vs referencing

Schema design around query access patterns

CRUD, update operators and array updates

Compound, unique, multikey, partial and TTL indexes

Compound index ordering and explain plans

Aggregation: $match, $group, $project, $unwind and $lookup

Atomic document updates and conditional writes

Transactions across multiple documents

Optimistic concurrency and version fields

Cursor pagination and large collection performance

Schema validation, migrations and denormalization

Replica sets, replication and read/write concerns

Sharding basics and shard-key trade-offs

Distributed data and production

Cache-aside pattern and cache invalidation

Cache consistency and stale data

Redis data structures and TTL

Eventual consistency and read-after-write behavior

Idempotency keys and duplicate request prevention

Transactional outbox and reliable event publishing

Soft deletes vs hard deletes

Audit trails and data retention

Database backup, restore and recovery objectives

Connection pool exhaustion and slow-query investigation

Copy DB checklist

### Database interview questions to practise

1. When would you choose PostgreSQL over MongoDB for an order-management system?

2. How would you model customers, orders, order items and products in SQL?

3. How would you represent the same entities in MongoDB, and why might the design differ?

4. What anomalies can database normalization prevent?

5. Why can adding an index make a write-heavy workload slower?

6. How would you investigate a query that becomes slow as a collection grows?

7. What happens when two requests attempt to purchase the last available item?

8. How would you guarantee that an order and its required audit record are stored consistently?

9. How would you prevent duplicate webhook events from applying the same update twice?

10. What is the difference between atomicity within one MongoDB document and a multi-document transaction?

11. When would you embed an order's items instead of referencing a separate collection?

12. How would you migrate a production database schema without breaking the currently deployed application?

## 2. Operating Systems — particularly for backend development

Priority: P0 for fundamentals · P1 for deeper internals

You don't need to study OS like a systems-programming specialist. Focus on how processes, threads, memory, scheduling and I/O affect a Node.js application running in production.

0/38 concepts revised

A. Processes and threads

Program vs process vs thread

Process address space and isolation

User mode vs kernel mode

System calls and context switching

Process creation and termination

Threads, concurrency and parallelism

Inter-process communication: pipes, sockets and shared memory

Race conditions, critical sections and mutexes

Deadlocks: mutual exclusion, hold-and-wait, no preemption and circular wait

CPU-bound vs I/O-bound workloads

B. Memory management

Stack vs heap memory

Virtual memory and address spaces

Paging and page faults

Memory allocation and deallocation

Garbage collection and memory leaks

Resident set size (RSS) vs heap usage

Out-of-memory failures

Memory pressure and swap

Why large JSON payloads can increase memory usage

C. Scheduling and I/O

CPU scheduling and time slicing

Blocking vs non-blocking I/O

Synchronous vs asynchronous operations

Interrupts and I/O completion at a conceptual level

File descriptors and resource limits

Sockets and connection lifecycle

Disk I/O vs network I/O

Buffering, streams and backpressure

Why excessive concurrency can overload a service

D. Linux and production debugging

Processes, PIDs, signals and exit codes

SIGTERM vs SIGKILL

Graceful shutdown

Environment variables and process configuration

File permissions and ownership

CPU, memory and disk monitoring

File descriptor exhaustion

Disk-full failures and log rotation

Basic commands: ps, top, free, df, du, lsof, ss, curl, grep and journalctl

Docker containers and Linux process isolation

Copy OS checklist

### Node.js-specific OS questions

These are particularly important because they connect OS fundamentals directly to your backend stack.

1. Node.js is often described as single-threaded. What exactly is single-threaded, and which work can happen on other threads?

2. What is the difference between the JavaScript call stack, the event loop and libuv's thread pool?

3. Why can one CPU-intensive function make unrelated API requests slow?

4. When would you use worker threads instead of child processes?

5. How does asynchronous file I/O differ from synchronous file I/O?

6. What is backpressure, and how do streams help process large files?

7. How would you investigate a Node.js process consuming excessive CPU?

8. How would you diagnose memory growth that eventually crashes a service?

9. Why should an API server handle `SIGTERM` gracefully?

10. What happens if a service opens too many database or network connections?

11. How do containers use OS isolation, and are containers equivalent to virtual machines?

12. How would you investigate a production service that works locally but fails on a Linux server?

Practical exercises

- Run a small Node.js API and observe its process and memory usage.

- Compare synchronous file reading with asynchronous file reading.

- Create a CPU-heavy endpoint and observe its effect on concurrent requests.

- Stream a large file instead of loading it completely into memory.

- Handle `SIGTERM` and close the HTTP server and database connection gracefully.

## 3. Computer networking — full-stack and backend

Priority: P0 · Directly relevant to REST APIs, authentication and external integrations.

0/47 concepts revised

A. Network fundamentals

OSI model and TCP/IP model

IP addresses, subnet masks and ports

Private vs public IP addresses

DNS resolution and caching

TCP vs UDP

TCP three-way handshake and connection termination

Packet loss, retransmission and congestion control

Latency vs bandwidth vs throughput

NAT, firewalls and basic routing

Loopback address and localhost

B. HTTP and HTTPS

HTTP request and response structure

HTTP methods and safe/idempotent semantics

Status codes and error responses

Headers, cookies and content types

HTTP/1.1 vs HTTP/2 vs HTTP/3 at a conceptual level

Keep-alive and connection reuse

TLS handshake and certificate validation

Symmetric vs asymmetric encryption

HTTPS termination at a reverse proxy or load balancer

Compression, caching headers, ETag and conditional requests

CORS, preflight OPTIONS requests and browser enforcement

HTTP redirects and reverse proxies

C. Browser-to-backend communication

What happens when a user enters a URL

DNS → TCP/TLS → HTTP request → response → rendering

Browser cache vs CDN cache vs server cache

Cookies vs localStorage vs sessionStorage

Same-origin policy and CORS

Cookie-based authentication and CSRF

XSS and secure token handling

WebSockets vs Server-Sent Events vs polling

Request cancellation and AbortController

Frontend retries, race conditions and stale responses

Large uploads, multipart requests and streaming downloads

D. Backend networking and production

Client-server architecture

Reverse proxy vs forward proxy

Load balancers and health checks

Connection pooling and keep-alive

Timeouts, retries, exponential backoff and jitter

Rate limiting and API gateways

Webhooks and request-signature verification

Service discovery and internal service communication

Network partitions and partial failures

TLS certificates and certificate renewal

IPv4 vs IPv6 basics

Diagnosing DNS, connection-refused and timeout errors

CDN and edge caching

Basic observability: request IDs, latency and error rates

Copy networking checklist

### Networking questions to practise

1. What happens from the moment a user enters `vijaysales.com` until the page appears?

2. Why does HTTPS require both encryption and certificate validation?

3. Explain CORS. Is CORS a mechanism that prevents unauthorized API access from every kind of client?

4. Why can a request succeed in Postman but fail in the browser?

5. What is the difference between a connection timeout and a response timeout?

6. When is retrying a failed HTTP request unsafe?

7. What happens if a backend API returns `429 Too Many Requests`?

8. How do keep-alive and connection pooling improve performance?

9. What is the difference between a reverse proxy and a load balancer?

10. How would you troubleshoot an API that works on localhost but times out in production?

11. When would you use WebSockets, SSE or polling for order tracking?

12. How would you protect a webhook endpoint exposed to the public internet?

13. What is the difference between DNS failure, connection refusal, TLS failure and an HTTP 500?

14. How do cookies, CORS and CSRF interact in a browser-based authentication flow?

## 4. SOLID principles and object-oriented design

Priority: P1 · Most useful for LLD and maintainable Node.js services.

| Principle                 | What to understand                                                    | Example                                                                 |
| ------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| S — Single Responsibility | One cohesive reason to change                                         | Separate notification delivery from order business rules                |
| O — Open/Closed           | Extend behavior without repeatedly modifying stable code              | Add an SMS provider through an adapter                                  |
| L — Liskov Substitution   | Implementations must honor the abstraction's contract                 | Every notification provider must satisfy the expected delivery behavior |
| I — Interface Segregation | Clients should not depend on irrelevant methods                       | Separate read-only order access from order modification                 |
| D — Dependency Inversion  | High-level logic depends on abstractions, not concrete infrastructure | `OrderService` receives an `OrderRepository` dependency                 |

### Questions to practise

- What problem does each SOLID principle solve?

- Explain an example of violating each principle.

- Can applying SOLID make code worse? When does abstraction become overengineering?

- What is the difference between dependency injection and dependency inversion?

- How would you make a notification service support WhatsApp, SMS and email?

- How would you unit-test an order service without connecting to MongoDB?

- When would you prefer composition over inheritance?

- How do interfaces in TypeScript differ from runtime JavaScript objects?

- How do you apply SOLID without creating unnecessary classes for every function?

### LLD exercise

Design a notification service with the following responsibilities:

- Accept a notification request.

- Choose an eligible delivery channel.

- Send through a provider adapter.

- Handle failures and retry eligible errors.

- Record delivery status.

- Allow providers to be replaced without changing the core business logic.

Draw the class diagram first, then implement a small TypeScript version and write unit tests.

## 5. ER diagrams — database schema design practice

An Entity–Relationship (ER) diagram describes the data model: entities, attributes, primary and foreign keys, and relationships with cardinality. It is the bridge between business requirements and a relational database schema.

For MongoDB, the same exercise is useful for discovering entities and relationships, but the final schema may embed or denormalize data based on query patterns.

### ER diagram concepts to learn

- Entities, attributes, identifiers and candidate keys.

- Primary keys, foreign keys and unique constraints.

- One-to-one, one-to-many and many-to-many relationships.

- Optional versus mandatory relationships.

- Associative/junction entities.

- Weak entities and identifying relationships.

- Normalization and functional dependencies.

- Audit history and temporal records.

- Referential integrity and delete behavior.

- Translating ER diagrams into SQL tables and MongoDB collections.

### ER diagram questions to draw and practise

## ER diagram practice tracker

1. E-commerce order management

Essential

Model customers, products, orders, order items, payments, addresses and shipments.

Follow-up: Can an order contain multiple products? What price should be stored when the product price changes? Can an order have multiple shipments or payment attempts?

Practise this ER design

2. L1–L3 approval workflow

Essential

Model employees, roles, permissions, vendor agreements, approval steps, approval decisions and audit history.

Follow-up: How do you model delegation, rejection, resubmission and multiple approvers at one level?

Practise this ER design

3. Product reviews and ratings

Essential

Model customers, products, reviews, ratings, moderation status and review votes.

Follow-up: Can a customer review a product more than once? How would you calculate average ratings efficiently?

Practise this ER design

4. Inventory across retail stores

Essential

Model products, stores, inventory balances, stock movements and reservations.

Follow-up: How do you track the same product in different stores and preserve stock-movement history?

Practise this ER design

5. Customer support ticketing

Essential

Model customers, support tickets, assigned agents, messages, attachments and ticket-status history.

Follow-up: How would you represent reassignment, multiple messages and a complete audit trail?

Practise this ER design

6. Notification delivery system

Intermediate

Model notification requests, delivery attempts, providers, channels, templates and callback events.

Follow-up: How do you distinguish a logical notification from multiple delivery attempts and duplicate callbacks?

Practise this ER design

7. User RBAC system

Intermediate

Model users, roles, permissions, role assignments and resource-level access.

Follow-up: How would you support multiple roles per user and permissions scoped to a specific store or department?

Practise this ER design

8. ERP/POS integration

Intermediate

Model external systems, synchronization jobs, external identifiers, sync attempts and failure records.

Follow-up: How do you map external IDs, handle retries and detect records changed on either side?

Practise this ER design

9. Employee and asset lifecycle

Intermediate

Model employees, departments, assets, asset assignments, maintenance and return records.

Follow-up: How do you maintain assignment history and prevent one asset from being assigned to two employees simultaneously?

Practise this ER design

10. Retail returns and refunds

Advanced

Model orders, order items, return requests, return items, inspections, refunds and inventory adjustments.

Follow-up: How do partial returns work? How do you prevent a refund or stock restoration from being applied twice?

Practise this ER design

0/10 diagrams practised

### What your ER diagram answer should include

For each exercise, practise this sequence:

1. Extract nouns and business rules from the requirements.

2. Identify entities and their important attributes.

3. Mark primary keys, foreign keys and uniqueness requirements.

4. Draw relationships and cardinalities.

5. Resolve many-to-many relationships using junction tables where appropriate.

6. Check normalization and historical-data requirements.

7. Explain indexes and the main query patterns.

8. Translate the design into SQL tables.

9. Explain how you would model it in MongoDB and what trade-offs change.

For example, an order item should generally retain the purchase-time price and quantity rather than relying only on the current product price. This is an example of how business rules influence schema design.

## 6. UML diagrams — LLD and object-oriented design

UML is a family of modeling diagrams. For your interview, prioritize class diagrams, sequence diagrams and activity diagrams rather than attempting to memorize every UML notation.

![ByteByteGo | UML Class Diagrams Cheatsheet](https://images.openai.com/static-rsc-4/_GF9g41Pf9LEgX_DsVoOg--R58lg07QwKsNgNDfaxioNftngIrXTqNwDp19bbVrVQxdSeWD3uplodwLPKWh0WdKzbL47Bie6TIjIaE0ygJANvps76iuuy30Zt8l_hMcnBR2vQw6rEbzeqU7HO7LPShUaipLf0NCEFs3VlNhpeVA?purpose=inline)

Add to Favorites

A. Class diagram — highest priority

Shows classes, attributes, methods, relationships, inheritance and composition.

Practise: `OrderService`, `OrderRepository`, `PaymentProcessor`, `NotificationProvider`.

![Архитектурный стиль или протокол? Что нужно знать аналитику для работы с API / Хабр](https://images.openai.com/static-rsc-4/koWyrnYv-02YJRYe0aUauSqJ4fv4_NPDCEbo6oMepqI_TlT67CDZLrKmqlJTI_U6hq-Z9eU9ecpDp6BM4fxePwoxFgjkA7rIy1zNHCTv8nwtluL-tG98lWguUs8MvVN7EwFafMpjQhO_eaCkZu6aYEjZuJ4HF-4DpVAAi8jTmuA?purpose=inline)

Add to Favorites

B. Sequence diagram — highest priority

Shows the order of messages between components over time.

Practise: placing an order, refreshing an access token, handling a webhook and retrying a notification.

![Classic Business Process Modeling Solution | ConceptDraw.com](https://images.openai.com/static-rsc-4/FBiFmJhuZYv8G-etx9Zpd22kBFGlFYkAUZRTYbVMc1HkE4ks9xw8TQzIuxRatQIiSR-uI8JuExbqD_LnLtyiaf4oGUWMiWFSSoQ7K6cMrTw_9XIL39mYWPm0nQJssCRMcBRinA94aw5oMppmhMo8qiPNLcYuIXKsKfizVPh9SwM?purpose=inline)

Add to Favorites

C. Activity diagram

Shows workflow steps, decisions, branching and parallel activities.

Practise: L1–L3 approvals, order cancellation and refund processing.

![Free State Diagram Generator | State Transition Diagram Maker Online - Figviz](https://images.openai.com/static-rsc-4/HNlAwWwJg3bQH5esQ38eZ5CRG7ZU5rdNaTm6q3WM1Ec31dshZeuZy-gVXXwAxMo7lfCkrLLaQB8EdA7JLnO4lEB3z8FYg6V8gi3IOl-fKAhVVBGzlFEFmL9FmEcWnj3V8cc4hYLbjDjL2nFuAOOS4qGHbUh7TBBdIZIBioQMzGo?purpose=inline)

Add to Favorites

D. State machine diagram

Shows states, transitions, guards and events.

Practise: order lifecycle, approval status, notification delivery status.

### UML notation to understand

- Association versus dependency.

- Aggregation versus composition.

- Inheritance and interface realization.

- Multiplicity: `1`, `0..1`, `*`, `1..*`.

- Public and private members.

- Sequence diagram lifelines, messages, return messages and activation bars.

- Conditional and loop fragments: `alt`, `opt`, `loop`.

- State transitions, guards and entry/exit actions.

### UML design questions to practise

1. Design an order-management service

Class diagram + sequence diagram for create order, validate stock and persist the order.

Practise UML design

2. Design an L1–L3 approval engine

Class diagram + activity/state diagram for approve, reject, resubmit and audit.

Practise UML design

3. Design a notification service

Class diagram showing provider interfaces, adapters, retries and fallback.

Practise UML design

4. Design a payment integration

Sequence diagram showing authorization, payment failure, retries and idempotency.

Practise UML design

5. Design a webhook processing service

Sequence diagram showing signature validation, event deduplication, persistence and async processing.

Practise UML design

6. Design an API authentication flow

Sequence diagram for login, access-token expiry, refresh rotation and revocation.

Practise UML design

7. Design a product review module

Class diagram for review submission, moderation, repository and rating aggregation.

Practise UML design

8. Design a rate limiter

Class diagram for a rate-limiter interface and token-bucket implementation.

Practise UML design

9. Design a cache abstraction

Class diagram for cache interface, Redis adapter, TTL and invalidation.

Practise UML design

10. Design a return/refund workflow

State machine for requested, approved, received, refunded and rejected states.

Practise UML design

0/10 designs marked complete

## 7. Design principles beyond SOLID

These concepts often come up when an interviewer asks why you chose a particular architecture.

| Concept                           | Questions to understand                                                    |
| --------------------------------- | -------------------------------------------------------------------------- |
| DRY, KISS and YAGNI               | When should you abstract repeated logic? When is abstraction premature?    |
| Separation of concerns            | Why separate controller, service and repository responsibilities?          |
| High cohesion, low coupling       | How do you keep modules focused and independently testable?                |
| Dependency injection              | How do you replace a database or provider in tests?                        |
| Composition over inheritance      | How would you combine notification providers and retry policies?           |
| Design patterns                   | When are Strategy, Adapter, Factory, Observer and Repository useful?       |
| State machines                    | How do you prevent invalid order or approval transitions?                  |
| Domain-driven design basics       | Entities, value objects, aggregates and domain services                    |
| Layered architecture              | What belongs in controller, service, repository and infrastructure layers? |
| Modular monolith vs microservices | What operational costs justify splitting a service?                        |

Practise these questions using the approval engine, order-management API and notification service rather than memorizing isolated definitions.

## 8. Recommended preparation order

Given your upcoming interview, this is the sequence I'd follow:

## 1

Highest

Database design and query fundamentals

ER diagrams, indexes, transactions, normalization, MongoDB embedding vs referencing, atomic updates and concurrency.

## 2

High

Networking and backend OS fundamentals

HTTP/HTTPS, CORS, TCP, DNS, timeouts, retries, event loop, processes, streams and graceful shutdown.

## 3

High

LLD and SOLID

Design the notification service, approval engine and order service. Draw class and sequence diagrams.

## 4

Revision

Advanced database and distributed-system concepts

Sharding, replication, outbox patterns, queue delivery guarantees, cache consistency and advanced OS internals.

The key expectation: be able to go from a business requirement to an ER diagram, convert that into a database schema, define the API, draw a sequence or class diagram, implement the important business logic and explain how the system handles failure.

That demonstrates practical full-stack engineering more convincingly than memorizing dozens of disconnected definitions.
