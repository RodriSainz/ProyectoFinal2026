import { createContext, useState } from "react"

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUserState] = useState(() => {
    return localStorage.getItem("whatsapp_user") || null
  })

  const setUser = (name) => {
    localStorage.setItem("whatsapp_user", name)
    setUserState(name)
  }

  const logout = () => {
    localStorage.removeItem("whatsapp_user")
    setUserState(null)
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}