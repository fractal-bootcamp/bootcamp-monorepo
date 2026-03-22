export interface RagNode {
  id: string;
  label: string;
  sublabel?: string;
  cx: number; // SVG center x
  cy: number; // SVG center y
  color: string;
}

export interface RagEdge {
  id: string;
  from: string;
  to: string;
  offset?: number; // perpendicular pixel offset for parallel/bidirectional edges
}

export interface RagStep {
  num: string;
  label: string;
  description: string;
  payload?: string;
  edges: string[];
  nodes: string[];
  color: string;
}
