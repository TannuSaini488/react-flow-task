import React from "react";
import FlowCanvas from "./flowCanvas";
import Sidebar from "./Sidebar";
import { useState, useCallback } from "react";
import "./style.css";

export default function App() {

  return (
    <div className="app">
      <Sidebar />
      <FlowCanvas />
    </div>
  );
}
