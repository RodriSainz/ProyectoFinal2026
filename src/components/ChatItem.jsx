import { Link } from "react-router-dom"

function ChatItem({ chat }) {
  return (
    <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to={`/chat/${chat.id}`} style={{ textDecoration: "none", color: "black" }}>
        {chat.name}
      </Link>
    </div>
  )
}

export default ChatItem