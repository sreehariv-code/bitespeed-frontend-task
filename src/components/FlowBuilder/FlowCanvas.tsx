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
import { memo, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import type { NodeProps } from "@xyflow/react";

// Wrapper component for StartNode with delete functionality
const StartNodeWithDelete = memo((props: NodeProps) => {
  return (
    <div className="relative group">
      <StartNode {...props} />
      <button
        onClick={(e) => {
          e.stopPropagation();
          // We'll need to access onDeleteNode from context or props
          // For now, we'll use a custom event
          const event = new CustomEvent("deleteNode", {
            detail: { nodeId: props.id },
          });
          window.dispatchEvent(event);
        }}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full 
                   flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity
                   shadow-md hover:shadow-lg cursor-pointer"
        title="Delete node"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
});

// Wrapper component for MessageNode with delete functionality
const MessageNodeWithDelete = memo((props: NodeProps) => {
  return (
    <div className="relative group">
      <MessageNode {...props} />
      <button
        onClick={(e) => {
          e.stopPropagation();
          // We'll need to access onDeleteNode from context or props
          // For now, we'll use a custom event
          const event = new CustomEvent("deleteNode", {
            detail: { nodeId: props.id },
          });
          window.dispatchEvent(event);
        }}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full 
                   flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity
                   shadow-md hover:shadow-lg cursor-pointer"
        title="Delete node"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
});

const nodeTypes: NodeTypes = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: MessageNodeWithDelete as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  start: StartNodeWithDelete as any,
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
  onDeleteNode: (nodeId: string) => void;
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
  onDeleteNode,
}: FlowCanvasProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  // Initialize theme state with a delay to ensure DOM is ready
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    // Check immediately
    checkTheme();

    // Also check after a short delay to ensure any delayed theme application is caught
    const timeoutId = setTimeout(checkTheme, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const isDark = document.documentElement.classList.contains("dark");
          setIsDarkMode(isDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Add event listener for delete node events
  useEffect(() => {
    const handleDeleteNode = (event: CustomEvent) => {
      const { nodeId } = event.detail;
      onDeleteNode(nodeId);
    };

    window.addEventListener("deleteNode", handleDeleteNode as EventListener);

    return () => {
      window.removeEventListener(
        "deleteNode",
        handleDeleteNode as EventListener
      );
    };
  }, [onDeleteNode]);

  // Don't render until we know the theme state
  if (isDarkMode === null) {
    return <div className="flex-1 h-full bg-gray-100 dark:bg-gray-800" />;
  }

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
        colorMode={isDarkMode ? "dark" : "light"}
        className="bg-gray-100 dark:bg-gray-800"
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
