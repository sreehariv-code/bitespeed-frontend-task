import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Play } from "lucide-react";

export const StartNode = memo(({ data, selected }: NodeProps) => {
  // Type assertion to access the data properties safely
  const nodeData = data as { label: string };

  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-green-50 border-2 transition-colors
                      ${selected ? "border-blue-500" : "border-green-200"}`}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-200 mr-2">
          <Play className="w-4 h-4 text-green-700" />
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold text-green-800">
            {nodeData.label}
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

StartNode.displayName = "StartNode";
