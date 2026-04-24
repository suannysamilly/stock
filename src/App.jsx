import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Register";
import Dashboard from "./pages/Dashboard"
import Solicitacoes from "./pages/Requests"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/solicitacoes" element={<Solicitacoes />} />
    </Routes>
  );
}

export default App;