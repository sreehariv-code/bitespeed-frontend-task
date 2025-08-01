import { useCallback, useRef, useMemo } from "react";
import {
  ReactFlowProvider,
  type Node,
  type OnEdgesChange,
  useReactFlow,
} from "@xyflow/react";
import { FlowCanvas } from "./FlowCanvas";
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";
import { useFlowBuilder } from "../../hooks/useFlowBuilder";
import { type FlowNode } from "../../types/flow";

// Separate component to use useReactFlow hook
const FlowBuilderContent = () => {
  const {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    deleteNode,
    updateNodeData,
    validateFlow,
    saveFlow,
  } = useFlowBuilder();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onDragStart = useCallback(
    (event: React.DragEvent, nodeType: string) => {
      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      // Use React Flow's built-in method to convert screen coordinates to flow coordinates
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(type, position);
    },
    [addNode, screenToFlowPosition]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.stopPropagation();
      setSelectedNode(node as FlowNode);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  // Get validation status using useMemo to avoid unnecessary recalculations
  const validation = useMemo(() => validateFlow(), [validateFlow]);

  // Extract disconnected node IDs for visual feedback
  const disconnectedNodeIds = useMemo(
    () => validation.disconnectedNodes.map((node) => node.id),
    [validation.disconnectedNodes]
  );

  return (
    <div className="h-screen flex flex-col">
      <Header
        onSave={saveFlow}
        isValid={validation.isValid}
        validationMessage={validation.errors[0]}
      />

      <div className="flex-1 flex">
        <div ref={reactFlowWrapper} className="flex-1">
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange as OnEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            disconnectedNodeIds={disconnectedNodeIds}
            onDeleteNode={deleteNode}
          />
        </div>

        <Sidebar
          selectedNode={selectedNode}
          onUpdateNode={updateNodeData}
          onNodeSelect={setSelectedNode}
          onDragStart={onDragStart}
          nodes={nodes as FlowNode[]}
        />
      </div>
    </div>
  );
};

export const FlowBuilder = () => {
  return (
    <ReactFlowProvider>
      <FlowBuilderContent />
    </ReactFlowProvider>
  );
};
