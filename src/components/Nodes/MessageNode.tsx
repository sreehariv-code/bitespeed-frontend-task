import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { MessageCircle } from "lucide-react";

export const MessageNode = memo(({ data, selected }: NodeProps) => {
  // Type assertion to access the data properties safely
  const nodeData = data as { label: string; message: string };

  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-white border-2 transition-colors
                      ${selected ? "border-blue-500" : "border-gray-200"}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />

      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 mr-2">
          <MessageCircle className="w-4 h-4 text-green-600" />
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold text-gray-800">
            {nodeData.label}
          </div>
          <div className="text-gray-500 text-sm truncate max-w-32">
            {nodeData.message}
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
    </div>
  );
});

MessageNode.displayName = "MessageNode";
