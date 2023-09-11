import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./comp/Layout";
import Content from "./comp/Content";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Content />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
