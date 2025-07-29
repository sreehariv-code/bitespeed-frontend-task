import { useCallback, useRef, useMemo } from "react";
import {
  ReactFlowProvider,
  type Node,
  type OnEdgesChange,
} from "@xyflow/react";
import { FlowCanvas } from "./FlowCanvas";
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";
import { useFlowBuilder } from "../../hooks/useFlowBuilder";
import { type FlowNode } from "../../types/flow";

export const FlowBuilder = () => {
  const {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodeData,
    validateFlow,
    saveFlow,
  } = useFlowBuilder();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

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

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left - 100,
        y: event.clientY - reactFlowBounds.top - 50,
      };

      addNode(type, position);
    },
    [addNode]
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
        <ReactFlowProvider>
          <Sidebar
            selectedNode={selectedNode}
            onUpdateNode={updateNodeData}
            onNodeSelect={setSelectedNode}
            onDragStart={onDragStart}
          />

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
            />
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};
