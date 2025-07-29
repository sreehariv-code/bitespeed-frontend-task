# Chatbot Flow Builder

A visual drag-and-drop chatbot flow builder built with React, TypeScript, and React Flow.

## Features

- **Visual Flow Builder**: Drag and drop interface for creating chatbot conversation flows
- **Flow Validation**: Prevents saving flows with disconnected nodes
- **Real-time Validation Feedback**: Visual indicators show when nodes are disconnected
- **Multiple Node Types**:
  - **Start Node**: Entry point of the conversation
  - **Message Node**: Displays messages to users with editable content
  - **Question Node**: Asks questions with multiple choice options
  - **End Node**: Terminates the conversation
- **Interactive Connections**: Connect nodes to create conversation paths
- **Real-time Editing**: Edit node content directly in the interface
- **Responsive Design**: Full-screen canvas with zoom, pan, and minimap

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bitspeed-frontend-task
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
- Use the buttons in the top-left panel to add different types of nodes
- Click "Add Message" to add a message node
- Click "Add Question" to add a question node with multiple choice options
- Click "Add End" to add an end node

### Connecting Nodes
- Drag from the bottom handle of one node to the top handle of another node
- This creates a connection between the nodes

### Flow Validation
- **Real-time Validation**: The header shows validation status in real-time
- **Save Protection**: The save button is disabled when nodes are disconnected
- **Visual Feedback**: Disconnected nodes are highlighted in red in the minimap
- **Error Messages**: Clear error messages explain what needs to be fixed

### Editing Node Content
- **Message Nodes**: Click on the textarea to edit the message content
- **Question Nodes**: Edit the question text and add/remove options as needed
- All changes are saved automatically

### Navigation
- **Pan**: Click and drag on empty space to move around the canvas
- **Zoom**: Use the mouse wheel or zoom controls in the bottom-right
- **Minimap**: Use the minimap in the bottom-left for quick navigation

## Technology Stack

- **React 19**: UI framework
- **TypeScript**: Type safety and better development experience
- **React Flow**: Node-based flow builder library
- **Vite**: Fast build tool and development server

## Project Structure

```
src/
├── components/
│   ├── FlowBuilder.tsx      # Main flow builder component
│   └── nodes/
│       ├── StartNode.tsx    # Start node component
│       ├── MessageNode.tsx  # Message node component
│       ├── QuestionNode.tsx # Question node component
│       └── EndNode.tsx      # End node component
├── utils/
│   └── flowUtils.ts         # Flow validation utilities
├── App.tsx                  # Main app component
└── main.tsx                # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Future Enhancements

- Save/load flow configurations
- Export flows to different formats
- Conditional logic nodes
- Integration with chatbot platforms
- Real-time collaboration
- Advanced styling and themes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
