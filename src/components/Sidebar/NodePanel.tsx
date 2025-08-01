import { MessageCircle, ArrowRight, Play, AlertCircle } from "lucide-react";

interface NodePanelProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
  hasStartNode?: boolean;
}

export const NodePanel = ({
  onDragStart,
  hasStartNode = false,
}: NodePanelProps) => {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium text-blue-900 dark:text-gray-200 mb-3">
        Drag and drop nodes
      </h3>

      {!hasStartNode && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-600/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-300" />
            <span className="text-xs text-yellow-800 dark:text-yellow-100">
              Add a Start node to begin your conversation flow
            </span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {/* Start Node */}
        <div
          className={`flex items-center p-3 border border-blue-200 dark:border-gray-500 rounded-lg transition-all
            ${
              hasStartNode
                ? "bg-blue-100 dark:bg-gray-800 cursor-not-allowed opacity-50"
                : "bg-white dark:bg-gray-800 cursor-grab hover:shadow-md hover:bg-blue-50 dark:hover:bg-gray-700"
            }`}
          draggable={!hasStartNode}
          onDragStart={
            !hasStartNode ? (event) => onDragStart(event, "start") : undefined
          }
          title={
            hasStartNode
              ? "Start node already exists in the flow"
              : "Add start node to flow"
          }
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-800 mr-3">
            <Play className="w-4 h-4 text-green-600 dark:text-green-200" />
          </div>
          <div>
            <div className="font-medium text-gray-800 dark:text-gray-100">
              Start
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {hasStartNode ? "Already exists" : "Conversation entry point"}
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 ml-auto" />
        </div>

        {/* Message Node */}
        <div
          className="flex items-center p-3 bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-500 rounded-lg cursor-grab hover:shadow-md hover:bg-blue-50 dark:hover:bg-gray-700 transition-shadow"
          draggable
          onDragStart={(event) => onDragStart(event, "message")}
          title="Add message node to flow"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 mr-3">
            <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-200" />
          </div>
          <div>
            <div className="font-medium text-gray-800 dark:text-gray-100">
              Message
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Send a text message
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 ml-auto" />
        </div>
      </div>
    </div>
  );
};
