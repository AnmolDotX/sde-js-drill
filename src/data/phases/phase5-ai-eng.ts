import { TopicItem } from '../types';

export const phase5Topics: TopicItem[] = [
  // ==========================================
  // AI AGENTS & AGENTIC ARCHITECTURES
  // ==========================================
  {
    id: 'ai-react-agent-loop',
    title: 'Agentic Workflows: The ReAct Pattern & Tool Calling',
    subtitle: 'Reasoning + Acting loop, tool selection, observation feedback, termination guards',
    phase: 'phase-5-ai-eng',
    category: 'Agentic AI',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'The ReAct (Reasoning + Acting) loop allows LLMs to solve multi-step problems by alternating between generating thought reasoning, invoking external tools (APIs, databases, code execution), and observing results until a termination condition is met.',
    howItWorks:
      '1. Prompt Structure: The model receives the user goal alongside a list of available tool definitions (names, descriptions, and JSON Schema parameters). 2. Step 1 (Thought): The LLM reasons about what step to take next. 3. Step 2 (Action): The LLM outputs a structured tool invocation (e.g., getOrderStatus({ orderId: "123" })). 4. Execution: The application runtime intercepts the tool call, executes the real backend function, and formats the output as an Observation message. 5. Step 3 (Observation): The result is appended to the message history. 6. Repeat: The LLM analyzes the observation and either invokes another tool or delivers the Final Answer. Max iteration limits (e.g., max 10 steps) guard against infinite loops.',
    practicalExample: {
      title: 'ReAct Agent Runtime Loop',
      language: 'typescript',
      code: `async function runAgent(goal: string, tools: Record<string, Function>, maxSteps = 8) {
  const messages: any[] = [
    { role: 'system', content: 'You are an autonomous agent. Reason step-by-step and call tools.' },
    { role: 'user', content: goal }
  ];

  for (let step = 0; step < maxSteps; step++) {
    const response = await llm.chat({ messages, tools: Object.values(tools).map(t => t.schema) });
    
    // Check if the agent called a tool or arrived at final answer
    if (!response.tool_calls || response.tool_calls.length === 0) {
      return response.content; // Final Answer reached!
    }

    // Execute tool calls
    for (const toolCall of response.tool_calls) {
      const handler = tools[toolCall.function.name];
      const args = JSON.parse(toolCall.function.arguments);
      const observation = await handler(args);

      messages.push(response); // Assistant tool request
      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(observation)
      });
    }
  }
  throw new Error('Agent reached maximum step limit without concluding.');
}`,
    },
    interviewAnswer:
      'The ReAct (Reasoning + Acting) pattern enables autonomous agent behavior. Rather than generating a single answer with hallucinated data, the LLM emits thoughts, outputs structured tool calls with JSON schema arguments, receives real-world execution observations, and refines its next step. Key engineering challenges include preventing infinite hallucination loops using step limits, managing context window growth across long trajectories, and implementing defensive error handling when tool executions fail.',
    tradeoffsAndGotchas: [
      'Cost and Latency: Every tool invocation requires a full LLM inference round-trip; multi-step agents can easily take 10–30 seconds and consume thousands of tokens.',
      'Deterministic fallback: Never allow an agent to execute irreversible actions (e.g. deleting an account or issuing a refund) without a human-in-the-loop confirmation checkpoint.',
    ],
    followUpQuestions: [
      'How does Plan-and-Solve (decomposing goals into explicit subtasks before execution) compare to dynamic ReAct loops?',
      'How do you handle tool execution failures gracefully without the model giving up?',
    ],
  },
  {
    id: 'ai-rag-pipeline-architecture',
    title: 'Advanced RAG: Chunking, Vector Databases & Hybrid Search',
    subtitle: 'Recursive chunking, Dense embeddings vs BM25 keyword search, Cross-Encoder reranking',
    phase: 'phase-5-ai-eng',
    category: 'RAG Architecture',
    priority: 'P0',
    estimatedMins: 15,
    theGist:
      'Retrieval-Augmented Generation (RAG) grounds LLM responses on proprietary knowledge. Production RAG uses hybrid search (Dense vector + BM25 keyword) followed by cross-encoder reranking to ensure high precision.',
    howItWorks:
      '1. Ingestion: Documents are split into semantic chunks (e.g., 500 tokens with 50-token overlap) using recursive character splitters. Chunks are converted to vector embeddings (OpenAI text-embedding-3 or Cohere) and stored in a vector DB (Pinecone, Qdrant, pgvector). 2. Retrieval: User query is converted to embedding. We perform Hybrid Search: Dense Vector Search (semantic similarity using cosine distance) + Sparse Keyword Search (BM25 for exact product names, IDs, part numbers). Reciprocal Rank Fusion (RRF) merges results. 3. Reranking: A cross-encoder model (e.g., Cohere Rerank) scores top 25 chunks down to top 5 most relevant. 4. Synthesis: Top chunks are injected into LLM system prompt as verified context.',
    practicalExample: {
      title: 'Production RAG Ingestion & Query Pipeline',
      language: 'typescript',
      code: `// Hybrid Retrieval + Rerank Pipeline
async function retrieveContext(query: string, limit = 5) {
  // 1. Parallel dense vector and sparse keyword search
  const [vectorHits, keywordHits] = await Promise.all([
    vectorDb.similaritySearch(query, { k: 25 }),
    bm25Index.search(query, { k: 25 })
  ]);

  // 2. Reciprocal Rank Fusion (RRF)
  const candidateChunks = reciprocalRankFusion([vectorHits, keywordHits]);

  // 3. High-precision Cross-Encoder Reranker
  const reranked = await cohere.rerank({
    query,
    documents: candidateChunks.map(c => c.text),
    topN: limit
  });

  return reranked.results.map(r => candidateChunks[r.index].text);
}`,
    },
    interviewAnswer:
      'Naive RAG relies purely on vector cosine similarity, which frequently fails on exact keyword lookups like SKU numbers, error codes, or domain jargon. In production, we build Hybrid RAG: combining dense vector embeddings (capturing conceptual meaning) with sparse BM25 keyword search (capturing exact token matches) via Reciprocal Rank Fusion. We then pass top candidates through a cross-encoder reranker before feeding them to the generation LLM. This drastically reduces hallucinations and guarantees that only high-relevance chunks occupy the context window.',
    diagramType: 'architecture',
    diagramCode: `graph TD
    UserQuery[User Query] --> Embeddings[Query Embedding]
    UserQuery --> BM25Query[BM25 Tokenizer]
    Embeddings --> VectorDB[Vector DB Dense Search]
    BM25Query --> SparseIndex[BM25 Sparse Search]
    VectorDB --> RRF[Reciprocal Rank Fusion]
    SparseIndex --> RRF
    RRF --> Reranker[Cross-Encoder Reranker]
    Reranker --> TopK[Top 5 Precision Chunks]
    TopK --> LLM[LLM Generator with Context]
    LLM --> Answer[Synthesized Accurate Answer]`,
    tradeoffsAndGotchas: [
      'Chunk size trade-off: Small chunks (200 tokens) yield accurate vector matches but lack surrounding context; large chunks (1000 tokens) dilute embedding representations. Chunk overlap (10–20%) prevents sentence truncation.',
      'Vector databases (Pinecone, pgvector) perform approximate nearest neighbor (ANN) search (HNSW or IVFFlat) to achieve sub-50ms search on millions of vectors.',
    ],
    followUpQuestions: [
      'When would you choose pgvector on existing PostgreSQL vs a dedicated vector database like Pinecone or Qdrant?',
      'How does Self-RAG or Corrective RAG (CRAG) evaluate whether retrieved documents are actually relevant before answering?',
    ],
  },
  {
    id: 'ai-langgraph-multi-agent',
    title: 'LangGraph & Stateful Multi-Agent Orchestration',
    subtitle: 'State graphs, nodes, conditional edges, checkpoints & human-in-the-loop approvals',
    phase: 'phase-5-ai-eng',
    category: 'LangGraph & Multi-Agent',
    priority: 'P0',
    estimatedMins: 14,
    theGist:
      'LangGraph models complex LLM applications as cyclic state graphs. Unlike linear chains (LangChain), LangGraph enables branching, loops, multi-agent collaboration, memory checkpointing, and human approvals.',
    howItWorks:
      '1. Shared State: A typed state object passed between nodes (e.g. { messages: [], reviewStatus: string, attempts: number }). 2. Nodes: Functions or agent steps that take state, execute logic (call LLM, query DB), and return state updates. 3. Edges: Control flow links between nodes; Conditional Edges evaluate state to determine the next node (e.g., if code evaluation fails, route back to coding agent; else route to reviewer). 4. Checkpointers: Persist state after each step (to Postgres/Redis), allowing time-travel debugging, resuming interrupted sessions, and pausing execution for human approval before proceeding.',
    practicalExample: {
      title: 'Stateful LangGraph Agent with Review Loop',
      language: 'typescript',
      code: `import { StateGraph, END } from '@langchain/langgraph';

interface AgentState {
  task: string;
  draft: string;
  feedback: string;
  isApproved: boolean;
  iteration: number;
}

const workflow = new StateGraph<AgentState>({
  channels: {
    task: null, draft: null, feedback: null, isApproved: null, iteration: null
  }
})
  .addNode('writer', async (state) => {
    const draft = await generateDraft(state.task, state.feedback);
    return { draft, iteration: state.iteration + 1 };
  })
  .addNode('reviewer', async (state) => {
    const review = await evaluateDraft(state.draft);
    return { isApproved: review.passed, feedback: review.notes };
  })
  .addEdge('writer', 'reviewer')
  .addConditionalEdges('reviewer', (state) => {
    if (state.isApproved || state.iteration >= 3) return END;
    return 'writer'; // Loop back to refine!
  });`,
    },
    interviewAnswer:
      'While standard LangChain or linear prompt chains work for simple tasks, production agentic systems require cycles, conditional branching, and persistent memory. LangGraph models multi-agent systems as directed graphs with explicit state schemas. Nodes perform actions, conditional edges route transitions based on state evaluations, and built-in checkpointers persist state at every step. This makes it trivial to implement human-in-the-loop workflows (pausing the graph until a human approves an action) and resilient retries without losing conversation context.',
    tradeoffsAndGotchas: [
      'LangChain abstraction bloat: Deep LangChain abstractions can obscure simple prompt formatting and make token debugging frustrating; LangGraph is much closer to a pure state machine library.',
      'Checkpointers are crucial in production: without checkpoint persistence, server crashes during a long agent workflow lose the entire trajectory.',
    ],
    followUpQuestions: [
      'How does LangGraph implement Human-in-the-Loop interruptions via interrupt() and resume()?',
      'How do multi-agent supervisor architectures coordinate specialized worker agents (e.g. SQL agent + Web search agent)?',
    ],
  },
  {
    id: 'ai-latency-token-optimization',
    title: 'LLM Latency, Cost Optimization & Prompt Caching',
    subtitle: 'TTFT vs TPS, Anthropic/OpenAI prompt caching, streaming, structured output guarantees',
    phase: 'phase-5-ai-eng',
    category: 'LLM Systems & Production',
    priority: 'P1',
    estimatedMins: 12,
    theGist:
      'In production AI systems, user perception depends on Time to First Token (TTFT). Prompt caching slashes both latency and costs by up to 80% for repetitive system prompts and large document contexts.',
    howItWorks:
      '1. TTFT (Time to First Token): Time taken to process the input prompt (prefill phase). Optimized via prompt caching and streaming responses immediately via SSE. 2. TPS (Tokens Per Second): Generation speed (decode phase), bounded by memory bandwidth. 3. Prompt Caching: Providers cache exact prefix prompt blocks in GPU KV-cache. Subsequent requests sharing the identical prefix bypass prefill computation, reducing prompt cost by up to 90% and latency by up to 80%. 4. Structured Output: Using constrained decoding (JSON schema enforcement at the tokenizer level) guarantees 100% valid JSON without markdown parsing errors.',
    practicalExample: {
      title: 'Prompt Caching & Streaming Implementation',
      language: 'typescript',
      code: `// Prompt Caching pattern: Keep static system instructions and documentation
// at the start of the prompt so the KV-cache can be reused across all requests!
const systemPromptPrefix = \`[STATIC SYSTEM KNOWLEDGE BASE - 50,000 TOKENS]\`; // Cached!

async function streamLLMResponse(userQuery: string, res: Response) {
  res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    messages: [
      { role: 'system', content: systemPromptPrefix },
      { role: 'user', content: userQuery }
    ]
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) res.write(\`data: \${JSON.stringify({ content })}\\n\\n\`);
  }
  res.end();
}`,
    },
    interviewAnswer:
      'In production AI engineering, response streaming via Server-Sent Events is mandatory to keep Time to First Token (TTFT) under 500ms so users never stare at a blank loader. For cost and latency optimization, we structure prompts to place large static contexts (documentation, schemas, agent system rules) at the beginning of the prompt to maximize KV-cache hits via prompt caching, dropping prompt costs by up to 90%. Finally, for reliable integration with microservices, we enforce OpenAI/Anthropic Structured Outputs using strict JSON schema validation.',
    tradeoffsAndGotchas: [
      'Prompt caching invalidation: Inserting dynamic timestamps or user IDs at the start of the system prompt busts the cache prefix for all subsequent tokens. Always place dynamic variables at the very end.',
    ],
    followUpQuestions: [
      'What is speculative decoding and how does it speed up LLM token generation?',
    ],
  },
];
