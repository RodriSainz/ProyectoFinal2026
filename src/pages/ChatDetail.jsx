import { useParams, useNavigate } from "react-router-dom"
import { useState, useContext, useEffect, useRef } from "react"
import { UserContext } from "../context/UserContext"

function ChatDetail({ chatsData, setChatsData }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  
  const messagesEndRef = useRef(null)

  const chatId = Number(id)
  const currentChat = chatsData.find(c => c.id === chatId)

  const messages = Array.isArray(currentChat?.messages)
    ? currentChat.messages
    : []

  const [showInfo, setShowInfo] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)

  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState(currentChat?.name || "")

  const [searchMsg, setSearchMsg] = useState("")
  const [typing, setTyping] = useState(false)

  // ✨ LÓGICA DE DETECCIÓN DE MODO OSCURO (SIN BORRAR NADA)
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains("dark-mode"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains("dark-mode"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const getTime = () => {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  useEffect(() => {
    setTempName(currentChat?.name || "")
    setEditingName(false)
  }, [chatId, currentChat?.name])

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

  // ✨ ICONO SVG DE LUPA (WhatsApp Style) - INTEGRO
  const SearchIcon = ({ size = 24, color = "#54656f" }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} preserveAspectRatio="xMidYMid meet" fill="none">
      <path d="M15.916 14.502h-.745l-.264-.254A6.107 6.107 0 0 0 16.333 10.2a6.133 6.133 0 1 0-6.133 6.133 6.107 6.107 0 0 0 4.048-1.426l.254.264v.745l4.717 4.708 1.408-1.408-4.711-4.714Zm-5.716 0a4.302 4.302 0 1 1 0-8.604 4.302 4.302 0 0 1 0 8.604Z" fill={color}></path>
    </svg>
  );

  // ✨ ICONO SVG DE LÁPIZ (WhatsApp Style) - INTEGRO
  const EditIcon = ({ size = 20, color = "#54656f" }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} preserveAspectRatio="xMidYMid meet" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M18.063 2.25c.115 0 .232.01.35.03.715.114 1.343.465 1.83 1.01.488.547.781 1.25.836 2.016.056.766-.145 1.543-.585 2.19-.016.024-.034.048-.052.072l-9.533 11.564c-.218.264-.51.455-.838.547l-4.491 1.251c-.347.097-.714-.002-.973-.26-.26-.26-.358-.626-.26-.973l1.25-4.492c.093-.327.284-.62.548-.838l9.531-11.564c.068-.083.14-.16.216-.233.51-.482 1.18-.73 1.871-.73Zm.35 1.53a.35.35 0 0 0-.35-.03c-.34.053-.664.201-.918.441l-9.532 11.563a.336.336 0 0 0-.07.108l-1.045 3.753 3.753-1.045c.041-.01.079-.035.109-.071l9.532-11.563c.01-.013.021-.027.031-.04.223-.33.324-.717.296-1.103-.028-.386-.176-.74-.423-1.018a1.36 1.36 0 0 0-.91-.502.502.502 0 0 0-.473.507Z" fill={color}></path>
    </svg>
  );

  // ✨ RESPUESTAS PERSONALIZADAS - RECUPERADAS AL 100%
  const getPersonalizedResponse = (name) => {
    const n = name?.toLowerCase()
    const responses = {
      messi: [
        "¡Hola! Recién termino de entrenar. Un abrazo para la familia. Leo.",
        "Gracias por el aguante de siempre. ¡Vamos Argentina! 🇦🇷",
        "Mañana tenemos partido importante, estoy concentrado pero paso a saludar.",
        "Todo tranqui por acá en Miami, disfrutando un poco del sol.",
        "¿Viste el gol de ayer? Fue un lindo partido.",
        "Un saludo grande, cuidate mucho. Nos vemos pronto."
      ],
      taylor: [
        "Hi! I'm actually in the studio writing some new lyrics. Speak soon! ✨",
        "The Eras Tour has been such a dream. Thank you for all the love!",
        "Just hanging out with my cats right now. Hope you're having a lovely day.",
        "I'm so excited for what's coming next! Can't wait to share it.",
        "Remember: the best people in life are free. Sending love!",
        "Working on some secret projects... keep an eye out! 🧣"
      ],
      alonso: [
        "¡Qué onda rey! ¿Todo tranqui? ¡Mantecaaaa! 🧈",
        "Estoy por prender stream en un ratito, pasate que sale algo épico.",
        "Uff, no sabés lo que pasó hoy en el directo, una locura total.",
        "Acá andamos, metiéndole a pleno a las redes. ¡Mantecaaaa pura!",
        "Che, me voy a pedir algo para comer y vuelvo al setup. ¡Hablamos!",
        "¡Gracias por estar ahí siempre bancando los trapos!"
      ],
      duki: [
        "¡Ysy A y el Duko en la casa! ¿Qué dice esa banda? 🦇",
        "Recién bajo del escenario, la energía fue de otro planeta. Modo Diablo.",
        "Estamos cocinando un trap bien pesado en el estudio. Agarrate.",
        "Hablamos después que estoy yendo para el ensayo. Un abrazo, crack.",
        "Gracias por el cariño, los de siempre saben qué onda. 🤟",
        "Se vienen cositas nuevas... el modo diablo nunca se apaga."
      ],
      bizarrap: [
        "¿Qué onda? Estoy acá con el pro tools a pleno mezclando la próxima session. 🎧",
        "Uff, no sabés el beat que acabo de armar. Va a explotar todo.",
        "¿Quién te gustaría que sea la próxima session? Tirame un centro.",
        "Perdón la demora, estaba ajustando unas voces. ¡Hablamos!",
        "¡Gracias por el aguante! Nos vemos en el próximo lanzamiento. 🕶️",
        "Mucha música nueva en camino, no paramos un segundo."
      ]
    }
    const key = Object.keys(responses).find(k => n.includes(k))
    const selectedResponses = responses[key] || ["¡Hola! ¿Cómo va? 👍"]
    return selectedResponses[Math.floor(Math.random() * selectedResponses.length)]
  }

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

    const myMsg = { sender: "me", text: newMessage, time: getTime() }

    setChatsData(prev => {
      const chatToUpdate = prev.find(c => c.id === chatId)
      const otherChats = prev.filter(c => c.id !== chatId)
      const updatedChat = {
        ...chatToUpdate,
        messages: [...(Array.isArray(chatToUpdate.messages) ? chatToUpdate.messages : []), myMsg]
      }
      return [updatedChat, ...otherChats]
    })

    setNewMessage("")
    setTyping(true)

    setTimeout(() => {
      const reply = {
        sender: currentChat?.name,
        text: getPersonalizedResponse(currentChat?.name),
        time: getTime()
      }

      setChatsData(prev => {
        const chatToUpdate = prev.find(c => c.id === chatId)
        const otherChats = prev.filter(c => c.id !== chatId)
        const updatedChat = {
          ...chatToUpdate,
          messages: [...(Array.isArray(chatToUpdate.messages) ? chatToUpdate.messages : []), reply]
        }
        return [updatedChat, ...otherChats]
      })
      setTyping(false)
    }, 2000)
  }

  const filteredMessages = messages.filter(msg =>
    msg.text.toLowerCase().includes(searchMsg.toLowerCase())
  )

  const dynamicBackground = isDarkMode 
    ? { backgroundColor: "#0b141a", backgroundImage: "none" } 
    : { 
        backgroundColor: "#efeae2",
        backgroundImage: `linear-gradient(rgba(239, 234, 226, 0.88), rgba(239, 234, 226, 0.88)), url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
        backgroundRepeat: "repeat",
        backgroundSize: "400px"
      };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        /* Estilo para la flecha de retroceso */
        .back-arrow-mobile {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          margin-right: 8px;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 1024px) {
          .back-arrow-mobile {
            display: flex;
          }
        }
      `}</style>
      <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>

          {/* HEADER DEL CHAT */}
          <div
            style={{
              padding: "10px 16px",
              backgroundColor: isDarkMode ? "#202c33" : "#f0f2f5",
              borderBottom: "1px solid " + (isDarkMode ? "#222d34" : "#ddd"),
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 10
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0px", cursor: "pointer" }}
            >
              {/* FLECHA ACTUALIZADA: Ahora navega directamente a /chats */}
              <button className="back-arrow-mobile" onClick={() => navigate('/chats')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? "#aebac1" : "#54656f"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }} onClick={() => setShowInfo(true)}>
                <img
                  src={currentChat?.avatar}
                  alt={currentChat?.name}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong style={{ color: isDarkMode ? "#e9edef" : "#111b21", fontSize: "16px" }}>
                    {currentChat?.name}
                  </strong>
                  {typing ? (
                    <span style={{ fontSize: "12px", color: "#25D366", fontWeight: "500" }}>escribiendo...</span>
                  ) : (
                    <span style={{ fontSize: "12px", color: isDarkMode ? "#aebac1" : "#667781" }}>en línea</span>
                  )}
                </div>
              </div>
            </div>

            <div 
              style={{ cursor: "pointer", display: "flex", alignItems: "center", padding: "8px" }} 
              onClick={() => setShowSearch(prev => !prev)}
            >
              <SearchIcon size={22} color={showSearch ? "#00a884" : (isDarkMode ? "#aebac1" : "#54656f")} />
            </div>
          </div>

          {/* BUSCADOR DE MENSAJES */}
          {showSearch && (
            <div style={{ padding: "10px 16px", backgroundColor: isDarkMode ? "#111b21" : "#f0f2f5", borderBottom: "1px solid " + (isDarkMode ? "#222d34" : "#ddd") }}>
              <div style={{ backgroundColor: isDarkMode ? "#2a3942" : "white", borderRadius: "8px", display: "flex", alignItems: "center", padding: "0 12px" }}>
                <SearchIcon size={20} color="#8696a0" />
                <input
                  placeholder="Buscar mensajes..."
                  value={searchMsg}
                  onChange={(e) => setSearchMsg(e.target.value)}
                  style={{
                    flex: 1, padding: "8px 12px", border: "none", outline: "none", fontSize: "14px",
                    backgroundColor: "transparent", color: isDarkMode ? "white" : "black"
                  }}
                />
                {searchMsg && <span style={{cursor:"pointer", color:"#8696a0"}} onClick={()=>setSearchMsg("")}>✕</span>}
              </div>
            </div>
          )}

          {/* AREA DE MENSAJES CON FONDO DINÁMICO */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              ...dynamicBackground
            }}
          >
            {filteredMessages.map((msg, index) => {
              const isMe = msg.sender === "me" || msg.sender === user

              return (
                <div
                  key={index}
                  style={{
                    alignSelf: isMe ? "flex-end" : "flex-start",
                    backgroundColor: isMe 
                      ? (isDarkMode ? "#005c4b" : "#d9fdd3") 
                      : (isDarkMode ? "#202c33" : "white"),
                    color: isDarkMode ? "#e9edef" : "#111b21",
                    padding: "6px 10px",
                    maxWidth: "65%",
                    borderRadius: isMe
                      ? "8px 8px 2px 8px"
                      : "8px 8px 8px 2px",
                    boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
                    position: "relative"
                  }}
                >
                  <span style={{ fontSize: "14.2px", lineHeight: "19px", whiteSpace: "pre-wrap" }}>
                    {msg.text}
                  </span>
                  <div
                    style={{
                      fontSize: "11px",
                      textAlign: "right",
                      marginTop: "4px",
                      color: isDarkMode ? "rgba(233, 237, 239, 0.6)" : "#667781",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "3px"
                    }}
                  >
                    {msg.time}
                    {isMe && <span style={{ color: "#53bdeb", fontSize: "15px" }}>✓✓</span>}
                  </div>
                </div>
              )
            })}

            {typing && (
              <div
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: isDarkMode ? "#202c33" : "white",
                  padding: "8px 12px",
                  borderRadius: "8px 8px 8px 2px",
                  fontSize: "0.9rem",
                  color: isDarkMode ? "#aebac1" : "#667781",
                  fontStyle: "italic",
                  boxShadow: "0 1px 1px rgba(0,0,0,0.1)"
                }}
              >
                {currentChat?.name} está escribiendo...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT DE MENSAJE */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              padding: "10px 16px",
              backgroundColor: isDarkMode ? "#202c33" : "#f0f2f5",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje"
              style={{
                flex: 1,
                padding: "9px 12px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: isDarkMode ? "#2a3942" : "white",
                color: isDarkMode ? "white" : "black",
                outline: "none",
                fontSize: "15px"
              }}
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: newMessage.trim() ? "pointer" : "default",
                padding: "5px"
              }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill={newMessage.trim() ? "#8696a0" : "#8696a0"} d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
              </svg>
            </button>
          </form>
        </div>

        {/* PANEL DE INFORMACIÓN DERECHO */}
        {showInfo && (
          <div
            style={{
              width: "400px",
              backgroundColor: isDarkMode ? "#111b21" : "#ffffff",
              borderLeft: "1px solid " + (isDarkMode ? "#222d34" : "#ddd"),
              display: "flex",
              flexDirection: "column",
              height: "100%",
              animation: "slideIn 0.3s ease-out"
            }}
          >
            <div
              style={{
                padding: "16px",
                height: "60px",
                backgroundColor: isDarkMode ? "#202c33" : "#f0f2f5",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                color: isDarkMode ? "#e9edef" : "black"
              }}
            >
              <span style={{ cursor: "pointer", fontSize: "20px" }} onClick={() => setShowInfo(false)}>✕</span>
              <strong style={{ fontSize: "16px" }}>Info. del contacto</strong>
            </div>

            <div style={{ flex: 1, overflowY: "auto", backgroundColor: isDarkMode ? "#0b141a" : "#f0f2f5" }}>
              <div style={{ backgroundColor: isDarkMode ? "#111b21" : "white", padding: "28px 0", textAlign: "center", marginBottom: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                <img
                  src={currentChat?.avatar}
                  alt={currentChat?.name}
                  onClick={() => setShowFullImage(true)}
                  style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover", cursor: "pointer", marginBottom: "20px" }}
                />

                <div style={{ padding: "0 30px" }}>
                  {editingName ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                      <input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        style={{ 
                          fontSize: "24px", textAlign: "center", borderBottom: "2px solid #00a884",
                          backgroundColor: "transparent", color: isDarkMode ? "white" : "black", borderTop: "none", borderLeft: "none", borderRight: "none", outline: "none", width: "100%"
                        }}
                      />
                      <span style={{ cursor: "pointer", color: "#00a884", fontSize: "20px" }} onClick={confirmNameChange}>✔</span>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                      <h2 style={{ fontSize: "24px", fontWeight: "400", color: isDarkMode ? "#e9edef" : "#111b21" }}>{currentChat?.name}</h2>
                      <span style={{ cursor: "pointer" }} onClick={() => setEditingName(true)}>
                        <EditIcon size={20} color="#8696a0" />
                      </span>
                    </div>
                  )}
                  <p style={{ color: "#8696a0", marginTop: "4px", fontSize: "16px" }}>{currentChat?.phone}</p>
                </div>
              </div>

              <div style={{ backgroundColor: isDarkMode ? "#111b21" : "white", padding: "20px 30px", marginBottom: "10px" }}>
                <span style={{ color: "#8696a0", fontSize: "14px" }}>Info.</span>
                <p style={{ color: isDarkMode ? "#e9edef" : "#111b21", marginTop: "10px" }}>¡Disponible!</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE IMAGEN FULLSCREEN */}
      {showFullImage && (
        <div
          onClick={() => setShowFullImage(false)}
          style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10000
          }}
        >
          <img
            src={currentChat?.avatar}
            alt={currentChat?.name}
            style={{ maxWidth: "80%", maxHeight: "80%", borderRadius: "10px", boxShadow: "0 0 20px rgba(0,0,0,0.5)" }}
          />
        </div>
      )}
    </>
  )
}

export default ChatDetail;