import { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { type FlowNode, type MessageNodeData } from "../../types/flow";
import { ArrowLeft } from "lucide-react";

interface SettingsPanelProps {
  selectedNode: FlowNode | null;
  onUpdateNode: (nodeId: string, data: Record<string, unknown>) => void;
  onClose: () => void;
}

export const SettingsPanel = ({
  selectedNode,
  onUpdateNode,
  onClose,
}: SettingsPanelProps) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedNode && selectedNode.type === "message") {
      const messageData = selectedNode.data as MessageNodeData;
      setMessage(messageData.message || "");
    }
  }, [selectedNode]);

  const handleSave = () => {
    if (selectedNode) {
      onUpdateNode(selectedNode.id, { message });
      onClose();
    }
  };

  if (!selectedNode || selectedNode.type !== "message") {
    return null;
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded mr-2"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-medium text-gray-700">Message Settings</h3>
      </div>

      <div className="space-y-4">
        <Input
          label="Message Text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message..."
          className="min-h-20"
        />

        <div className="flex space-x-2">
          <Button onClick={handleSave}>Save</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
