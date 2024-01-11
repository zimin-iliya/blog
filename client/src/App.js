import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./comp/Layout";
import Content from "./comp/Content";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Register from "./pages/Register";
import { UserContextProvider } from "./comp/UserContext";
function App() {
  

  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Content />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Create />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
