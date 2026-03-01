import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Chats from "./pages/Chats"
import Perfil from "./components/Perfil" // Importalo (ajustá la ruta si es necesario)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chats" element={<Chats />} />
      <Route path="/chats/:id" element={<Chats />} />
      {/* Agregamos la ruta del perfil */}
      <Route path="/perfil" element={<Perfil />} /> 
    </Routes>
  )
}

export default App