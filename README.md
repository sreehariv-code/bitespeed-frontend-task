# BiteSpeed Chatbot Flow Builder

A visual drag-and-drop chatbot flow builder built with React, TypeScript, and React Flow (XYFlow). This project was developed as part of a frontend developer assignment for [BiteSpeed](https://wellfound.com/jobs/3337670-frontend-developer) on Wellfound.

## 🚀 Live Demo

**Try the application live**: [https://bitespeed-frontend-task-lyart.vercel.app/](https://bitespeed-frontend-task-lyart.vercel.app/)

## Assignment Context

This project was created as a submission for the Frontend Developer role at BiteSpeed. The assignment required building a chatbot flow builder with the following key requirements:

- Visual drag-and-drop interface for creating conversation flows
- Real-time flow validation
- Multiple node types (Start, Message)
- Interactive node connections
- Modern React/TypeScript implementation
- Responsive design with theme support

For more details about the assignment requirements, see the [BiteSpeed Frontend Task](https://www.notion.so/bitespeed/BiteSpeed-Frontend-Task-Chatbot-flow-builder-fb0feb3498294929a9b7171bcb4e8a8b).

## Features

- **Visual Flow Builder**: Drag and drop interface for creating chatbot conversation flows
- **Real-time Flow Validation**: Prevents saving flows with disconnected nodes
- **Live Validation Feedback**: Visual indicators show validation status in the header
- **Multiple Node Types**:
  - **Start Node**: Entry point of the conversation (only one allowed per flow)
  - **Message Node**: Displays messages to users with editable content
- **Interactive Connections**: Connect nodes to create conversation paths
- **Real-time Editing**: Edit node content directly in the interface
- **Responsive Design**: Full-screen canvas with zoom, pan, and minimap
- **Dark/Light Theme Support**: Toggle between light, dark, and system themes
- **Local Storage**: Flows are automatically saved to browser localStorage
- **Node Management**: Delete nodes and automatically clean up connections

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd bitespeed-frontend-task
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Adding Nodes
- Use the sidebar panel on the right to add different types of nodes
- Drag "Start" node to add the conversation entry point (only one allowed)
- Drag "Message" node to add message nodes with editable content

### Connecting Nodes
- Drag from the right handle (source) of one node to the left handle (target) of another node
- This creates a connection between the nodes

### Flow Validation
- **Real-time Validation**: The header shows validation status in real-time
- **Save Protection**: The save button is disabled when nodes are disconnected
- **Visual Feedback**: Disconnected nodes are highlighted in the minimap
- **Error Messages**: Clear error messages explain what needs to be fixed

### Editing Node Content
- **Message Nodes**: Click on the node to select it, then edit the message in the sidebar
- All changes are saved automatically to localStorage

### Theme Management
- **Theme Toggle**: Click the theme icon in the header to cycle through light, dark, and system themes
- **Persistent Settings**: Theme preference is saved to localStorage

### Navigation
- **Pan**: Click and drag on empty space to move around the canvas
- **Zoom**: Use the mouse wheel or zoom controls in the bottom-right
- **Minimap**: Use the minimap in the bottom-left for quick navigation

## Technology Stack

- **React 19**: UI framework with latest features
- **TypeScript**: Type safety and better development experience
- **React Flow (XYFlow)**: Modern node-based flow builder library
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Beautiful icon library
- **Vite**: Fast build tool and development server

## Project Structure

```
src/
├── components/
│   ├── FlowBuilder/
│   │   ├── FlowBuilder.tsx    # Main flow builder component
│   │   └── FlowCanvas.tsx     # Canvas component with React Flow
│   ├── Header/
│   │   └── Header.tsx         # Header with validation and theme controls
│   ├── Nodes/
│   │   ├── StartNode.tsx      # Start node component
│   │   └── MessageNode.tsx    # Message node component
│   ├── Sidebar/
│   │   ├── Sidebar.tsx        # Main sidebar component
│   │   ├── NodePanel.tsx      # Node creation panel
│   │   └── SettingsPanel.tsx  # Node editing panel
│   └── ui/
│       ├── Button.tsx         # Reusable button component
│       └── Input.tsx          # Reusable input component
├── hooks/
│   ├── useFlowBuilder.ts      # Main flow builder logic
│   ├── useNodeEditor.ts       # Node editing logic
│   └── useTheme.ts           # Theme management
├── types/
│   └── flow.ts               # TypeScript type definitions
├── utils/
│   ├── constants.ts          # Application constants
│   └── flowUtils.ts          # Flow validation utilities
├── App.tsx                   # Main app component
└── main.tsx                 # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features Explained

### Flow Validation
The application validates that all nodes are connected to form a valid conversation flow. The validation logic:
- Ensures all nodes are connected via edges
- Prevents saving disconnected flows
- Provides real-time feedback in the header
- Highlights disconnected nodes visually

### Node Management
- **Start Node**: Only one start node is allowed per flow
- **Message Nodes**: Can be added multiple times with editable content
- **Node Deletion**: Deleting a node automatically removes all connected edges
- **Drag & Drop**: Nodes can be dragged from the sidebar to the canvas

### Theme System
- **Three Themes**: Light, Dark, and System (follows OS preference)
- **Persistent**: Theme choice is saved to localStorage
- **Responsive**: Automatically adapts to system theme changes

### Data Persistence
- **Local Storage**: Flows are automatically saved to browser localStorage
- **Auto-save**: Changes are persisted immediately
- **Load on Refresh**: Flows are restored when the page is refreshed

## Assignment Implementation Details

This project demonstrates proficiency in:
- **Modern React Development**: Using React 19 with hooks and functional components
- **TypeScript**: Full type safety throughout the application
- **State Management**: Custom hooks for flow builder logic and theme management
- **UI/UX Design**: Intuitive drag-and-drop interface with real-time feedback
- **Code Organization**: Clean component structure with proper separation of concerns
- **Responsive Design**: Works seamlessly across different screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## Future Enhancements

- Save/load flow configurations to cloud storage
- Export flows to different formats (JSON, XML, etc.)
- Conditional logic nodes
- Integration with chatbot platforms
- Real-time collaboration features
- Advanced styling and themes
- Node templates and presets
- Flow versioning and history

## Contributing

This is an assignment submission for BiteSpeed's Frontend Developer position. For general contributions to similar projects:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

**Assignment Submission for**: [BiteSpeed Frontend Developer Role](https://wellfound.com/jobs/3337670-frontend-developer)  
**Assignment Details**: [BiteSpeed Frontend Task](https://www.notion.so/bitespeed/BiteSpeed-Frontend-Task-Chatbot-flow-builder-fb0feb3498294929a9b7171bcb4e8a8b)
