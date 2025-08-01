import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { MessageCircle } from "lucide-react";

export const MessageNode = memo(({ data, selected }: NodeProps) => {
  // Type assertion to access the data properties safely
  const nodeData = data as { label: string; message: string };

  return (
    <div
      className={`shadow-md rounded-md bg-white dark:bg-gray-800 border-2 transition-colors overflow-hidden
                      ${
                        selected
                          ? "border-blue-500"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
    >
      {/* Target Handle - Left Side */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-gray-400 dark:!bg-gray-500"
      />

      {/* Header Section */}
      <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 flex items-center">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-200 dark:bg-blue-700 mr-2">
          <MessageCircle className="w-3 h-3 text-blue-700 dark:text-blue-300" />
        </div>
        <span className="text-xs font-medium text-green-800 dark:text-green-200">
          {nodeData.label}
        </span>
      </div>

      {/* Body Section */}
      <div className="px-4 py-3 bg-white dark:bg-gray-800">
        <div className="text-sm text-gray-800 dark:text-gray-200">
          {nodeData.message}
        </div>
      </div>

      {/* Source Handle - Right Side */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-gray-400 dark:!bg-gray-500"
      />
    </div>
  );
});

MessageNode.displayName = "MessageNode";
