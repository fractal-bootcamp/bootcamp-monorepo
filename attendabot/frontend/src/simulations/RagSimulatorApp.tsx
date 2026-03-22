import RagDiagram from "./RagDiagram";
import "./simulations.css";

export default function RagSimulatorApp() {
  return (
    <>
      <h1 className="app-title">RAG Conversational Search</h1>
      <p className="app-subtitle">
        How a video-first social media app implements conversational search using
        Retrieval-Augmented Generation — from video upload through hybrid
        retrieval to grounded LLM responses.
      </p>
      <RagDiagram />
    </>
  );
}
