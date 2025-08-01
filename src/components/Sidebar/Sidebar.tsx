import { type FlowNode } from "../../types/flow";
import { NodePanel } from "./NodePanel";
import { SettingsPanel } from "./SettingsPanel";
import { SIDEBAR_WIDTH } from "../../utils/constants";

interface SidebarProps {
  selectedNode: FlowNode | null;
  onUpdateNode: (nodeId: string, data: Record<string, unknown>) => void;
  onNodeSelect: (node: FlowNode | null) => void;
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
  nodes?: FlowNode[];
}

export const Sidebar = ({
  selectedNode,
  onUpdateNode,
  onNodeSelect,
  onDragStart,
  nodes = [],
}: SidebarProps) => {
  // Check if there's already a start node in the flow
  const hasStartNode = nodes.some((node) => node.type === "start");

  return (
    <div
      className="bg-blue-50 dark:bg-[#161616] border-l border-blue-200 dark:border-gray-600 h-full overflow-y-auto"
      style={{ width: SIDEBAR_WIDTH }}
    >
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          onUpdateNode={onUpdateNode}
          onClose={() => onNodeSelect(null)}
        />
      ) : (
        <NodePanel onDragStart={onDragStart} hasStartNode={hasStartNode} />
      )}
    </div>
  );
};
