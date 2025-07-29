import { type FlowNode } from "../../types/flow";
import { NodePanel } from "./NodePanel";
import { SettingsPanel } from "./SettingsPanel";
import { SIDEBAR_WIDTH } from "../../utils/constants";

interface SidebarProps {
  selectedNode: FlowNode | null;
  onUpdateNode: (nodeId: string, data: Record<string, unknown>) => void;
  onNodeSelect: (node: FlowNode | null) => void;
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export const Sidebar = ({
  selectedNode,
  onUpdateNode,
  onNodeSelect,
  onDragStart,
}: SidebarProps) => {
  return (
    <div
      className="bg-gray-50 border-r border-gray-200 h-full overflow-y-auto"
      style={{ width: SIDEBAR_WIDTH }}
    >
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          onUpdateNode={onUpdateNode}
          onClose={() => onNodeSelect(null)}
        />
      ) : (
        <NodePanel onDragStart={onDragStart} />
      )}
    </div>
  );
};
