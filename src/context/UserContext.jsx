import { createContext, useState, useEffect } from "react"
import messi from "../assets/avatars/messi.jpg"

export const UserContext = createContext()

export function UserProvider({ children }) {

  const [user, setUser] = useState("Usuario")

  const [userPhoto, setUserPhoto] = useState(
    localStorage.getItem("user_photo") || messi
  )

  const [userStatus, setUserStatus] = useState(
    localStorage.getItem("user_status") || "Disponible"
  )

  // 🔥 SINCRONIZA FOTO
  useEffect(() => {
    localStorage.setItem("user_photo", userPhoto)
  }, [userPhoto])

  // 🔥 SINCRONIZA ESTADO
  useEffect(() => {
    localStorage.setItem("user_status", userStatus)
  }, [userStatus])

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      userPhoto,
      setUserPhoto,
      userStatus,
      setUserStatus
    }}>
      {children}
    </UserContext.Provider>
  )
}