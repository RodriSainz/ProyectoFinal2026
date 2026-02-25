import { useParams } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"

function ChatDetail({ chatsData, setChatsData }) {
  const { id } = useParams()
  const { user } = useContext(UserContext)

  const chatId = Number(id)
  const currentChat = chatsData.find(c => c.id === chatId)

  const [showInfo, setShowInfo] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)

  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState(currentChat?.name || "")

  const [searchMsg, setSearchMsg] = useState("")
  const [typing, setTyping] = useState(false)

  const getTime = () => {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem("whatsapp_conversations")
    return saved ? JSON.parse(saved) : {}
  })

  const [newMessage, setNewMessage] = useState("")
  const messages = conversations[chatId] || []

  useEffect(() => {
    localStorage.setItem(
      "whatsapp_conversations",
      JSON.stringify(conversations)
    )
  }, [conversations])

  // Cerrar imagen con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowFullImage(false)
      }
    }

    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [])

  const confirmNameChange = () => {
    if (!tempName.trim()) return

    setChatsData(prev =>
      prev.map(chat =>
        chat.id === chatId ? { ...chat, name: tempName } : chat
      )
    )

    setEditingName(false)
  }

  const cancelEdit = () => {
    setTempName(currentChat?.name || "")
    setEditingName(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") confirmNameChange()
    if (e.key === "Escape") cancelEdit()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const myMsg = {
      sender: user,
      text: newMessage,
      time: getTime()
    }

    setConversations(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), myMsg]
    }))

    setNewMessage("")
    setTyping(true)

    setTimeout(() => {
      const reply = {
        sender: currentChat?.name,
        text: "👍",
        time: getTime()
      }

      setConversations(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), reply]
      }))

      setTyping(false)
    }, 1000)
  }

  const filteredMessages = messages.filter(msg =>
    msg.text.toLowerCase().includes(searchMsg.toLowerCase())
  )

  return (
    <>
      <div style={{ display: "flex", height: "100%" }}>

        {/* CHAT */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

          {/* HEADER */}
          <div
            style={{
              padding: "10px 16px",
              backgroundColor: "#f0f2f5",
              borderBottom: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
              onClick={() => setShowInfo(true)}
            >
              <img
                src={currentChat?.avatar}
                alt={currentChat?.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
              <strong>{currentChat?.name}</strong>
            </div>

            <span
              style={{ cursor: "pointer", fontSize: "18px" }}
              onClick={() => setShowSearch(prev => !prev)}
            >
              🔍
            </span>
          </div>

          {/* BUSCAR MENSAJES */}
          {showSearch && (
            <div style={{ padding: "10px 16px", backgroundColor: "#f6f6f6" }}>
              <input
                placeholder="Buscar mensajes..."
                value={searchMsg}
                onChange={(e) => setSearchMsg(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "20px",
                  border: "1px solid #ccc"
                }}
              />
            </div>
          )}

          {/* MENSAJES */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            {filteredMessages.map((msg, index) => {
              const isMe = msg.sender === user

              return (
                <div
                  key={index}
                  style={{
                    alignSelf: isMe ? "flex-end" : "flex-start",
                    backgroundColor: isMe ? "#d9fdd3" : "white",
                    padding: "6px 10px",
                    maxWidth: "65%",
                    borderRadius: isMe
                      ? "8px 8px 2px 8px"
                      : "8px 8px 8px 2px"
                  }}
                >
                  {msg.text}
                  <div
                    style={{
                      fontSize: "0.65rem",
                      textAlign: "right",
                      marginTop: "4px",
                      color: "#667781"
                    }}
                  >
                    {msg.time}
                  </div>
                </div>
              )
            })}
          </div>

          {/* INPUT */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              padding: "10px 16px",
              backgroundColor: "#f0f2f5"
            }}
          >
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribí un mensaje"
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "20px",
                border: "1px solid #ccc"
              }}
            />
            <button
              type="submit"
              style={{
                marginLeft: "10px",
                backgroundColor: "#25D366",
                border: "none",
                color: "white",
                padding: "8px 16px",
                borderRadius: "20px"
              }}
            >
              Enviar
            </button>
          </form>
        </div>

        {/* PANEL DERECHO */}
        {showInfo && (
          <div
            style={{
              width: "380px",
              backgroundColor: "#ffffff",
              borderLeft: "1px solid #ddd",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              animation: "slideIn 0.2s ease"
            }}
          >
            <div
              style={{
                padding: "16px",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <span style={{ cursor: "pointer" }} onClick={() => setShowInfo(false)}>✕</span>
                <strong>Info. del contacto</strong>
              </div>

              {!editingName && (
                <span style={{ cursor: "pointer" }} onClick={() => setEditingName(true)}>✏️</span>
              )}
            </div>

            <div style={{ textAlign: "center", padding: "30px 20px" }}>
              <img
                src={currentChat?.avatar}
                alt={currentChat?.name}
                onClick={() => setShowFullImage(true)}
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer"
                }}
              />

              {editingName ? (
                <div style={{ marginTop: "15px" }}>
                  <input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    style={{ fontSize: "1.5rem", textAlign: "center" }}
                  />
                  <div
                    style={{
                      marginTop: "10px",
                      color: "#25D366",
                      fontSize: "22px",
                      cursor: "pointer"
                    }}
                    onClick={confirmNameChange}
                  >
                    ✔
                  </div>
                </div>
              ) : (
                <h2 style={{ marginTop: "15px" }}>
                  {currentChat?.name}
                </h2>
              )}

              <p style={{ color: "#667781" }}>
                {currentChat?.phone}
              </p>

              <div
                onClick={() => {
                  setShowSearch(true)
                  setShowInfo(false)
                }}
                style={{
                  marginTop: "20px",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  cursor: "pointer"
                }}
              >
                🔍 Buscar en chat
              </div>
            </div>
          </div>
        )}
      </div>

      {/* VISOR FULLSCREEN */}
      {showFullImage && (
        <div
          onClick={() => setShowFullImage(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <div
            onClick={() => setShowFullImage(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              fontSize: "32px",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ✕
          </div>

          <img
            src={currentChat?.avatar}
            alt={currentChat?.name}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px"
            }}
          />
        </div>
      )}
    </>
  )
}

export default ChatDetail