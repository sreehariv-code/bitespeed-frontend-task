import { MessageCircle, ArrowRight } from "lucide-react";

interface NodePanelProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export const NodePanel = ({ onDragStart }: NodePanelProps) => {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Drag and drop nodes
      </h3>

      <div className="space-y-2">
        <div
          className="flex items-center p-3 bg-white border border-gray-200 rounded-lg cursor-grab hover:shadow-md transition-shadow"
          draggable
          onDragStart={(event) => onDragStart(event, "message")}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3">
            <MessageCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-800">Message</div>
            <div className="text-xs text-gray-500">Send a text message</div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
        </div>
      </div>
    </div>
  );
};
