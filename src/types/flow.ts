export type MessageNodeData = {
  id: string;
  label: string;
  message: string;
};

export interface StartNodeData {
  id: string;
  label: string;
}

export type NodeData = MessageNodeData | StartNodeData;

export interface FlowNode {
  id: string;
  type: "message" | "start";
  position: { x: number; y: number };
  data: NodeData;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export interface FlowBuilderState {
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNode: FlowNode | null;
}
