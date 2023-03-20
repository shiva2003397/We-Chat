import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route excat path="/" element={<Join />} />
          <Route excat path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;