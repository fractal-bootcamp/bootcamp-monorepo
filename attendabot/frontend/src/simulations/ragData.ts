import type { RagNode, RagEdge, RagStep } from "./ragTypes";

/** Box dimensions shared by all nodes. */
export const NODE_W = 150;
export const NODE_H = 44;

export const ragNodes: RagNode[] = [
  { id: "user-a",      label: "User A",              cx: 170, cy: 30,  color: "#3b82f6" },
  { id: "user-b",      label: "User B",              cx: 440, cy: 30,  color: "#6366f1" },
  { id: "mobile",      label: "Mobile App",           sublabel: "React Native",     cx: 310, cy: 100, color: "#a78bfa" },
  { id: "app-server",  label: "App Server",           sublabel: "EC2",              cx: 170, cy: 295, color: "#22c55e" },
  { id: "s3",          label: "S3",                    sublabel: "Object Storage",   cx: 540, cy: 170, color: "#f97316" },
  { id: "openai",      label: "OpenAI API",            sublabel: "Embeddings + Chat", cx: 810, cy: 340, color: "#10b981" },
  { id: "opensearch",  label: "OpenSearch",            sublabel: "Elasticsearch",    cx: 430, cy: 430, color: "#06b6d4" },
  { id: "mysql",       label: "MySQL",                 sublabel: "RDS",              cx: 80,  cy: 560, color: "#ec4899" },
  { id: "sqs",         label: "Message Queue",         sublabel: "SQS",              cx: 280, cy: 600, color: "#f43f5e" },
  { id: "workers",     label: "Background Workers",    sublabel: "Lambda / EC2",     cx: 600, cy: 520, color: "#84cc16" },
];

export const ragEdges: RagEdge[] = [
  { id: "user-a→mobile",          from: "user-a",      to: "mobile" },
  { id: "user-b→mobile",          from: "user-b",      to: "mobile" },
  { id: "mobile→app-server",      from: "mobile",      to: "app-server",   offset: -5 },
  { id: "app-server→mobile",      from: "app-server",  to: "mobile",       offset: 5 },
  { id: "app-server→s3",          from: "app-server",  to: "s3" },
  { id: "mobile→s3",              from: "mobile",      to: "s3" },
  { id: "app-server→mysql",       from: "app-server",  to: "mysql" },
  { id: "app-server→sqs",         from: "app-server",  to: "sqs" },
  { id: "sqs→workers",            from: "sqs",         to: "workers" },
  { id: "workers→mysql",          from: "workers",     to: "mysql" },
  { id: "workers→openai",         from: "workers",     to: "openai",       offset: -5 },
  { id: "openai→workers",         from: "openai",      to: "workers",      offset: 5 },
  { id: "workers→opensearch",     from: "workers",     to: "opensearch" },
  { id: "app-server→openai",      from: "app-server",  to: "openai" },
  { id: "app-server→opensearch",  from: "app-server",  to: "opensearch",   offset: -5 },
  { id: "opensearch→app-server",  from: "opensearch",  to: "app-server",   offset: 5 },
];

