import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import "../styles/login.css"

function Login() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim() || !password.trim()) {
      setError("Completá todos los campos")
      return
    }

    setUser(name)
    navigate("/chats")
  }

  return (
    <div className="login-background">
      <div className="login-card">

        <div className="logo">WhatsApp</div>

        <h2>Iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingresá tu nombre"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError("")
            }}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError("")
            }}
          />

          {error && (
            <p style={{ color: "#ff6b6b", marginBottom: "15px" }}>
              {error}
            </p>
          )}

          <button type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login