import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
  type NodeTypes,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { MessageNode, StartNode } from "../Nodes";

const nodeTypes: NodeTypes = {
  message: MessageNode,
  start: StartNode,
};

interface FlowCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  onPaneClick: () => void;
  onDrop: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
  disconnectedNodeIds?: string[];
}

export const FlowCanvas = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onPaneClick,
  onDrop,
  onDragOver,
  disconnectedNodeIds = [],
}: FlowCanvasProps) => {
  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-100"
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            // Highlight disconnected nodes in red
            if (disconnectedNodeIds.includes(node.id)) {
              return "#ef4444"; // red-500
            }

            switch (node.type) {
              case "start":
                return "#10b981";
              case "message":
                return "#3b82f6";
              default:
                return "#6b7280";
            }
          }}
        />
      </ReactFlow>
    </div>
  );
};