export const ragSteps: RagStep[] = [
  {
    num: "1",
    label: "Upload video + metadata",
    description:
      "A user records a video at a restaurant, nightclub, or other venue and uploads it through the mobile app. Along with the video file, they provide metadata: a text description, hashtags, the location (point of interest) where the video was filmed, and a 1–5 star rating.",
    edges: ["user-a→mobile"],
    nodes: ["user-a", "mobile"],
    color: "#3b82f6",
  },
  {
    num: "2",
    label: "POST /upload",
    description:
      "The mobile app sends the video metadata to the backend app server via POST /upload. The actual video file is NOT sent here — only the metadata (description, location, tags, rating). The server will orchestrate the video upload separately via presigned URLs.",
    edges: ["mobile→app-server"],
    nodes: ["mobile", "app-server"],
    color: "#3b82f6",
  },
  {
    num: "3",
    label: "Get presigned URLs",
    description:
      "The app server requests a presigned URL from S3. A presigned URL is a temporary, pre-authorized URL that allows the client to upload directly to S3 without needing AWS credentials. The server never touches the video bytes.",
    edges: ["app-server→s3"],
    nodes: ["app-server", "s3"],
    color: "#f97316",
  },
  {
    num: "4",
    label: "Return S3 URLs",
    description:
      "S3 returns the presigned URL to the app server, which forwards it to the mobile app. The presigned URL includes a temporary signature that grants upload permission to a specific S3 key with an expiration time (typically 15–60 minutes).",
    edges: ["app-server→mobile"],
    nodes: ["app-server", "mobile"],
    color: "#3b82f6",
  },
  {
    num: "5",
    label: "Upload video to S3",
    description:
      "The mobile app uploads the video file directly to S3 using the presigned URL, typically via multipart upload in chunks. The app server is completely out of this data path. S3 handles receiving bytes, checksumming, and storing the video durably across multiple availability zones.",
    edges: ["mobile→s3"],
    nodes: ["mobile", "s3"],
    color: "#f97316",
  },
  {
    num: "6",
    label: "POST /upload-done",
    description:
      "Once the video upload to S3 completes, the mobile app notifies the app server by calling POST /upload-done. This callback tells the server the video is in S3 and ready for processing.",
    edges: ["mobile→app-server"],
    nodes: ["mobile", "app-server"],
    color: "#3b82f6",
  },
  {
    num: "7",
    label: "Store metadata in MySQL",
    description:
      "The app server stores the video's metadata in MySQL — the relational source of truth. The schema includes tables for Videos (description, rating, S3 URL), Users, Locations, and Cities. MySQL enforces referential integrity via foreign keys.",
    edges: ["app-server→mysql"],
    nodes: ["app-server", "mysql"],
    color: "#ec4899",
  },
  {
    num: "8",
    label: "Enqueue indexing job",
    description:
      "After storing metadata in MySQL, the app server enqueues a message to SQS: \"index video 123.\" This decouples the user-facing upload response (which returns immediately) from the expensive indexing work.",
    edges: ["app-server→sqs"],
    nodes: ["app-server", "sqs"],
    color: "#f43f5e",
  },
  {
    num: "9",
    label: "Worker reads message",
    description:
      "A background worker polls SQS and reads the message. SQS provides at-least-once delivery — if the worker crashes before acknowledging, the message becomes visible again after a timeout and another worker picks it up.",
    edges: ["sqs→workers"],
    nodes: ["sqs", "workers"],
    color: "#84cc16",
  },
  {
    num: "10",
    label: "Fetch metadata from MySQL",
    description:
      "The worker fetches the full metadata for video 123 from MySQL. The SQS message only contained the video ID — the worker looks up the description, hashtags, location, rating, and POI name from the database.",
    edges: ["workers→mysql"],
    nodes: ["workers", "mysql"],
    color: "#ec4899",
  },
  {
    num: "11",
    label: "Generate embedding",
    description:
      "The worker concatenates the video's metadata into a single text document — POI name, category, location, rating, hashtags, and user description — and sends it to OpenAI's Embeddings API (text-embedding-3-small).",
    payload: "\"Joe's Pizza | Pizza Restaurant\n | Brooklyn, NY | ★★★★★\n | #pizza #bestslice\n | Best dollar slice in Brooklyn\"",
    edges: ["workers→openai"],
    nodes: ["workers", "openai"],
    color: "#10b981",
  },
  {
    num: "12",
    label: "Return embedding vector",
    description:
      "The Embeddings API returns a 1,536-dimensional vector that captures the semantic meaning of the video's content. 'Amazing dollar slice in Brooklyn' and 'best New York pizza' end up as nearby points in vector space, even though they share almost no exact words.",
    payload: "[0.012, -0.033, 0.071, ..., -0.018]\n→ 1,536 dimensions\n→ text-embedding-3-small",
    edges: ["openai→workers"],
    nodes: ["openai", "workers"],
    color: "#10b981",
  },
  {
    num: "13",
    label: "Index in OpenSearch",
    description:
      "The worker writes the video document to OpenSearch with both structured fields — video_id, description, city, rating, tags — and the embedding vector in a dense_vector field. Having both enables hybrid search.",
    payload: "PUT /videos/_doc/123\n{\n  \"city\": \"Brooklyn\",\n  \"rating\": 5,\n  \"tags\": [\"pizza\",\"bestslice\"],\n  \"embedding\": [0.012, ...]\n}",
    edges: ["workers→opensearch"],
    nodes: ["workers", "opensearch"],
    color: "#06b6d4",
  },
  {
    num: "14",
    label: "Search query",
    description:
      "A different user wants to search. User B types a conversational query: \"top 5 pizza places in Brooklyn.\" This natural language string needs to be transformed into a structured search.",
    edges: ["user-b→mobile"],
    nodes: ["user-b", "mobile"],
    color: "#6366f1",
  },
  {
    num: "15",
    label: "POST /api/v2/search",
    description:
      "The mobile app sends the search query to the app server via POST /api/v2/search. The \"v2\" endpoint indicates this is the RAG-powered conversational search, distinct from an older keyword-only search.",
    edges: ["mobile→app-server"],
    nodes: ["mobile", "app-server"],
    color: "#6366f1",
  },
  {
    num: "16a–b",
    label: "Query understanding (parallel)",
    description:
      "Two calls go to OpenAI in parallel: (16a) Chat API with Structured Outputs extracts filters — category=\"Pizza\", city=\"Brooklyn\", limit=5. (16b) Embeddings API vectorizes the query using the same model that embedded the video metadata. These are independent and run concurrently.",
    payload: "// 16a: Structured Outputs\n{\"category\":\"Pizza\",\n \"city\":\"Brooklyn\",\n \"limit\":5}\n\n// 16b: Embed query\n\"top 5 pizza places...\" → [0.008, ...]",
    edges: ["app-server→openai"],
    nodes: ["app-server", "openai"],
    color: "#8b5cf6",
  },
  {
    num: "17",
    label: "Hybrid retrieval (RRF)",
    description:
      "The app server sends a single request to OpenSearch combining three strategies via Reciprocal Rank Fusion (RRF): (1) knn vector search, (2) BM25 full-text search, (3) structured pre-filters. Field collapsing on poi_id ensures each result is a different place.",
    edges: ["app-server→opensearch"],
    nodes: ["app-server", "opensearch"],
    color: "#06b6d4",
  },
  {
    num: "18",
    label: "Return ranked results",
    description:
      "OpenSearch returns the ranked results. Each result contains the video's structured metadata (POI name, description, rating, city, tags) and a relevance score from the RRF merge, already collapsed by POI.",
    edges: ["opensearch→app-server"],
    nodes: ["opensearch", "app-server"],
    color: "#06b6d4",
  },
  {
    num: "19",
    label: "Grounded generation",
    description:
      "The app server passes the top search results as context to OpenAI's Chat Completions API with a system prompt defining personality, guardrails, and citation format. The LLM generates a conversational answer grounded in the retrieved data — this is the \"Generation\" in RAG.",
    edges: ["app-server→openai"],
    nodes: ["app-server", "openai"],
    color: "#10b981",
  },
  {
    num: "20",
    label: "Return conversational results",
    description:
      "The app server returns the LLM-generated conversational response to the mobile app. The response includes natural language recommendations grounded in real video data: POI names, ratings, descriptions from actual user videos, and links to source videos. This completes the RAG pipeline.",
    edges: ["app-server→mobile"],
    nodes: ["app-server", "mobile"],
    color: "#6366f1",
  },
];
