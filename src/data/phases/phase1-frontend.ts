import { TopicItem } from '../types';

export const phase1Topics: TopicItem[] = [
  // ==========================================
  // JAVASCRIPT FUNDAMENTALS
  // ==========================================
  {
    id: 'fe-js-execution-context',
    title: 'Execution Context & Call Stack',
    subtitle: 'Global vs Function execution context, Lexical Environment, Scope Chain',
    phase: 'phase-1-frontend',
    category: 'JavaScript Fundamentals',
    priority: 'P0',
    estimatedMins: 10,
    theGist:
      'Every time JavaScript code runs, it evaluates inside an Execution Context containing a Variable Environment, Lexical Environment, and "this" binding. The Call Stack manages the LIFO execution order of these contexts.',
    howItWorks:
      'When the JS engine evaluates code, it creates the Global Execution Context (GEC). When a function is called, a new Function Execution Context (FEC) is created in two phases: 1) Creation Phase (allocates memory for variables and functions, sets up scope chain, initializes outer environment reference); 2) Execution Phase (executes code line-by-line). The scope chain resolves identifiers by walking up outer lexical environments until it reaches global or throws a ReferenceError.',
    practicalExample: {
      title: 'Lexical Scope & Execution Context Resolution',
      language: 'javascript',
      code: `function outer() {
  const outerVar = 'I am outer';
  function inner() {
    // Looks in inner FEC -> outer FEC -> GEC
    console.log(outerVar); 
  }
  inner();
}
outer();`,
      explanation: 'inner() maintains an outer reference pointing lexically to outer()’s environment record.',
    },
    interviewAnswer:
      'An Execution Context is the runtime environment in which JavaScript evaluates code. It has two phases: Creation, where memory is allocated for variables and functions (hoisting) and the scope chain is configured, and Execution, where code runs line-by-line. The Call Stack tracks active contexts in LIFO order. Lexical scoping means variable resolution is determined by where functions are written in source code, not where they are invoked.',
    tradeoffsAndGotchas: [
      'Call stack overflow occurs when recursive functions exceed call stack limits (typically ~10k frames in V8).',
      'Lexical scope is static (determined at write-time); "this" binding is dynamic (determined at call-time, unless using arrow functions).',
    ],
    followUpQuestions: [
      'What is the difference between VariableEnvironment and LexicalEnvironment in modern ECMAScript specifications?',
      'How does the engine optimize unused lexical variables in closures to avoid memory leaks?',
    ],
    externalLinks: [
      { title: 'MDN - Closures & Lexical Scoping', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures' },
    ],
  },
  {
    id: 'fe-js-hoisting-tdz',
    title: 'Hoisting & Temporal Dead Zone (TDZ)',
    subtitle: 'var vs let vs const, function declarations vs expressions',
    phase: 'phase-1-frontend',
    category: 'JavaScript Fundamentals',
    priority: 'P0',
    estimatedMins: 8,
    theGist:
      'Hoisting is the engine behavior where declarations are registered in memory during the creation phase before execution. var is initialized with undefined; let and const remain uninitialized in the TDZ until evaluated.',
    howItWorks:
      'Function declarations are hoisted with their complete definition. "var" declarations are hoisted and initialized to "undefined". "let" and "const" are also hoisted into their block scope, but accessing them before their declaration line throws a ReferenceError because they are in the Temporal Dead Zone (TDZ). Function expressions assigned to var/let/const follow their variable declaration rules.',
    practicalExample: {
      title: 'TDZ vs Hoisting Behavior',
      language: 'javascript',
      code: `// Function declaration hoisted
greet(); // Works: "Hello!"
function greet() { console.log("Hello!"); }

// var is hoisted and initialized to undefined
console.log(a); // undefined
var a = 10;

// let is hoisted but uninitialized (TDZ)
try {
  console.log(b); // ReferenceError: Cannot access 'b' before initialization
} catch (e) { console.error(e.message); }
let b = 20;`,
    },
    interviewAnswer:
      'Hoisting happens because the JS engine compiles code in a creation phase before running it. Function declarations are hoisted fully with body. "var" is hoisted and initialized to undefined, meaning accessing it early returns undefined. "let" and "const" are hoisted within their block scope, but they reside in the Temporal Dead Zone until their definition line executes; attempting to access them in the TDZ causes a ReferenceError. This prevents silent undefined bugs.',
    tradeoffsAndGotchas: [
      'Function expressions (e.g. const fn = () => {}) cannot be called before definition because the variable is in TDZ.',
      'typeof on an undeclared variable returns "undefined", but typeof on a TDZ let/const variable throws a ReferenceError.',
    ],
    followUpQuestions: [
      'Why was TDZ introduced in ES6 instead of defaulting let/const to undefined like var?',
      'What happens when a default function parameter references a later parameter?',
    ],
  },
  {
    id: 'fe-js-closures',
    title: 'Closures & Stale Closure Traps',
    subtitle: 'Lexical scope, private state, memoization, React stale closures',
    phase: 'phase-1-frontend',
    category: 'JavaScript Fundamentals',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'A closure is a function bundled together with references to its surrounding lexical environment. It allows an inner function to retain access to variables from an outer scope even after the outer function has returned.',
    howItWorks:
      'When an outer function finishes execution, its execution context is popped off the call stack. However, if an inner function holds a reference to variables in that outer environment, the Garbage Collector cannot collect that Lexical Environment record. The inner function retains a pointer to that retained scope. In asynchronous callbacks and React hooks (useEffect, useCallback), if dependencies are omitted, closures capture stale values from earlier render passes.',
    practicalExample: {
      title: 'Private State & React Stale Closure Fix',
      language: 'javascript',
      code: `// Module/Private state pattern
function createCounter() {
  let count = 0; // Private variable encapsulated by closure
  return {
    increment: () => ++count,
    getValue: () => count,
  };
}
const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getValue()); // 1

// In React: Avoid stale closures in setInterval by using functional state updater:
// Bad: setCount(count + 1) -> captures initial count 0 forever!
// Good: setCount(prev => prev + 1) -> always reads latest state!`,
    },
    interviewAnswer:
      'A closure occurs when an inner function preserves access to its outer lexical scope even after that outer function has executed and popped from the call stack. Real-world uses include data privacy (factory functions), currying, and memoization. In React, stale closures happen when effects or event listeners capture outdated state variables because dependency arrays are missing or stale. We prevent this by providing correct dependencies or using functional state updaters and useRef.',
    tradeoffsAndGotchas: [
      'Memory leaks: Keeping huge arrays or DOM nodes inside a long-lived closure (e.g., global event listeners) prevents them from being garbage-collected.',
      'Common bug: In loops with "var", every callback shares the same reference; replacing var with "let" creates a new lexical binding per iteration.',
    ],
    followUpQuestions: [
      'How does V8 implement scope allocation for closures (Heap vs Stack allocation)?',
      'How does the useRef hook bypass stale closure issues in React?',
    ],
  },
  {
    id: 'fe-js-this-binding',
    title: '"this" Keyword & Explicit Binding',
    subtitle: 'Global, method call, arrow functions, call/apply/bind',
    phase: 'phase-1-frontend',
    category: 'JavaScript Fundamentals',
    priority: 'P0',
    estimatedMins: 10,
    theGist:
      'The "this" keyword represents the context of invocation for regular functions. In arrow functions, "this" is lexically inherited from where the arrow function was defined.',
    howItWorks:
      'Rule priority for determining "this": 1) "new" keyword creates a fresh object and binds "this" to it; 2) Explicit binding using .call(context, ...args), .apply(context, [args]), or .bind(context); 3) Implicit binding: obj.method() sets "this" to obj; 4) Default binding: in non-strict mode it defaults to global/window, in strict mode it is undefined. Arrow functions do NOT have their own "this", "arguments", or "super" — they capture "this" lexically at definition.',
    practicalExample: {
      title: 'Arrow vs Regular Function Binding',
      language: 'javascript',
      code: `const user = {
  name: 'Anmol',
  regularGreet: function() {
    return \`Hi \${this.name}\`;
  },
  arrowGreet: () => {
    return \`Hi \${this?.name}\`; // "this" is inherited from outer module/window
  }
};

const extracted = user.regularGreet;
console.log(extracted()); // undefined (lost context, default binding)
console.log(extracted.call(user)); // "Hi Anmol" (explicit)
const bound = extracted.bind(user);
console.log(bound()); // "Hi Anmol"`,
    },
    interviewAnswer:
      'In JavaScript, "this" is evaluated dynamically at call-time based on how a function is called, evaluated in order: new operator, explicit binding (call, apply, bind), implicit object invocation, and default (window or undefined in strict mode). The critical exception is arrow functions: they do not bind their own "this"; instead, they capture "this" lexically from their enclosing scope, making them ideal for callbacks and React event handlers.',
    tradeoffsAndGotchas: [
      'Passing an object method directly as a callback (e.g., setTimeout(user.greet, 1000)) loses implicit binding.',
      'Arrow functions cannot be used as constructors (calling new with an arrow function throws a TypeError) and cannot be rebound using .bind().',
    ],
    followUpQuestions: [
      'How does Function.prototype.bind work under the hood? Can you implement a polyfill for bind?',
      'Why do React class component event handlers historically require manual binding in the constructor?',
    ],
  },
  {
    id: 'fe-js-prototypes',
    title: 'Prototypes & Prototype Chain',
    subtitle: '__proto__, prototype, prototypal inheritance, ES6 classes',
    phase: 'phase-1-frontend',
    category: 'JavaScript Fundamentals',
    priority: 'P1',
    estimatedMins: 10,
    theGist:
      'JavaScript uses prototypal inheritance. Every object has an internal [[Prototype]] link (__proto__) pointing to another object from which it inherits properties and methods.',
    howItWorks:
      'When an object property is accessed, the engine first searches the object’s own properties. If not found, it traverses the prototype chain (__proto__) upwards to Object.prototype, and finally null. Constructor functions have a .prototype property that becomes the [[Prototype]] of instances created with "new". ES6 "class" syntax is syntactic sugar over this prototype-based delegation model.',
    practicalExample: {
      title: 'Prototypal Inheritance vs Classes',
      language: 'javascript',
      code: `function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return \`\${this.name} makes a sound\`;
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}
// Link prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() {
  return \`\${this.name} barks!\`;
};

const d = new Dog('Bruno', 'Golden Retriever');
console.log(d.speak()); // Inherited from Animal.prototype: "Bruno makes a sound"
console.log(d.bark());  // Found on Dog.prototype: "Bruno barks!"`,
    },
    interviewAnswer:
      'JavaScript does not have classical class-based inheritance under the hood; it uses prototypal delegation. Every object links to a prototype via [[Prototype]]. When accessing a property, the engine walks up this prototype chain until it finds it or hits null. ES6 classes are syntactic sugar over constructor functions and prototype linking, providing cleaner syntax for inheritance and super calls while retaining prototypal mechanics.',
    tradeoffsAndGotchas: [
      'Modifying Object.prototype (monkey-patching) is an anti-pattern that pollutes all objects in the runtime.',
      'Object.hasOwn(obj, key) or obj.hasOwnProperty(key) checks if a property belongs directly to the instance rather than its prototype chain.',
    ],
    followUpQuestions: [
      'What is the difference between Object.create(null) and {}?',
      'How does the "instanceof" operator traverse the prototype chain?',
    ],
  },
  {
    id: 'fe-js-async-event-loop',
    title: 'Event Loop, Microtasks & Macrotasks',
    subtitle: 'Call stack, libuv / browser runtime, Promise vs setTimeout order',
    phase: 'phase-1-frontend',
    category: 'Asynchronous JavaScript',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'The Event Loop coordinates JavaScript execution, asynchronous callbacks, and rendering. The Call Stack runs synchronous code; microtasks (Promises, queueMicrotask) drain completely before the next macrotask (setTimeout, setInterval, I/O) or render step.',
    howItWorks:
      '1. Synchronous code runs on the Call Stack to completion. 2. When async operations complete, browser WebAPIs push callbacks to queues. 3. When the stack is empty, the Event Loop first drains ALL jobs in the Microtask Queue (including newly queued microtasks). 4. If due, the browser performs requestAnimationFrame and style/layout/paint rendering. 5. The Event Loop then picks ONE task from the Macrotask (Task) Queue and executes it. 6. Repeat.',
    practicalExample: {
      title: 'Execution Order Predictor',
      language: 'javascript',
      code: `console.log('1: Sync');

setTimeout(() => {
  console.log('2: Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3: Microtask 1');
}).then(() => {
  console.log('4: Microtask 2');
});

queueMicrotask(() => {
  console.log('5: Microtask 3');
});

console.log('6: Sync End');

// Output order: 1, 6, 3, 5, 4, 2`,
    },
    interviewAnswer:
      'JavaScript is single-threaded, but the host environment (browser or Node) provides asynchronous I/O. The Event Loop monitors the Call Stack and Task Queues. When the stack clears, the microtask queue (Promise reactions, queueMicrotask) is completely drained before any macrotask (setTimeout, setInterval, I/O) runs or before the browser paints. This is why microtask starvation (e.g. recursive promises) can freeze UI rendering.',
    tradeoffsAndGotchas: [
      'setTimeout(fn, 0) does not run immediately; it yields to the macrotask queue with a minimum browser clamp of ~4ms for nested timers.',
      'In Node.js, process.nextTick has an even higher priority queue that drains before Promise microtasks.',
    ],
    followUpQuestions: [
      'Where does requestAnimationFrame fit in relation to the macrotask and microtask queues?',
      'How does Node.js event loop (Timers, Poll, Check) differ from browser HTML5 event loop specs?',
    ],
  },
  {
    id: 'fe-js-promise-combinators',
    title: 'Promise Combinators & Concurrency',
    subtitle: 'Promise.all vs allSettled vs race vs any, fail-fast vs resilient',
    phase: 'phase-1-frontend',
    category: 'Asynchronous JavaScript',
    priority: 'P0',
    estimatedMins: 10,
    theGist:
      'JavaScript provides four combinators to handle multiple concurrent asynchronous promises with distinct short-circuiting and failure characteristics.',
    howItWorks:
      '1. Promise.all: Resolves when ALL promises resolve with an array of values; rejects immediately (fail-fast) if ANY promise rejects. 2. Promise.allSettled: Waits for ALL promises to complete, returning an array of {status, value|reason} descriptor objects; never rejects. 3. Promise.race: Settles as soon as the FIRST promise settles (resolves or rejects). 4. Promise.any: Resolves as soon as the FIRST promise resolves; rejects only if ALL reject with an AggregateError.',
    practicalExample: {
      title: 'Resilient Dashboard Fetch with allSettled',
      language: 'javascript',
      code: `async function fetchDashboard() {
  const [profileResult, ordersResult, metricsResult] = await Promise.allSettled([
    fetch('/api/profile').then(r => r.json()),
    fetch('/api/orders').then(r => r.json()),
    fetch('/api/metrics').then(r => r.json()),
  ]);

  return {
    profile: profileResult.status === 'fulfilled' ? profileResult.value : null,
    orders: ordersResult.status === 'fulfilled' ? ordersResult.value : [],
    metrics: metricsResult.status === 'fulfilled' ? metricsResult.value : null,
  };
}`,
    },
    interviewAnswer:
      'Promise.all is fail-fast and best when all operations are interdependent (e.g. transactional checkout). Promise.allSettled is resilient and waits for all promises regardless of success, perfect for dashboards or batch reports where partial failures can be handled gracefully. Promise.race settles with the earliest outcome (useful for request timeout wrappers), while Promise.any settles with the first successful resolution, ideal for querying redundant CDN mirrors.',
    tradeoffsAndGotchas: [
      'Uncaught rejections in Promise.all: Even though Promise.all rejects on the first error, background promises continue running to completion without being cancelled.',
      'To cancel inflight HTTP requests when using race or timeouts, you must explicitly use AbortController.',
    ],
    followUpQuestions: [
      'How would you write a polyfill for Promise.all?',
      'How do you implement a concurrency limiter that executes 100 promises with a limit of 5 concurrently?',
    ],
  },
  {
    id: 'fe-js-abortcontroller',
    title: 'AbortController & Request Cancellation',
    subtitle: 'Cancelling fetch, avoiding race conditions in search/autocomplete',
    phase: 'phase-1-frontend',
    category: 'Asynchronous JavaScript',
    priority: 'P0',
    estimatedMins: 8,
    theGist:
      'AbortController allows cancelling asynchronous operations (like Fetch, EventListeners, and streams) on-demand, preventing race conditions and stale response overwrites.',
    howItWorks:
      'An AbortController instance exposes an .abort(reason?) method and an associated .signal property. When passed to fetch({ signal }), calling controller.abort() rejects the fetch promise with an DOMException named "AbortError" and cancels the underlying network transfer at the browser socket level. In React useEffect or search components, cleanup functions trigger abort() when the user types a new character or unmounts.',
    practicalExample: {
      title: 'Race-Condition Proof Search Hook',
      language: 'typescript',
      code: `import { useEffect, useState } from 'react';

function useSearch(query: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();

    async function executeSearch() {
      try {
        const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, {
          signal: controller.signal
        });
        const result = await res.json();
        setData(result);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Fetch failed:', err);
        }
      }
    }

    executeSearch();
    return () => controller.abort(); // Cancel if query changes or unmounts!
  }, [query]);

  return data;
}`,
    },
    interviewAnswer:
      'AbortController provides a standardized API to signal abort events to asynchronous operations. When passed as signal to fetch, calling abort() terminates the HTTP socket connection immediately and rejects the promise with an AbortError. This is essential in typeahead search and tab navigation to prevent race conditions where an earlier, slow request returns after a later, fast request and overwrites current UI state.',
    tradeoffsAndGotchas: [
      'Always catch and inspect error.name === "AbortError" so you do not surface expected cancellations as user-facing network errors.',
      'AbortSignal.timeout(ms) provides a convenient one-liner for request timeouts in modern runtimes.',
    ],
    followUpQuestions: [
      'How do you pass a single AbortSignal to both a network fetch and a custom event listener?',
      'Does aborting a fetch cancel the request processing on the backend server?',
    ],
  },
  {
    id: 'fe-js-debounce-throttle',
    title: 'Debounce vs Throttle Implementation',
    subtitle: 'Closures, timers, scroll vs input events, trailing & leading options',
    phase: 'phase-1-frontend',
    category: 'Asynchronous JavaScript',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'Debounce delays function execution until a burst of events has paused for N ms. Throttle guarantees execution at most once every N ms regardless of how many times triggered.',
    howItWorks:
      'Debounce resets a timer on every trigger: if events keep arriving within the delay window, the previous timer is cancelled via clearTimeout and a new one starts. Execution happens on trailing edge. Throttle tracks the timestamp of the last execution (or uses a locked timer flag) and ignores subsequent calls until the interval elapses, ensuring a smooth, fixed execution rate.',
    practicalExample: {
      title: 'Clean Hand-Crafted Implementations',
      language: 'javascript',
      code: `// Debounce: Wait until inactivity
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Throttle: Execute at most once per window
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}`,
    },
    interviewAnswer:
      'Debounce ensures that a function is executed only after a specified period of inactivity has elapsed, making it ideal for search bar autocomplete, window resize, and autosave. Throttle ensures a function runs at a maximum frequency of once every N milliseconds, making it ideal for continuous events like window scroll position tracking, game loops, or drag-and-drop mouse movements.',
    tradeoffsAndGotchas: [
      'When using debounce in React functional components, wrapping the debounced function in useCallback or useRef is mandatory; otherwise a fresh debounced function with fresh timer closure is recreated on every render.',
      'Be mindful of preserving the correct "this" context and function arguments using fn.apply(this, args).',
    ],
    followUpQuestions: [
      'How would you support a { leading: true, trailing: true } option in a throttle implementation?',
      'Why can excessive throttle/debounce listeners still cause frame drops if the callback contains layout thrashing?',
    ],
  },

  // ==========================================
  // REACT FUNDAMENTALS & INTERNALS
  // ==========================================
  {
    id: 'fe-react-rendering-lifecycle',
    title: 'React Rendering Lifecycle & Fiber',
    subtitle: 'Render phase vs Commit phase, Fiber architecture, WorkInProgress',
    phase: 'phase-1-frontend',
    category: 'React Fundamentals',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'React separates rendering into two distinct phases: the Render phase (pure calculation of UI differences via Fiber reconciliation, interruptible) and the Commit phase (DOM mutation and layout effects, synchronous).',
    howItWorks:
      '1. Trigger: State or prop change queues a render. 2. Render Phase: React calls component functions, builds a WorkInProgress Fiber tree, compares it with current Fiber tree (diffing), and prepares an effect list. This phase is pure and has no DOM side effects. 3. Commit Phase: React synchronously applies DOM mutations (insert, update, delete). 4. Layout Effects (useLayoutEffect) run synchronously before browser paints. 5. Browser paints pixels. 6. Passive Effects (useEffect) run asynchronously after paint.',
    practicalExample: {
      title: 'Mental Model: Render vs Commit',
      language: 'javascript',
      code: `// Render Phase (Runs multiple times, must be pure):
function MyComponent({ status }) {
  // Pure computation only - NO DOM mutations, NO global side effects!
  const derived = status.toUpperCase(); 

  // Commit Phase / Passive Effect:
  useEffect(() => {
    // Runs AFTER browser paint:
    analytics.track('Viewed', { status });
  }, [status]);

  return <div>{derived}</div>;
}`,
    },
    interviewAnswer:
      'In React, a render cycle consists of the Render phase and the Commit phase. In the Render phase, React recursively calls component functions to produce JSX, creates the Fiber work-in-progress tree, and computes diffs. In the Commit phase, React applies DOM changes synchronously. Then, useLayoutEffect runs before browser paint, the browser paints, and useEffect callbacks execute asynchronously. Keeping render functions pure is critical because concurrent React can pause, resume, or discard render work.',
    tradeoffsAndGotchas: [
      'Setting state directly in component body without effects causes an infinite render loop.',
      'useLayoutEffect blocks browser paint; use it only when reading DOM measurements to avoid visual flicker (e.g. tooltip positioning).',
    ],
    followUpQuestions: [
      'What problem did the Fiber architecture solve over the old Stack reconciler in React 15?',
      'How does React 18 automatic batching work across setTimeout, fetch callbacks, and native event handlers?',
    ],
  },
  {
    id: 'fe-react-reconciliation-keys',
    title: 'Reconciliation, Diffing Algorithm & Keys',
    subtitle: 'Virtual DOM diffing heuristics, O(n) algorithm, key pitfalls',
    phase: 'phase-1-frontend',
    category: 'React Fundamentals',
    priority: 'P0',
    estimatedMins: 10,
    theGist:
      'React’s diffing algorithm achieves O(n) complexity through two heuristics: 1) Two elements of different types produce different trees; 2) Elements with stable "key" props preserve identity across renders.',
    howItWorks:
      'Standard tree diffing is O(n³). React uses O(n) heuristics: if element type changes (e.g., <div> to <span>), React unmounts the old tree completely, destroying state. If types match, React updates only changed attributes. In lists of children, keys act as stable identities. Using array index as key breaks when items are reordered, inserted, or deleted because indices shift, causing state to attach to the wrong component instance and preventing DOM reuse.',
    practicalExample: {
      title: 'The Index as Key Trap',
      language: 'tsx',
      code: `// BAD: If items are prepended, index 0 now represents new item,
// but uncontrolled inputs or local state will stick to index 0!
{items.map((item, index) => (
  <TodoItem key={index} todo={item} />
))}

// GOOD: Use stable, unique identifier from data
{items.map((item) => (
  <TodoItem key={item.id} todo={item} />
))}`,
    },
    interviewAnswer:
      'Reconciliation is the process through which React diffs current and work-in-progress Fiber trees. It achieves O(n) performance using two assumptions: components of different types will produce different trees, and list items have unique, stable keys. Keys provide stable identity across renders. Using array indices as keys leads to severe bugs during insertions or sorting because children shift indices, causing React to mismatch component instances, preserve incorrect state, and perform unnecessary re-renders.',
    tradeoffsAndGotchas: [
      'Generating random keys on the fly (e.g. key={Math.random()}) causes the component to completely unmount and remount on EVERY render, destroying focus and state.',
      'You can intentionally use a key to reset a component’s state (e.g. <UserProfile key={userId} />).',
    ],
    followUpQuestions: [
      'How does React diff a single element against an array of children in child reconciliation?',
      'Why does changing an element’s parent tag (e.g. wrapping in a new div) destroy child state?',
    ],
  },
  {
    id: 'fe-react-hooks-rules-state',
    title: 'useState Batching & Functional Updates',
    subtitle: 'Fiber linked list of hooks, why top-level, stale state updates',
    phase: 'phase-1-frontend',
    category: 'React Fundamentals',
    priority: 'P0',
    estimatedMins: 10,
    theGist:
      'Hooks rely on call order to link to Fiber nodes. useState batches multiple updates together to prevent excessive renders; functional updates ensure calculations use the latest pending state.',
    howItWorks:
      'Inside each Fiber, hooks are stored as a singly linked list. Because hooks do not have custom names, React matches hook calls to Fiber nodes strictly by their index in the execution order. This is why hooks must never be called inside conditions or loops. Starting with React 18, all state updates (including those inside Promises, setTimeout, and native event handlers) are automatically batched into a single render pass via microtask batching.',
    practicalExample: {
      title: 'Batching & Functional State Updates',
      language: 'tsx',
      code: `function Counter() {
  const [count, setCount] = useState(0);

  const handleIncorrect = () => {
    // All 3 use current closure count (0): 0 + 1 = 1
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // Result after 1 render: count is 1!
  };

  const handleCorrect = () => {
    // Queues 3 pending updater functions: prev => prev + 1
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // Result after 1 render: count is 3!
  };

  return <button onClick={handleCorrect}>Count: {count}</button>;
}`,
    },
    interviewAnswer:
      'Hooks must be called at the top level because React tracks hook state as a singly linked list on the component’s Fiber node; altering call order breaks the state index mapping. React 18 batches multiple state updates automatically into a single render pass to maintain 60fps responsiveness. When subsequent state calculations depend on preceding state within the same event or asynchronous callback, functional updates (prev => prev + 1) must be used to access the pending queue rather than the closed-over stale state.',
    tradeoffsAndGotchas: [
      'Calling setState with the same primitive value (Object.is equality) bails out of rendering early without triggering a child re-render.',
      'Passing an object to useState without spreading (mutating existing object reference) will NOT trigger a re-render because referential equality check passes.',
    ],
    followUpQuestions: [
      'How does React implement hook dispatchers (HooksDispatcherOnMount vs HooksDispatcherOnUpdate)?',
      'What is the difference between passing an initial value vs an initializer function to useState?',
    ],
  },
  {
    id: 'fe-react-useeffect-lifecycle',
    title: 'useEffect: Dependencies, Cleanup & Race Conditions',
    subtitle: 'Passive effects, cleanup timing, subscriptions, synchronization',
    phase: 'phase-1-frontend',
    category: 'React Fundamentals',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'useEffect synchronizes a component with external systems (network, DOM, timers). Cleanups execute before the effect re-runs and on unmount to prevent leaks and race conditions.',
    howItWorks:
      'After the browser finishes painting, React executes pending useEffect callbacks. On subsequent renders, React checks dependency arrays using Object.is. If any dependency changed: 1) React executes the previous render’s cleanup function; 2) React executes the new effect function. In React 18 StrictMode (dev mode), components mount, unmount, and remount once to verify effect cleanups prevent memory leaks and dangling subscriptions.',
    practicalExample: {
      title: 'Subscription Synchronization & Cleanup Pattern',
      language: 'tsx',
      code: `useEffect(() => {
  let isCancelled = false;

  async function loadData() {
    const response = await fetchUserData(userId);
    if (!isCancelled) {
      setUser(response);
    }
  }

  loadData();

  return () => {
    // Cleanup runs before next effect OR on unmount:
    isCancelled = true;
  };
}, [userId]); // Only re-runs if userId changes`,
    },
    interviewAnswer:
      'useEffect is designed for synchronization with external systems, not for calculating derived state. It runs asynchronously after browser paint to avoid blocking the UI thread. A cleanup function returned from useEffect runs immediately before the effect executes again with new dependencies and when the component unmounts. For data fetching, proper cleanup (via AbortController or cancellation flags) is crucial to prevent setting state on unmounted components or displaying stale responses from race conditions.',
    tradeoffsAndGotchas: [
      'Do not use useEffect to compute derived state (e.g. calculating total from cart items) — compute it inline during render or with useMemo.',
      'Objects and functions declared inside component bodies change reference every render; if placed in dependency array without useMemo/useCallback, effect re-runs on every render.',
    ],
    followUpQuestions: [
      'What is the difference between useEffect and useLayoutEffect execution order in relation to browser painting?',
      'Why did React 18 introduce StrictMode double invocation for effects?',
    ],
  },
  {
    id: 'fe-react-memo-usememo-usecallback',
    title: 'React.memo, useMemo & useCallback',
    subtitle: 'Referential equality, memoization costs, when NOT to use them',
    phase: 'phase-1-frontend',
    category: 'React Performance',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'React re-renders children whenever a parent re-renders by default. React.memo skips re-rendering if props are shallowly equal; useMemo and useCallback stabilize object/function references.',
    howItWorks:
      'React.memo is a higher-order component that compares incoming props with previous props using shallow comparison (Object.is). If props are identical, it skips rendering that component and reuses the previous Fiber output. However, if a parent passes an inline function or newly allocated object, shallow equality fails on every render unless the parent stabilizes them using useCallback (caches function instance) or useMemo (caches computed value).',
    practicalExample: {
      title: 'Targeted Memoization Pair',
      language: 'tsx',
      code: `// Child wrapped with React.memo
const ProductCard = React.memo(function ProductCard({
  product,
  onAddToCart
}: {
  product: Product;
  onAddToCart: (id: string) => void;
}) {
  return <button onClick={() => onAddToCart(product.id)}>{product.title}</button>;
});

function ProductList({ products }: { products: Product[] }) {
  // Stabilize function reference across renders
  const handleAddToCart = useCallback((id: string) => {
    dispatch({ type: 'ADD', payload: id });
  }, []); // Empty deps: stable identity

  return (
    <div>
      {products.map(p => (
        <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
}`,
    },
    interviewAnswer:
      'In React, a child component re-renders whenever its parent re-renders regardless of whether props changed. React.memo prevents this by shallowly comparing props. For React.memo to succeed, reference types (objects, arrays, callbacks) passed as props must have stable referential equality, which is where useMemo and useCallback come in. However, memoization has overhead (memory allocation and dependency comparison). It is justified only for computationally expensive calculations or heavy subtrees with frequent parent re-renders.',
    tradeoffsAndGotchas: [
      'Premature memoization everywhere adds code complexity and comparison overhead that can be slower than lightweight re-renders.',
      'Passing children to a React.memo component often defeats memoization because JSX elements are newly created object literals ({ type, props }) on every render.',
    ],
    followUpQuestions: [
      'Why does wrapping a component in React.memo not stop it from re-rendering when internal state or subscribed Context changes?',
      'How does React Compiler (React Forget) automate memoization?',
    ],
  },
  {
    id: 'fe-react-context-perf',
    title: 'Context API: Re-render Pitfalls & Mitigations',
    subtitle: 'Provider value updates, splitting contexts, selector pattern',
    phase: 'phase-1-frontend',
    category: 'React Fundamentals',
    priority: 'P1',
    estimatedMins: 10,
    theGist:
      'When a Context Provider value updates, EVERY component that consumes that context via useContext re-renders, bypassing React.memo.',
    howItWorks:
      'React Context is not a state management engine; it is a dependency injection mechanism. When a Provider’s "value" prop changes referential equality, React iterates over all consuming Fiber nodes and forces them to re-render. If a single Context object holds both frequently changing state (e.g. typing input) and rarely changing state (e.g. theme or user permissions), consumers subscribed only to the theme will re-render on every keystroke.',
    practicalExample: {
      title: 'Split Context Pattern',
      language: 'tsx',
      code: `// Split into State Context and Dispatch Context:
const AuthStateContext = createContext<AuthState | null>(null);
const AuthDispatchContext = createContext<AuthDispatch | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initial);

  return (
    <AuthStateContext.Provider value={state}>
      {/* dispatch never changes reference */}
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

// Components that only dispatch actions never re-render when state changes!`,
    },
    interviewAnswer:
      'Context API triggers re-renders for every consumer whenever the Provider value changes, without respecting React.memo. To optimize Context performance: 1) Split combined contexts into State and Dispatch contexts so components that only dispatch actions do not re-render; 2) Memoize the Provider value with useMemo; 3) Move localized state down closer to where it is used; 4) For high-frequency state updates (like real-time data or inputs), prefer dedicated state libraries like Zustand or TanStack Query.',
    tradeoffsAndGotchas: [
      'Passing value={{ state, dispatch }} inline creates a new object reference every render, forcing all consumers to re-render even if state did not change.',
      'Context is ideal for low-frequency global settings (theme, locale, current user profile); it is an anti-pattern for rapid animations or large collections.',
    ],
    followUpQuestions: [
      'How does Zustand or Redux use useSyncExternalStore to achieve selector-based fine-grained re-renders?',
      'What happens if a component consumes a Context without an enclosing Provider?',
    ],
  },

  // ==========================================
  // PERFORMANCE & MOBILE-FIRST ENGINEERING
  // ==========================================
  {
    id: 'fe-perf-core-web-vitals',
    title: 'Core Web Vitals & Real-World Optimization',
    subtitle: 'LCP, INP, CLS — diagnosis, measurement and remediation',
    phase: 'phase-1-frontend',
    category: 'Performance Optimization',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'Core Web Vitals quantify real user experience: LCP measures loading speed (<=2.5s), INP measures responsiveness to interaction (<=200ms), and CLS measures visual stability (<=0.1).',
    howItWorks:
      '1. LCP (Largest Contentful Paint): Marks render of largest visual element (hero image, heading). Fix by preloading critical assets (fetchpriority="high"), removing render-blocking scripts, and server-side rendering critical HTML. 2. INP (Interaction to Next Paint): Measures total delay across input latency, JS event processing, and presentation delay. Fix by breaking long tasks (>50ms) using scheduler.yield() or setTimeout, debouncing, and avoiding synchronous layout thrashing. 3. CLS (Cumulative Layout Shift): Fix by reserving explicit width/height or aspect-ratio on images, ads, and dynamic embeds.',
    practicalExample: {
      title: 'High-Impact Web Vital Remediations',
      language: 'html',
      code: `<!-- 1. LCP Fix: Preload hero image with high priority -->
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />

<!-- 2. CLS Fix: Always define aspect-ratio / dimensions on media -->
<img src="/product.webp" width="400" height="300" style="aspect-ratio: 4/3;" alt="Product" />

<!-- 3. INP Fix: Yield main thread during heavy data transformations -->
<script>
async function processLargeList(items) {
  for (let i = 0; i < items.length; i++) {
    computeItem(items[i]);
    if (i % 100 === 0 && 'scheduler' in window) {
      await window.scheduler.yield(); // Lets user clicks and frame paints through!
    }
  }
}
</script>`,
    },
    interviewAnswer:
      'Core Web Vitals focus on LCP, INP, and CLS. To optimize LCP, we eliminate render-blocking CSS/JS, preload hero images with fetchpriority="high", and utilize modern CDN edge caching. To optimize INP, we minimize long tasks on the main thread, debounce input handlers, yield long loops with scheduler.yield(), and avoid expensive synchronous re-renders. To optimize CLS, we reserve explicit layout dimensions (aspect-ratio) for images and dynamic banners, avoiding unsized content insertion.',
    tradeoffsAndGotchas: [
      'INP replaced FID (First Input Delay) in 2024: FID measured only the first click delay, whereas INP evaluates the worst-case interaction latency across the entire user session.',
      'Web fonts causing Flash of Invisible Text (FOIT) contribute to layout shifts; use font-display: optional or size-adjust.',
    ],
    followUpQuestions: [
      'What is layout thrashing (forced synchronous reflow) and how do you detect it in Chrome DevTools Performance panel?',
      'How does content-visibility: auto improve rendering performance on pages with massive DOM nodes?',
    ],
  },
  {
    id: 'fe-perf-virtualization',
    title: 'List Virtualization & Infinite Scroll',
    subtitle: 'Rendering 10,000 items at 60fps, DOM node recycling, overscan',
    phase: 'phase-1-frontend',
    category: 'Performance Optimization',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'Virtualization renders only the items visible in the current viewport (plus a small overscan buffer), keeping the DOM node count constant regardless of dataset size.',
    howItWorks:
      'Instead of mounting 10,000 DOM elements (which destroys memory and causes layout lag), a virtual list uses a parent container with overflow: auto and an inner spacer with total height = (itemsCount * itemHeight). Based on the container’s scrollTop, it calculates startIndex = Math.floor(scrollTop / itemHeight) and endIndex = Math.min(itemsCount, startIndex + visibleCount). Only this slice is rendered, positioned absolutely or with transform: translateY.',
    practicalExample: {
      title: 'Virtual List Math Engine',
      language: 'tsx',
      code: `function VirtualList({ items, itemHeight, height }: { items: string[]; itemHeight: number; height: number }) {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2); // 2 items overscan
  const endIndex = Math.min(items.length, Math.ceil((scrollTop + height) / itemHeight) + 2);

  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  return (
    <div
      style={{ height, overflowY: 'auto', position: 'relative' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map((item, idx) => (
            <div key={startIndex + idx} style={{ height: itemHeight }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
    },
    interviewAnswer:
      'Virtualization solves the problem of rendering large datasets (e.g. e-commerce feeds or audit logs) by calculating which items intersect the active viewport. By rendering only ~15 to 25 DOM elements with an overscan buffer instead of thousands, memory footprint stays low, DOM reflows remain instantaneous, and scrolling maintains 60fps on low-end mobile devices. Libraries like TanStack Virtual handle dynamic row heights using ResizeObserver.',
    tradeoffsAndGotchas: [
      'In-browser Ctrl+F page search does not find unrendered items; solutions include providing custom search bars that query the raw data.',
      'Dynamic variable row heights require measuring rendered heights asynchronously and updating position offsets.',
    ],
    followUpQuestions: [
      'How does IntersectionObserver compare with onScroll event listeners for triggering infinite pagination batches?',
      'How did you optimize coordinate route rendering in your Flipkart live order-tracking map for low-end devices?',
    ],
  },

  // ==========================================
  // MACHINE CODING & CODING PATTERNS
  // ==========================================
  {
    id: 'fe-mc-search-autocomplete',
    title: 'Machine Coding: Search Autocomplete with Debounce & Race Prevention',
    subtitle: 'Keyboard navigation (ArrowUp/Down/Enter), AbortController, caching',
    phase: 'phase-1-frontend',
    category: 'Machine Coding',
    priority: 'P0',
    estimatedMins: 15,
    theGist:
      'Build a robust autocomplete input handling asynchronous debounced queries, network abort on stale input, full keyboard accessibility, and cached results.',
    howItWorks:
      'Key states: query, results, loading, activeIndex (focused index for keyboard navigation). On query change: 1) Debounce call by 300ms; 2) Abort inflight request using AbortController; 3) Check local LRU/Map cache; 4) Fetch new results; 5) Handle keyboard keys (ArrowDown increments activeIndex, ArrowUp decrements, Enter selects, Escape closes); 6) ARIA attributes (role="combobox", aria-expanded, aria-activedescendant).',
    practicalExample: {
      title: 'Production Autocomplete Blueprint',
      language: 'tsx',
      code: `export function Autocomplete({ onSelect }: { onSelect: (item: string) => void }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!query.trim()) { setSuggestions([]); return; }
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, { signal: ctrl.signal });
        const data = await res.json();
        setSuggestions(data.items);
        setIsOpen(true);
      } catch (err: any) {
        if (err.name !== 'AbortError') console.error(err);
      }
    }, 300);

    return () => { clearTimeout(timer); ctrl.abort(); };
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      onSelect(suggestions[activeIndex]);
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); setActiveIndex(-1); }}
        className="w-full px-3 py-2 bg-neutral-800 text-white rounded border border-neutral-700"
        placeholder="Search items..."
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-neutral-900 border border-neutral-700 rounded shadow-lg">
          {suggestions.map((item, idx) => (
            <li
              key={item}
              onClick={() => { onSelect(item); setIsOpen(false); }}
              className={\`px-3 py-2 cursor-pointer \${idx === activeIndex ? 'bg-amber-500/20 text-amber-300' : 'text-neutral-300'}\`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
    },
    interviewAnswer:
      'In machine-coding rounds, interviewers evaluate five essential qualities in an autocomplete component: 1) Performance via debounce; 2) Network resilience and race condition elimination using AbortController; 3) Accessibility with keyboard navigation (Up/Down/Enter/Escape) and ARIA attributes; 4) Clean state transitions for loading, empty, and error states; 5) Separation of data fetching from rendering.',
    tradeoffsAndGotchas: [
      'Race conditions: If user types "apple" and then "ap", the slow "apple" response could finish after "ap", displaying wrong data unless aborted.',
      'Mobile virtual keyboard dismiss behavior on enter/tap must be handled.',
    ],
    followUpQuestions: [
      'How would you add in-memory caching with a 5-minute TTL to avoid repeated API requests for identical queries?',
      'How would you highlight matching substring characters in the suggestion results list?',
    ],
  },
  {
    id: 'fe-mc-modal-portal',
    title: 'Machine Coding: Accessible Modal Dialog & Focus Trap',
    subtitle: 'React Portals, focus trapping, Escape key, body scroll lock',
    phase: 'phase-1-frontend',
    category: 'Machine Coding',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'Build a robust modal dialog using createPortal, handling Escape dismissal, backdrop click, body scroll locking, and accessible keyboard focus trapping.',
    howItWorks:
      '1. Portal: Mounts modal to document.body via ReactDOM.createPortal to escape parent stacking contexts (overflow: hidden or z-index issues). 2. Focus Trap: When opened, focus moves into the modal’s first interactive element; Tab and Shift+Tab wrap focus within the modal boundaries. 3. Scroll Lock: Adds overflow: hidden to document.body on mount and restores previous style on cleanup. 4. Accessibility: role="dialog", aria-modal="true", aria-labelledby.',
    practicalExample: {
      title: 'Accessible Modal Implementation',
      language: 'tsx',
      code: `import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus(); e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus(); e.preventDefault();
        }
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // Lock background scroll
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-neutral-100">{title}</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">✕</button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}`,
    },
    interviewAnswer:
      'A production modal requires four critical engineering details: 1) createPortal to render into document.body, escaping parent z-index and overflow clipping; 2) Focus trapping so keyboard navigation (Tab/Shift+Tab) cycles inside the dialog; 3) Event listeners for Escape key and backdrop clicks with proper cleanup; 4) Locking body scroll while open and restoring previous scroll style on unmount to prevent layout shifts.',
    tradeoffsAndGotchas: [
      'HTML <dialog> element provides built-in showModal() and focus trapping in modern browsers, but custom portals remain standard for advanced styling and cross-browser consistency.',
      'Always remember to return focus to the button that triggered the modal when the modal closes.',
    ],
    followUpQuestions: [
      'How does event bubbling work with React Portals (does a click event inside a portal bubble through the React component tree or the real DOM tree)?',
      'How would you handle nested modals without breaking focus traps?',
    ],
  },
  {
    id: 'fe-mc-toast-queue',
    title: 'Machine Coding: Toast Notification System with Queue',
    subtitle: 'Context + reducer, auto-dismiss timers, paused on hover',
    phase: 'phase-1-frontend',
    category: 'Machine Coding',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'Build a global toast notification system supporting multiple types (success, error, info), auto-dismiss timers, manual dismiss, and queue management without re-rendering the app.',
    howItWorks:
      'Toasts are managed by a central state container (via Context or an external store like Zustand). Exposes toast.success(msg) or toast.error(msg). Each toast has a unique ID, message, type, and duration (e.g. 4000ms). When added, a setTimeout is scheduled to auto-dismiss it. Hovering over a toast can pause the timer. Toasts are rendered inside a fixed bottom-right container.',
    practicalExample: {
      title: 'Toast State Architecture',
      language: 'tsx',
      code: `type ToastType = 'success' | 'error' | 'info';
interface Toast { id: string; message: string; type: ToastType }

export function useToastManager() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}`,
    },
    interviewAnswer:
      'A toast system relies on a central queue decoupled from page components. Key challenges include ensuring timers clean up cleanly if dismissed manually, preventing UI stacking overflows by capping visible notifications (e.g. max 3 at once), and ensuring screen readers announce messages via role="alert" or aria-live="polite".',
    tradeoffsAndGotchas: [
      'If using Context, ensure components calling addToast do not re-render when other toasts are added or dismissed (split state and dispatch).',
    ],
    followUpQuestions: [
      'How would you implement timer pausing when the user hovers over a toast notification?',
    ],
  },

  // ==========================================
  // FRONTEND DSA & DATA MANIPULATION
  // ==========================================
  {
    id: 'fe-dsa-flatten-objects-arrays',
    title: 'DSA: Flatten Nested JSON & Arrays',
    subtitle: 'Recursion, iterative stack, dot-notation path keys',
    phase: 'phase-1-frontend',
    category: 'Frontend DSA',
    priority: 'P0',
    estimatedMins: 10,
    theGist:
      'Flattening deep objects into dot-notation paths and nested arrays into flat lists is a ubiquitous interview question testing recursion and object manipulation.',
    howItWorks:
      'For nested objects: recursively iterate over Object.keys(). If a value is a non-null object (and not an array, or including array indices), recurse with prefix + key + ".". Otherwise, assign directly to the accumulator object. For arrays: implement Array.prototype.flat() using recursion or an iterative stack to avoid call-stack overflow on deep structures.',
    practicalExample: {
      title: 'Recursive Dot-Notation Object Flattener',
      language: 'javascript',
      code: `function flattenObject(obj, prefix = '', res = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? \`\${prefix}.\${key}\` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, newKey, res);
    } else {
      res[newKey] = value;
    }
  }
  return res;
}

const input = {
  user: {
    name: 'Anmol',
    address: { city: 'Bengaluru', pin: 560001 }
  },
  role: 'SDE'
};
console.log(flattenObject(input));
// Output:
// { "user.name": "Anmol", "user.address.city": "Bengaluru", "user.address.pin": 560001, "role": "SDE" }`,
    },
    interviewAnswer:
      'To flatten a nested object into dot-notation keys, we walk entries recursively: if the value is an object (and not null), we append the current key to a path prefix and recurse; base cases assign primitive values directly to the result map. For array flattening, we can either use recursion with reduce/concat or an iterative stack with while(stack.length) to handle arbitrary recursion depths without exceeding call stack limits.',
    tradeoffsAndGotchas: [
      'Watch out for circular references: in production, use a WeakSet to detect visited object references and prevent infinite recursion.',
      'Distinguish null (typeof null === "object") and Arrays depending on requirements.',
    ],
    followUpQuestions: [
      'How would you write the inverse unflatten function that converts dot-notation keys back into a nested object?',
    ],
  },
  {
    id: 'fe-dsa-concurrency-limiter',
    title: 'DSA: Concurrency Limiter for API Requests',
    subtitle: 'Bounded parallelism, Promise pooling, queue processing',
    phase: 'phase-1-frontend',
    category: 'Frontend DSA',
    priority: 'P0',
    estimatedMins: 12,
    theGist:
      'Run N asynchronous tasks with a maximum limit of K running concurrently (e.g. upload 50 files, max 3 at a time).',
    howItWorks:
      'Create an array of task functions. Maintain an active counter and an index pointer. Launch initial K tasks. When any task finishes (whether fulfilled or rejected), decrement active counter, pick next task from queue, and run it. Repeat until all tasks complete. Returns a Promise resolving with results in original order.',
    practicalExample: {
      title: 'Promise Concurrency Pool Implementation',
      language: 'javascript',
      code: `async function asyncPool(limit, tasks) {
  const results = [];
  const executing = new Set();

  for (const [index, task] of tasks.entries()) {
    const p = Promise.resolve().then(() => task()).then(res => {
      results[index] = res;
    });
    executing.add(p);
    const clean = () => executing.delete(p);
    p.then(clean, clean);

    if (executing.size >= limit) {
      await Promise.race(executing); // Wait for ANY slot to free up
    }
  }
  await Promise.all(executing); // Wait for remaining tasks
  return results;
}`,
    },
    interviewAnswer:
      'A concurrency limiter processes a queue of asynchronous operations while capping active executions at K. Instead of launching all promises simultaneously (which exhausts network sockets and triggers HTTP 429 rate limits), we track active promises in a Set. When the set reaches capacity, we await Promise.race(executing) to pause until one finishes, delete it from the pool, and launch the next task.',
    tradeoffsAndGotchas: [
      'Preserving original result order: store results by original task index rather than completion order.',
      'Ensure errors do not halt the entire pool unless fail-fast behavior is explicitly desired.',
    ],
    followUpQuestions: [
      'How would you add automatic retry with exponential backoff for failed tasks in this pool?',
    ],
  },
];
