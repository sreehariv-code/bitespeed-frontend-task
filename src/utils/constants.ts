import type { Node } from "@xyflow/react";

export const NODE_TYPES = {
  MESSAGE: "message",
  START: "start",
} as const;

export const INITIAL_NODES: Node[] = [
  {
    id: "start-1",
    type: "start",
    position: { x: 250, y: 25 },
    data: { id: "start-1", label: "Start" },
  },
];

export const SIDEBAR_WIDTH = 280;
