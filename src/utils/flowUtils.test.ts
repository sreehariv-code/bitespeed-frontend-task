import { validateFlowConnections } from "./flowUtils";
import type { Node, Edge } from "@xyflow/react";

// Mock nodes and edges for testing
const createMockNode = (id: string, type: string = "message"): Node => ({
  id,
  type,
  position: { x: 0, y: 0 },
  data: { id, label: "Test", message: "Test message" },
});

const createMockEdge = (source: string, target: string): Edge => ({
  id: `${source}-${target}`,
  source,
  target,
  type: "default",
});

describe("validateFlowConnections", () => {
  test("should return valid for empty flow", () => {
    const result = validateFlowConnections([], []);
    expect(result.isValid).toBe(true);
    expect(result.disconnectedNodes).toEqual([]);
    expect(result.errors).toEqual([]);
  });

  test("should return invalid when nodes exist but no edges", () => {
    const nodes = [createMockNode("node1"), createMockNode("node2")];
    const edges: Edge[] = [];

    const result = validateFlowConnections(nodes, edges);
    expect(result.isValid).toBe(false);
    expect(result.disconnectedNodes).toHaveLength(2);
    expect(result.errors).toContain(
      "All nodes must be connected to form a valid flow"
    );
  });

  test("should return valid when all nodes are connected", () => {
    const nodes = [createMockNode("node1"), createMockNode("node2")];
    const edges = [createMockEdge("node1", "node2")];

    const result = validateFlowConnections(nodes, edges);
    expect(result.isValid).toBe(true);
    expect(result.disconnectedNodes).toEqual([]);
    expect(result.errors).toEqual([]);
  });

  test("should return invalid when some nodes are disconnected", () => {
    const nodes = [
      createMockNode("node1"),
      createMockNode("node2"),
      createMockNode("node3"),
    ];
    const edges = [createMockEdge("node1", "node2")]; // node3 is disconnected

    const result = validateFlowConnections(nodes, edges);
    expect(result.isValid).toBe(false);
    expect(result.disconnectedNodes).toHaveLength(1);
    expect(result.disconnectedNodes[0].id).toBe("node3");
    expect(result.errors).toContain("1 node(s) are not connected to the flow");
  });

  test("should detect orphaned edges", () => {
    const nodes = [createMockNode("node1")];
    const edges = [createMockEdge("node1", "nonexistent")];

    const result = validateFlowConnections(nodes, edges);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Some edges reference non-existent nodes");
  });
});
