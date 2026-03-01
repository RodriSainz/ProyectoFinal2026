import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

function Configuracion({ irAPerfil }) { // Recibe la función del padre

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const cerrarSesion = () => {
    localStorage.clear()
    setUser(null)
    navigate("/")
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 500 }}>

      <h2 style={{ marginBottom: 30 }}>Configuración</h2>

      {/* PERFIL - Al hacer clic ejecuta la función que cambia la vista en el padre */}
      <div
        onClick={() => {
            console.log("Cambiando a perfil..."); // Para que verifiques en consola
            irAPerfil(); 
        }}
        className="config-item"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
          padding: "15px 10px",
          borderRadius: 10,
          cursor: "pointer"
        }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z"/>
          <path d="M4 20C4 16.69 7.13 14 12 14C16.87 14 20 16.69 20 20H4Z"/>
        </svg>

        <span style={{ fontSize: 16 }}>Perfil</span>
      </div>

      {/* CERRAR SESIÓN */}
      <div
        onClick={cerrarSesion}
        className="config-item logout"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
          padding: "15px 10px",
          borderRadius: 10,
          cursor: "pointer",
          marginTop: 10
        }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M10 17L15 12L10 7V10H3V14H10V17Z"/>
          <path d="M20 3H12V5H20V19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3Z"/>
        </svg>

        <span style={{ fontSize: 16 }}>Cerrar sesión</span>
      </div>

    </div>
  )
}

export default Configuracion