import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

export default function FlowCanvas() {
  const reactFlowWrapper = useRef(null);
  const reactFlowInstanceRef = useRef(null);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [contextMenu, setContextMenu] = useState(null); 

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => {
      // find source / target nodes
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);

      const sourceType = sourceNode?.data?.blockType;
      const targetType = targetNode?.data?.blockType;

      if (sourceType === "blockA" && targetType === "blockB") {
        setEdges((eds) => addEdge(params, eds));
      } else {
        window.alert("Only connections from Block A → Block B are allowed.");
      }
    },
    [nodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowWrapper.current || !reactFlowInstanceRef.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const raw = event.dataTransfer.getData("application/reactflow");
      if (!raw) return;

      let block;
      try {
        block = JSON.parse(raw);
      } catch {
        return;
      }

      const position = reactFlowInstanceRef.current.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const id = `${block.type}-${+new Date()}`;
      const newNode = {
        id,
        position,
        data: { label: block.label, blockType: block.type },
        style: {
          padding: 10,
          borderRadius: 8,
          border: "1px solid #222",
          minWidth: 80,
          textAlign: "center",
          background: block.type === "blockA" ? "#d8f8d8" : "#fff0c8",
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    []
  );

  const onInit = useCallback((rfi) => {
    reactFlowInstanceRef.current = rfi;
  }, []);

  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      node,
    });
  }, []);

  const closeContext = useCallback(() => setContextMenu(null), []);

  const onPaneClick = useCallback(() => closeContext(), [closeContext]);

  const removeNode = useCallback(
    (nodeId) => setNodes((nds) => nds.filter((n) => n.id !== nodeId)),
    []
  );

  return (
    <div className="flow-wrapper">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeContextMenu={onNodeContextMenu}
          onPaneClick={onPaneClick}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      {contextMenu && (
        <div
          className="context-menu"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
          }}
          onClick={closeContext}
        >
          <div className="menu-item">Hello World</div>
          <div
            className="menu-item small"
            onClick={(e) => {
              e.stopPropagation();
              removeNode(contextMenu.node.id);
              closeContext();
            }}
          >
            Remove node
          </div>
        </div>
      )}
    </div>
  );
}
