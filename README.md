Readme - React Flow Task
React Flow Task — README

Intuitive React Flow-based canvas where users drag blocks from a right-side panel into a central canvas, only allow valid connections (Block A → Block B), and right-clicking any dropped block shows a "Hello World" context menu.

📦 Installation steps

1. Ensure Node.js (v16+) and npm are installed.

2. Create app scaffold (or use existing):
       npx create-react-app reactflow-task
       cd reactflow-task
   
3. Install dependencies:
       npm install reactflow
4. Replace src/ files with the provided implementation (or copy the single-file example).


▶️ How to run the app (development)
       # from project root
       npm start

The dev server will start on http://localhost:3000 by default.

Drag blocks from the palette into the canvas, connect nodes, and right-click a node to view the context menu.

🧾 Summary of the solution

The solution is a small React application using React Flow for the canvas. A static JSON simulates fetching available blocks (Block A, Block B) which are rendered in the palette. Users drag palette items into the central canvas; dropped nodes are created with metadata (data.blockType). Connections are validated in onConnect so that only Block A → Block B edges are allowed. Right-clicking a node opens a custom context menu that displays Hello World and provides a convenience action (e.g., remove node).

🧭 Notes on design decisions

React Flow chosen for robust canvas, node/edge lifecycle, and coordinate projection utilities.
Static JSON simulates an API—keeps the example simple and deterministic for evaluation.
Connection validation is implemented in onConnect (server-side style validation would be added for production). Invalid attempts are ignored and user is notified.
Context menu implemented with onNodeContextMenu and a fixed-positioned HTML element so styling and behaviour are fully controllable.
Project structure is modular (separate components: App, Sidebar, FlowCanvas, styles.css) to keep code readable and maintainable.


✅ Code quality & best practices followed

Functional components + React Hooks only.
Controlled React Flow state (nodes, edges) using onNodesChange / onEdgesChange helpers.
Small, single-responsibility components to ease testing and re-use.
Clear naming, compact styles, and comments around non-trivial logic (drop coordinate conversion, connection validation).
Minimal external dependencies (only reactflow) to reduce complexit

📁 Suggested file structure

src/
├─ App.jsx
├─ FlowCanvas.jsx
├─ Sidebar.jsx
├─ styles.css
└─ index.js

