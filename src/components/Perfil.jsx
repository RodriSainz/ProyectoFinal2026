import { useState, useContext, useRef } from "react"
import { UserContext } from "../context/UserContext"

function Perfil({ volver }) {

  const {
    user,
    setUser,
    userPhoto,
    setUserPhoto,
    userStatus,
    setUserStatus
  } = useContext(UserContext)

  const fileInputRef = useRef(null)

  const [nombre, setNombre] = useState(user)
  const [editandoNombre, setEditandoNombre] = useState(false)

  const [estado, setEstado] = useState(userStatus)
  const [editandoEstado, setEditandoEstado] = useState(false)

const cambiarFoto = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onloadend = () => {
    setUserPhoto(reader.result)
  }
  reader.readAsDataURL(file)
}

  const guardarNombre = () => {
    if (!nombre.trim()) return
    setUser(nombre)
    setEditandoNombre(false)
  }

const guardarEstado = () => {
  setUserStatus(estado)
  setEditandoEstado(false)
}

  return (
    <div style={{ padding: "2rem", maxWidth: 500 }}>

      <button
        onClick={volver}
        style={{
          marginBottom: 25,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 16
        }}
      >
        ← Volver
      </button>

      <h2 style={{ marginBottom: 30 }}>Perfil</h2>

      {/* FOTO */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 40,
        position: "relative"
      }}>
        <img
          src={userPhoto}
          alt="perfil"
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />

        <div
          onClick={() => fileInputRef.current.click()}
          style={{
            position: "absolute",
            bottom: 0,
            right: 170,
            background: "#25D366",
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white"
          }}
        >
          📷
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={cambiarFoto}
        />
      </div>

      {/* NOMBRE */}
      <div style={{ marginBottom: 30 }}>
        <p style={{ color: "#667781", marginBottom: 5 }}>Nombre</p>

        {!editandoNombre ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{user}</strong>
            <span onClick={() => setEditandoNombre(true)} style={{ cursor: "pointer" }}>✏</span>
          </div>
        ) : (
          <>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
            <button onClick={guardarNombre} style={{ marginTop: 8 }}>
              Guardar
            </button>
          </>
        )}
      </div>

      {/* ESTADO */}
      <div>
        <p style={{ color: "#667781", marginBottom: 5 }}>Estado</p>

        {!editandoEstado ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{userStatus}</span>
            <span onClick={() => setEditandoEstado(true)} style={{ cursor: "pointer" }}>✏</span>
          </div>
        ) : (
          <>
            <input
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
            <button onClick={guardarEstado} style={{ marginTop: 8 }}>
              Guardar
            </button>
          </>
        )}
      </div>

    </div>
  )
}

export default Perfil