import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"
import ChatDetail from "./ChatDetail"
import "../styles/layout.css"

import messi from "../assets/avatars/messi.jpg"
import taylor from "../assets/avatars/taylor.jpg"
import alonso from "../assets/avatars/alonso.jpg"
import duki from "../assets/avatars/duki.jpg"
import biza from "../assets/avatars/biza.jpg"

function Chats() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const [search, setSearch] = useState("")

  const initialChats = [
    {
      id: 1,
      name: "Lionel Messi",
      preview: "¿Entrenamos hoy? ⚽",
      time: "15:36",
      avatar: messi,
      phone: "+54 9 11 4832-9123"
    },
    {
      id: 2,
      name: "Taylor Swift",
      preview: "Estoy escribiendo algo 🎵",
      time: "11:45",
      avatar: taylor,
      phone: "+54 9 11 6721-5544"
    },
    {
      id: 3,
      name: "Alonso",
      preview: "Estoy en stream 🎮",
      time: "10:12",
      avatar: alonso,
      phone: "+54 9 11 3398-2210"
    },
    {
      id: 4,
      name: "Duki",
      preview: "Sale tema nuevo 🎤",
      time: "16:09",
      avatar: duki,
      phone: "+54 9 11 5901-7782"
    },
    {
      id: 5,
      name: "Bizarrap",
      preview: "Tengo una session lista 🔥",
      time: "09:40",
      avatar: biza,
      phone: "+54 9 11 7420-6631"
    }
  ]

  const [chatsData, setChatsData] = useState(() => {
    const saved = localStorage.getItem("whatsapp_chats")
    if (!saved) return initialChats

    const parsed = JSON.parse(saved)

    // 🔥 Eliminamos cualquier chat llamado Grupo Mundial
    return parsed.filter(chat => chat.name !== "Grupo Mundial 🏆")
  })

  useEffect(() => {
    localStorage.setItem("whatsapp_chats", JSON.stringify(chatsData))
  }, [chatsData])

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [user, navigate])

  const filteredChats = chatsData.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app-container">
      <div className="whatsapp-container">

        <div className="sidebar">

          <div style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
            <h3 style={{ color: "#25D366", margin: 0 }}>WhatsApp</h3>
          </div>

          <div style={{ padding: "0.8rem" }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar un chat..."
              style={{
                width: "100%",
                padding: "8px 14px",
                borderRadius: "20px",
                border: "none",
                backgroundColor: "#f0f2f5",
                outline: "none"
              }}
            />
          </div>

          <div style={{ overflowY: "auto", flex: 1 }}>
            {filteredChats.map(chat => (
              <div
                key={chat.id}
                onClick={() => navigate(`/chats/${chat.id}`)}
                className={`chat-item ${Number(id) === chat.id ? "active" : ""}`}
              >
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    objectFit: "cover"
                  }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>{chat.name}</strong>
                    <span style={{ fontSize: "0.75rem", color: "#667781" }}>
                      {chat.time}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "#667781" }}>
                    {chat.preview}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-area">
          {id ? (
            <ChatDetail
              chatsData={chatsData}
              setChatsData={setChatsData}
            />
          ) : (
            <div style={{ margin: "auto", color: "#667781" }}>
              Seleccioná un chat
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Chats