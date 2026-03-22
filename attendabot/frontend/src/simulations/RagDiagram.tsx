import { useState, useEffect, useCallback, useMemo } from "react";
import { ragNodes, ragEdges, ragSteps, NODE_W, NODE_H } from "./ragData";
import ragPng from "./video-upload-and-RAG-conversational-search.png";
import FullDiagramImage from "./FullDiagramImage";
import "./simulations.css";

const HW = NODE_W / 2; // half-width: 75
const HH = NODE_H / 2; // half-height: 22
const STEP_DELAY = 2400;

/**
 * Returns the point on the box boundary (centered at fromCx, fromCy, size NODE_W x NODE_H)
 * in the direction of (toCx, toCy).
 */
function boxEdgePoint(
  fromCx: number,
  fromCy: number,
  toCx: number,
  toCy: number,
): [number, number] {
  const dx = toCx - fromCx;
  const dy = toCy - fromCy;
  if (dx === 0 && dy === 0) return [fromCx, fromCy];
  const tx = dx !== 0 ? HW / Math.abs(dx) : Infinity;
  const ty = dy !== 0 ? HH / Math.abs(dy) : Infinity;
  const t = Math.min(tx, ty);
  return [fromCx + dx * t, fromCy + dy * t];
}

export default function RagDiagram() {
  const [activeStep, setActiveStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [showFullDiagram, setShowFullDiagram] = useState(false);

  // Auto-play timer
  useEffect(() => {
    if (!playing) return;
    if (activeStep >= ragSteps.length - 1) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setActiveStep((s) => s + 1), STEP_DELAY);
    return () => clearTimeout(t);
  }, [playing, activeStep]);

  const play = useCallback(() => {
    if (activeStep >= ragSteps.length - 1) setActiveStep(-1);
    setTimeout(() => {
      setActiveStep((s) => (s < 0 ? 0 : s));
      setPlaying(true);
    }, 50);
  }, [activeStep]);

  const next = useCallback(() => {
    setPlaying(false);
    setActiveStep((s) => Math.min(s + 1, ragSteps.length - 1));
  }, []);

  const prev = useCallback(() => {
    setPlaying(false);
    setActiveStep((s) => Math.max(s - 1, -1));
  }, []);

  const reset = useCallback(() => {
    setPlaying(false);
    setActiveStep(-1);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "r") {
        reset();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, reset]);

  const nodeMap = useMemo(() => {
    const map: Record<string, (typeof ragNodes)[0]> = {};
    for (const n of ragNodes) map[n.id] = n;
    return map;
  }, []);

  const currentStep = activeStep >= 0 ? ragSteps[activeStep] : null;
  const activeEdgeIds = useMemo(() => new Set(currentStep?.edges ?? []), [currentStep]);
  const activeNodeIds = useMemo(() => new Set(currentStep?.nodes ?? []), [currentStep]);
  const stepColor = currentStep?.color ?? "#6366f1";

  // Build a map of edge -> last step color it was activated in (for "past" dim state)
  const pastEdgeColors = useMemo(() => {
    const info: Record<string, string> = {};
    for (let i = 0; i < activeStep; i++) {
      for (const eid of ragSteps[i].edges) {
        info[eid] = ragSteps[i].color;
      }
    }
    return info;
  }, [activeStep]);

  return (
    <div className="flow-diagram">
      <div className="flow-layout">
        {/* -- Sidebar: controls + description -- */}
        <div className="flow-sidebar">
          <div className="controls">
            <button onClick={reset} className="ctrl-btn" title="Reset (R)">
              Reset
            </button>
            <button
              onClick={prev}
              className="ctrl-btn"
              disabled={activeStep < 0}
              title="Previous (←)"
            >
              ◀
            </button>
            {playing ? (
              <button onClick={() => setPlaying(false)} className="ctrl-btn ctrl-primary">
                Pause
              </button>
            ) : (
              <button onClick={play} className="ctrl-btn ctrl-primary" title="Play (Space)">
                Play ▶
              </button>
            )}
            <button
              onClick={next}
              className="ctrl-btn"
              disabled={activeStep >= ragSteps.length - 1}
              title="Next (→)"
            >
              ▶
            </button>
            <button
              onClick={() => setShowFullDiagram((v) => !v)}
              className={`ctrl-btn${showFullDiagram ? " ctrl-primary" : ""}`}
            >
              Full Diagram
            </button>
            <span className="step-counter">
              {activeStep >= 0
                ? `${activeStep + 1} / ${ragSteps.length}`
                : `${ragSteps.length} steps`}
            </span>
          </div>

          <div className="desc-panel visible">
            {currentStep ? (
              <>
                <div style={{ marginBottom: "var(--space-2)" }}>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "var(--text-lg)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: stepColor,
                    }}
                  >
                    Step {currentStep.num}:
                  </span>{" "}
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "var(--text-lg)",
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {currentStep.label}
                  </span>
                </div>
                <p className="desc-text">{currentStep.description}</p>
                {currentStep.payload && (
                  <pre className="desc-payload">{currentStep.payload}</pre>
                )}
              </>
            ) : (
              <div className="flow-header">
                <h2>RAG Conversational Search</h2>
                <p className="flow-subtitle">
                  Step through the complete 20-step pipeline: from video upload and
                  metadata indexing to hybrid retrieval and grounded LLM responses.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* -- Main: SVG architecture diagram or full PNG -- */}
        <div className="flow-main">
          {showFullDiagram ? (
            <FullDiagramImage src={ragPng} alt="RAG conversational search full architecture diagram" />
          ) : null}
          <svg
            viewBox="0 0 900 650"
            style={{ width: "100%", display: showFullDiagram ? "none" : "block" }}
            aria-label="RAG conversational search architecture diagram"
          >
            <defs>
              {/* Arrowhead that inherits the line's stroke color (SVG 2 context-stroke) */}
              <marker
                id="rag-arrow"
                viewBox="0 0 10 7"
                refX="9"
                refY="3.5"
                markerWidth="6"
                markerHeight="5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="context-stroke" />
              </marker>
            </defs>

            {/* -- AWS region box (behind everything) -- */}
            <rect
              x={1}
              y={140}
              width={684}
              height={498}
              fill="none"
              stroke="#94a3b8"
              strokeWidth={1.5}
              strokeDasharray="8 5"
              rx={6}
            />
            <text
              x={12}
              y={158}
              fontSize="10"
              fontWeight="700"
              fill="#94a3b8"
              fontFamily="inherit"
              style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              AWS
            </text>

            {/* -- Edges (rendered before nodes so nodes draw on top) -- */}
            {ragEdges.map((edge) => {
              const fromNode = nodeMap[edge.from];
              const toNode = nodeMap[edge.to];
              if (!fromNode || !toNode) return null;

              let [x1, y1] = boxEdgePoint(fromNode.cx, fromNode.cy, toNode.cx, toNode.cy);
              let [x2, y2] = boxEdgePoint(toNode.cx, toNode.cy, fromNode.cx, fromNode.cy);

              // Apply perpendicular offset for bidirectional/parallel edges
              if (edge.offset) {
                const dx = x2 - x1;
                const dy = y2 - y1;
                const len = Math.sqrt(dx * dx + dy * dy);
                if (len > 0) {
                  const px = -dy / len * edge.offset;
                  const py = dx / len * edge.offset;
                  x1 += px; y1 += py;
                  x2 += px; y2 += py;
                }
              }

              const isActive = activeEdgeIds.has(edge.id);
              const pastColor = pastEdgeColors[edge.id];

              let stroke: string;
              let strokeWidth: number;
              let opacity: number;

              if (isActive) {
                stroke = stepColor;
                strokeWidth = 2.5;
                opacity = 1;
              } else if (pastColor) {
                stroke = pastColor;
                strokeWidth = 1.5;
                opacity = 0.3;
              } else {
                stroke = "#cbd5e1";
                strokeWidth = 1.5;
                opacity = 1;
              }

              return (
                <line
                  key={edge.id}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  opacity={opacity}
                  markerEnd="url(#rag-arrow)"
                />
              );
            })}

            {/* -- Nodes -- */}
            {ragNodes.map((node) => {
              const isActive = activeNodeIds.has(node.id);
              const fill = isActive ? node.color + "1a" : "#f8fafc";
              const strokeColor = isActive ? node.color : "#334155";
              const sw = isActive ? 2.5 : 1.5;

              return (
                <g key={node.id}>
                  <rect
                    x={node.cx - HW}
                    y={node.cy - HH}
                    width={NODE_W}
                    height={NODE_H}
                    fill={fill}
                    stroke={strokeColor}
                    strokeWidth={sw}
                    rx={3}
                  />
                  <text
                    x={node.cx}
                    y={node.cy - (node.sublabel ? 5 : 0)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill={isActive ? node.color : "#1e293b"}
                    fontFamily="inherit"
                    style={{ textTransform: "uppercase", letterSpacing: "0.04em" }}
                  >
                    {node.label}
                  </text>
                  {node.sublabel && (
                    <text
                      x={node.cx}
                      y={node.cy + 11}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="9"
                      fill={isActive ? node.color : "#64748b"}
                      fontFamily="inherit"
                    >
                      {node.sublabel}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
