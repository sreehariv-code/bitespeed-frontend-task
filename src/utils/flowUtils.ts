import type { Node, Edge } from "@xyflow/react";

/**
 * Validates if all nodes in the flow are connected
 * @param nodes - Array of nodes in the flow
 * @param edges - Array of edges in the flow
 * @returns Object with validation result and details
 */
export const validateFlowConnections = (
  nodes: Node[],
  edges: Edge[]
): {
  isValid: boolean;
  disconnectedNodes: Node[];
  errors: string[];
} => {
  const disconnectedNodes: Node[] = [];
  const errors: string[] = [];

  // If there are no nodes, the flow is valid
  if (nodes.length === 0) {
    return { isValid: true, disconnectedNodes: [], errors: [] };
  }

  // If there are no edges, all nodes are disconnected
  if (edges.length === 0) {
    return {
      isValid: false,
      disconnectedNodes: nodes,
      errors: ["All nodes must be connected to form a valid flow"],
    };
  }

  // Create a set of all connected node IDs
  const connectedNodeIds = new Set<string>();

  // Add source and target nodes from edges
  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  // Check for disconnected nodes
  nodes.forEach((node) => {
    if (!connectedNodeIds.has(node.id)) {
      disconnectedNodes.push(node);
    }
  });

  // Check for orphaned edges (edges that reference non-existent nodes)
  const nodeIds = new Set(nodes.map((node) => node.id));
  const orphanedEdges = edges.filter(
    (edge) => !nodeIds.has(edge.source) || !nodeIds.has(edge.target)
  );

  if (orphanedEdges.length > 0) {
    errors.push("Some edges reference non-existent nodes");
  }

  if (disconnectedNodes.length > 0) {
    errors.push(
      `${disconnectedNodes.length} node(s) are not connected to the flow`
    );
  }

  return {
    isValid: disconnectedNodes.length === 0 && orphanedEdges.length === 0,
    disconnectedNodes,
    errors,
  };
};
