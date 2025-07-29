import {
  addEdge,
  type Connection,
  type Node,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import type { FlowNode } from "../types/flow";
import { INITIAL_NODES } from "../utils/constants";
import { validateFlowConnections } from "../utils/flowUtils";

export const useFlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    INITIAL_NODES as Node[]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = useCallback(
    (type: string, position: { x: number; y: number }) => {
      const id = `${type}-${Date.now()}`;
      const newNode: Node = {
        id,
        type,
        position,
        data: {
          id,
          label: type === "message" ? "Message" : "Start",
          message: type === "message" ? "Enter your message here..." : "",
        },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  const updateNodeData = useCallback(
    (nodeId: string, data: any) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...data } }
            : node
        )
      );
    },
    [setNodes]
  );

  const validateFlow = useCallback(() => {
    return validateFlowConnections(nodes, edges);
  }, [nodes, edges]);

  const saveFlow = useCallback(() => {
    const validation = validateFlowConnections(nodes, edges);

    if (!validation.isValid) {
      const errorMessage = validation.errors.join("\n");
      alert(`Cannot save flow: ${errorMessage}`);
      return;
    }

    const flowData = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };

    // For MVP, just log to console. Later you can implement actual save logic
    console.log("Saving flow:", flowData);
    localStorage.setItem("chatbot-flow", JSON.stringify(flowData));
    alert("Flow saved successfully!");
  }, [nodes, edges]);

  return {
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
  };
};
