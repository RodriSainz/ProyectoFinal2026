import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import ChatDetail from "./ChatDetail";
import Estados from "./Estados";
import Configuracion from "../components/Configuracion";
import Perfil from "../components/Perfil";
import "../Styles/layout.css";

import messi from "../assets/avatars/messi.jpg";
import taylor from "../assets/avatars/taylor.jpg";
import alonso from "../assets/avatars/alonso.jpg";
import duki from "../assets/avatars/duki.jpg";
import biza from "../assets/avatars/biza.jpg";

function Chats() {
  const { user, userPhoto } = useContext(UserContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("chats");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("dark_mode");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("dark_mode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const initialChats = [
    {
      id: 1,
      name: "Lionel Messi",
      avatar: messi,
      phone: "+54 9 11 4832-9123",
      messages: [
        { sender: "Lionel Messi", text: "¿Entrenamos hoy?", time: "14:10" },
        {
          sender: user,
          text: "Dale, metemos gimnasio primero?",
          time: "14:12",
          status: 'read'
        },
        {
          sender: "Lionel Messi",
          text: "Sí, y después fútbol ⚽",
          time: "14:14",
        },
      ],
    },
    {
      id: 2,
      name: "Taylor Swift",
      avatar: taylor,
      phone: "+54 9 11 6721-5544",
      messages: [
        {
          sender: "Taylor Swift",
          text: "Estoy terminando una canción nueva 🎵",
          time: "11:05",
        },
        { sender: user, text: "Es pop o más indie?", time: "11:06", status: 'read' },
        {
          sender: "Taylor Swift",
          text: "Tiene vibes de folklore ✨",
          time: "11:08",
        },
      ],
    },
    {
      id: 3,
      name: "Alonso",
      avatar: alonso,
      phone: "+54 9 11 3398-2210",
      messages: [
        { sender: "Alonso", text: "Estoy en stream ahora 🎮", time: "10:00" },
        { sender: user, text: "Rankeadas o chill?", time: "10:02", status: 'read' },
        { sender: "Alonso", text: "Full competitivo hoy 🔥", time: "10:04" },
      ],
    },
    {
      id: 4,
      name: "Duki",
      avatar: duki,
      phone: "+54 9 11 5901-7782",
      messages: [
        {
          sender: "Duki",
          text: "Sale tema nuevo esta noche 🎤",
          time: "16:01",
        },
        { sender: user, text: "Con videoclip?", time: "16:03", status: 'read' },
        { sender: "Duki", text: "Obvio, bien trap oscuro 😈", time: "16:05" },
      ],
    },
    {
      id: 5,
      name: "Bizarrap",
      avatar: biza,
      phone: "+54 9 11 7420-6631",
      messages: [
        {
          sender: "Bizarrap",
          text: "Tengo una session lista 🔥",
          time: "09:20",
        },
        { sender: user, text: "¿Argentina o internacional?", time: "09:21", status: 'read' },
        { sender: "Bizarrap", text: "No puedo decir nada 😏", time: "09:23" },
      ],
    },
  ];

  const [chatsData, setChatsData] = useState(() => {
    const saved = localStorage.getItem("whatsapp_chats");
    if (!saved) return initialChats;
    const parsed = JSON.parse(saved);
    return parsed.filter((chat) => chat.name !== "Grupo Mundial 🏆");
  });

  useEffect(() => {
    localStorage.setItem("whatsapp_chats", JSON.stringify(chatsData));
  }, [chatsData]);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const sortedChats = [...chatsData].sort((a, b) => {
    const lastA = a.messages?.[a.messages.length - 1]?.time || "";
    const lastB = b.messages?.[b.messages.length - 1]?.time || "";
    return lastB.localeCompare(lastA);
  });

  const filteredChats = sortedChats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* ADAPTACIÓN: Agregamos la clase dinámica para móviles */}
      <div className={`whatsapp-container ${id ? "has-selected-chat" : ""}`}>
        
        {/* Agregamos la clase tab-bar para la animación horizontal */}
        <div className="left-menu tab-bar">
          <div className="menu-top">
            <div
              className={`menu-icon ${activeSection === "chats" ? "active" : ""}`}
              onClick={() => setActiveSection("chats")}
              title="Chats"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.0002 6.66667C22.0002 5.19391 20.8062 4 19.3335 4H1.79015C1.01286 4 0.540213 4.86348 0.940127 5.53L3.00016 9V17.3333C3.00016 18.8061 4.19406 20 5.66682 20H19.3335C20.8062 20 22.0002 18.8061 22.0002 17.3333V6.66667ZM7.00016 10C7.00016 9.44772 7.44787 9 8.00016 9H17.0002C17.5524 9 18.0002 9.44772 18.0002 10C18.0002 10.5523 17.5524 11 17.0002 11H8.00016C7.44787 11 7.00016 10.5523 7.00016 10ZM8.00016 13C7.44787 13 7.00016 13.4477 7.00016 14C7.00016 14.5523 7.44787 15 8.00016 15H14.0002C14.5524 15 15.0002 14.5523 15.0002 14C15.0002 13.4477 14.5524 13 14.0002 13H8.00016Z"
                />
              </svg>
            </div>

            <div
              className={`menu-icon ${activeSection === "estados" ? "active" : ""}`}
              onClick={() => setActiveSection("estados")}
              title="Estados"
            >
              <svg
                viewBox="0 0 24 24"
                height="24"
                width="24"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
              >
                <title>status-refreshed</title>
                <path
                  d="M13.5628 3.13661C13.6587 2.59272 14.1794 2.22464 14.711 2.37436C15.7905 2.6784 16.8135 3.16254 17.736 3.80856C18.9323 4.64623 19.9305 5.73573 20.6606 7.00048C21.3907 8.26524 21.8349 9.67455 21.962 11.1294C22.0601 12.2513 21.9677 13.3794 21.6911 14.4662C21.5549 15.0014 20.9758 15.2682 20.4568 15.0792C19.9378 14.8903 19.677 14.317 19.7998 13.7785C19.9843 12.9693 20.0422 12.1343 19.9696 11.3035C19.8679 10.1396 19.5126 9.01217 18.9285 8.00036C18.3444 6.98856 17.5458 6.11696 16.5888 5.44682C15.9057 4.96842 15.1536 4.60099 14.3606 4.35609C13.8329 4.19312 13.4669 3.6805 13.5628 3.13661Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M18.8944 17.785C19.3175 18.14 19.3759 18.7749 18.9804 19.1604C18.1774 19.9433 17.2466 20.5872 16.2259 21.0631C14.9023 21.6802 13.4597 22 11.9993 21.9999C10.5389 21.9998 9.09633 21.6798 7.77287 21.0625C6.7522 20.5864 5.82149 19.9424 5.01855 19.1594C4.62314 18.7739 4.68167 18.1389 5.10479 17.784C5.52792 17.4291 6.15484 17.4898 6.55976 17.8654C7.16828 18.4298 7.86245 18.8974 8.61829 19.25C9.67707 19.7438 10.8312 19.9998 11.9994 19.9999C13.1677 20 14.3218 19.7442 15.3807 19.2505C16.1366 18.898 16.8308 18.4304 17.4394 17.8661C17.8444 17.4906 18.4713 17.43 18.8944 17.785Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M3.54277 15.0781C3.02379 15.267 2.4447 15.0001 2.30857 14.4649C2.03215 13.3781 1.9399 12.2501 2.03806 11.1283C2.16533 9.6736 2.60965 8.26443 3.33978 6.99982C4.06991 5.73521 5.06815 4.64585 6.26432 3.8083C7.1868 3.16239 8.20975 2.67832 9.28915 2.37433C9.82075 2.22461 10.3414 2.59269 10.4373 3.13659C10.5332 3.68048 10.1672 4.1931 9.6395 4.35605C8.84657 4.60092 8.09458 4.9683 7.41146 5.44662C6.45452 6.11666 5.65593 6.98815 5.07183 7.99983C4.48772 9.01152 4.13226 10.1389 4.03045 11.3026C3.95776 12.1334 4.01559 12.9683 4.19998 13.7774C4.3227 14.3159 4.06175 14.8892 3.54277 15.0781Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0001 16C14.2092 16 16.0001 14.2091 16.0001 12C16.0001 9.79086 14.2092 8 12.0001 8C9.79092 8 8.00006 9.79086 8.00006 12C8.00006 14.2091 9.79092 16 12.0001 16ZM12.0001 18C15.3138 18 18.0001 15.3137 18.0001 12C18.0001 8.68629 15.3138 6 12.0001 6C8.68635 6 6.00006 8.68629 6.00006 12C6.00006 15.3137 8.68635 18 12.0001 18Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            <div
              className={`menu-icon ${activeSection === "comunidades" ? "active" : ""}`}
              onClick={() => setActiveSection("comunidades")}
              title="Comunidades"
            >
              <svg
                viewBox="0 0 32 32"
                height="32"
                width="32"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
              >
                <title>community-refreshed-32</title>
                <path
                  d="M7.85445 17.0075C7.73851 17.0026 7.62033 17 7.50003 17C6.60797 17 5.83268 17.1426 5.22106 17.3148C4.69554 17.4627 4.0988 17.7054 3.5974 18.0919C3.08634 18.4858 2.62143 19.0755 2.52966 19.8877C2.48679 20.2672 2.50003 21.0796 2.51038 21.5399C2.52882 22.3601 3.20095 23 4.00656 23H7.35217C7.15258 22.5784 7.03459 22.1084 7.01993 21.6087C7.01572 21.4651 7.00943 21.25 7.00505 21H4.50165C4.49773 20.6191 4.50034 20.2599 4.51702 20.1123C4.5308 19.9903 4.59776 19.846 4.81844 19.6759C5.04878 19.4983 5.38363 19.3468 5.7631 19.2399C6.12883 19.137 6.57191 19.0478 7.07407 19.0142C7.12499 18.6798 7.20695 18.3652 7.31207 18.0721C7.45559 17.6719 7.64219 17.3186 7.85445 17.0075Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M24.6478 23H27.9935C28.7991 23 29.4712 22.3601 29.4897 21.5399C29.5 21.0796 29.5133 20.2672 29.4704 19.8877C29.3786 19.0755 28.9137 18.4858 28.4027 18.0919C27.9013 17.7054 27.3045 17.4627 26.779 17.3148C26.1674 17.1426 25.3921 17 24.5 17C24.3797 17 24.2615 17.0026 24.1456 17.0075C24.3578 17.3186 24.5444 17.6719 24.6879 18.0721C24.793 18.3652 24.875 18.6798 24.9259 19.0142C25.4281 19.0478 25.8712 19.1369 26.237 19.2399C26.6164 19.3468 26.9513 19.4983 27.1816 19.6759C27.4023 19.846 27.4693 19.9903 27.483 20.1123C27.4997 20.2599 27.5023 20.6191 27.4984 21H24.9949C24.9906 21.25 24.9843 21.4651 24.9801 21.6087C24.9654 22.1084 24.8474 22.5784 24.6478 23Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 18C14.6099 18 13.4517 18.2363 12.6506 18.4683C12.2195 18.5931 11.8437 18.7329 11.5552 18.9105C11.275 19.0829 11.1382 19.2525 11.0772 19.4224C11.0547 19.4853 11.0366 19.5555 11.0259 19.6343C10.9955 19.8585 10.996 20.4459 11.0064 21H20.9936C21.004 20.4459 21.0045 19.8585 20.9741 19.6343C20.9634 19.5555 20.9453 19.4853 20.9228 19.4224C20.8618 19.2525 20.725 19.0829 20.4448 18.9105C20.1563 18.7329 19.7805 18.5931 19.3494 18.4683C18.5483 18.2363 17.3901 18 16 18ZM12.0944 16.5472C13.0378 16.274 14.3855 16 16 16C17.6145 16 18.9622 16.274 19.9056 16.5472C20.392 16.688 20.9732 16.8873 21.493 17.2071C22.0211 17.532 22.5438 18.0181 22.8053 18.7473C22.8735 18.9373 22.9259 19.1436 22.956 19.3657C23.0234 19.8633 22.9976 20.9826 22.9809 21.5501C22.957 22.3659 22.287 23 21.4851 23H10.5149C9.71301 23 9.043 22.3659 9.01907 21.5501C9.00243 20.9826 8.97657 19.8633 9.04404 19.3657C9.07414 19.1436 9.1265 18.9373 9.19466 18.7473C9.45616 18.0181 9.97894 17.532 10.507 17.2071C11.0268 16.8873 11.608 16.688 12.0944 16.5472Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24.5 12C23.9477 12 23.5 12.4477 23.5 13C23.5 13.5523 23.9477 14 24.5 14C25.0523 14 25.5 13.5523 25.5 13C25.5 12.4477 25.0523 12 24.5 12ZM21.5 13C21.5 11.3431 22.8431 10 24.5 10C26.1569 10 27.5 11.3431 27.5 13C27.5 14.6569 26.1569 16 24.5 16C22.8431 16 21.5 14.6569 21.5 13Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 9C14.8954 9 14 9.89543 14 11C14 12.1046 14.8954 13 16 13C17.1046 13 18 12.1046 18 11C18 9.89543 17.1046 9 16 9ZM12 11C12 8.79086 13.7909 7 16 7C18.2091 7 20 8.79086 20 11C20 13.2091 18.2091 15 16 15C13.7909 15 12 13.2091 12 11Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.5 12C6.94772 12 6.5 12.4477 6.5 13C6.5 13.5523 6.94772 14 7.5 14C8.05228 14 8.5 13.5523 8.5 13C8.5 12.4477 8.05228 12 7.5 12ZM4.5 13C4.5 11.3431 5.84315 10 7.5 10C9.15685 10 10.5 11.3431 10.5 13C10.5 14.6569 9.15685 16 7.5 16C5.84315 16 4.5 14.6569 4.5 13Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <div className="menu-bottom">
            <div
              className="menu-icon"
              onClick={() => setDarkMode((prev) => !prev)}
              title="Modo oscuro"
            >
              {darkMode ? "☀️" : "🌙"}
            </div>

            <div
              className={`menu-icon ${activeSection === "configuracion" ? "active" : ""}`}
              onClick={() => setActiveSection("configuracion")}
              title="Configuración"
            >
              <svg
                viewBox="0 0 24 24"
                height="24"
                width="24"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
              >
                <title>settings-refreshed</title>
                <path
                  d="M10.825 22C10.375 22 9.98748 21.85 9.66248 21.55C9.33748 21.25 9.14165 20.8833 9.07498 20.45L8.84998 18.8C8.63331 18.7167 8.42915 18.6167 8.23748 18.5C8.04581 18.3833 7.85831 18.2583 7.67498 18.125L6.12498 18.775C5.70831 18.9583 5.29165 18.975 4.87498 18.825C4.45831 18.675 4.13331 18.4083 3.89998 18.025L2.72498 15.975C2.49165 15.5917 2.42498 15.1833 2.52498 14.75C2.62498 14.3167 2.84998 13.9583 3.19998 13.675L4.52498 12.675C4.50831 12.5583 4.49998 12.4458 4.49998 12.3375V11.6625C4.49998 11.5542 4.50831 11.4417 4.52498 11.325L3.19998 10.325C2.84998 10.0417 2.62498 9.68333 2.52498 9.25C2.42498 8.81667 2.49165 8.40833 2.72498 8.025L3.89998 5.975C4.13331 5.59167 4.45831 5.325 4.87498 5.175C5.29165 5.025 5.70831 5.04167 6.12498 5.225L7.67498 5.875C7.85831 5.74167 8.04998 5.61667 8.24998 5.5C8.44998 5.38333 8.64998 5.28333 8.84998 5.2L9.07498 3.55C9.14165 3.11667 9.33748 2.75 9.66248 2.45C9.98748 2.15 10.375 2 10.825 2H13.175C13.625 2 14.0125 2.15 14.3375 2.45C14.6625 2.75 14.8583 3.11667 14.925 3.55L15.15 5.2C15.3666 5.28333 15.5708 5.38333 15.7625 5.5C15.9541 5.61667 16.1416 5.74167 16.325 5.875L17.875 5.225C18.2916 5.04167 18.7083 5.025 19.125 5.175C19.5416 5.325 19.8666 5.59167 20.1 5.975L21.275 8.025C21.5083 8.40833 21.575 8.81667 21.475 9.25C21.375 9.68333 21.15 10.0417 20.8 10.325L19.475 11.325C19.4916 11.4417 19.5 11.5542 19.5 11.6625V12.3375C19.5 12.4458 19.4833 12.5583 19.45 12.675L20.775 13.675C21.125 13.9583 21.35 14.3167 21.45 14.75C21.55 15.1833 21.4833 15.5917 21.25 15.975L20.05 18.025C19.8166 18.4083 19.4916 18.675 19.075 18.825C18.6583 18.975 18.2416 18.9583 17.825 18.775L16.325 18.125C16.1416 18.2583 15.95 18.3833 15.75 18.5C15.55 18.6167 15.35 18.7167 15.15 18.8L14.925 20.45C14.8583 20.8833 14.6625 21.25 14.3375 21.55C14.0125 21.85 13.625 22 13.175 22H10.825ZM11 20H12.975L13.325 17.35C13.8416 17.2167 14.3208 17.0208 14.7625 16.7625C15.2041 16.5042 15.6083 16.1917 15.975 15.825L18.45 16.85L19.425 15.15L17.275 13.525C17.3583 13.2917 17.4166 13.0458 17.45 12.7875C17.4833 12.5292 17.5 12.2667 17.5 12C17.5 11.7333 17.4833 11.4708 17.45 11.2125C17.4166 10.9542 17.45 10.7083 17.275 10.475L19.425 8.85L18.45 7.15L15.975 8.2C15.6083 7.81667 15.2041 7.49583 14.7625 7.2375C14.3208 6.97917 13.8416 6.78333 13.325 6.65L13 4H11.025L10.675 6.65C10.1583 6.78333 9.67915 6.97917 9.23748 7.2375C8.79581 7.49583 8.39165 7.80833 8.02498 8.175L5.54998 7.15L4.57498 8.85L6.72498 10.45C6.64165 10.7 6.58331 10.95 6.54998 11.2C6.51665 11.45 6.49998 11.7167 6.49998 12C6.49998 12.2667 6.51665 12.525 6.54998 12.775C6.58331 13.025 6.64165 13.275 6.72498 13.525L4.57498 15.15L5.54998 16.85L8.02498 15.8C8.39165 16.1833 8.79581 16.5042 9.23748 16.7625C9.67915 17.0208 10.1583 17.2167 10.675 17.35L11 20Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 13.5C12.4364 13.5 12.7527 13.3689 13.0608 13.0608C13.3689 12.7527 13.5 12.4364 13.5 12C13.5 11.5636 13.3689 11.2473 13.0608 10.9392C12.7527 10.6311 12.4364 10.5 12 10.5C11.5371 10.5 11.2247 10.6376 10.9354 10.9305C10.6328 11.2368 10.5 11.5557 10.5 12C10.5 12.4443 10.6328 12.7632 10.9354 13.0695C11.2247 13.3624 11.5371 13.5 12 13.5ZM14.475 14.475C13.7917 15.1583 12.9667 15.5 12 15.5C11.0167 15.5 10.1875 15.1583 9.5125 14.475C8.8375 13.7917 8.5 12.9667 8.5 12C8.5 11.0333 8.8375 10.2083 9.5125 9.525C10.1875 8.84167 11.0167 8.5 12 8.5C12.9667 8.5 13.7917 8.84167 14.475 9.525C15.1583 10.2083 15.5 11.0333 15.5 12C15.5 12.9667 15.1583 13.7917 14.475 14.475Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div
              className="profile-pic"
              onClick={() => setActiveSection("perfil")}
              style={{ cursor: "pointer" }}
            >
              <img src={userPhoto} alt="perfil" />
            </div>
          </div>
        </div>

        <div className="sidebar">
          {activeSection === "chats" && (
            <>
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
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ overflowY: "auto", flex: 1 }}>
                {filteredChats.map((chat) => (
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
                        objectFit: "cover",
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <strong>{chat.name}</strong>
                      </div>

                      {(() => {
                        const lastMessage =
                          chat.messages?.[chat.messages.length - 1];

                        return (
                          <>
                            <span
                              style={{ fontSize: "0.75rem", color: "#667781" }}
                            >
                              {lastMessage?.time}
                            </span>
                            <br />
                            <span
                              style={{ 
                                fontSize: "0.85rem", 
                                color: "#667781",
                                display: "flex",
                                alignItems: "center"
                              }}
                            >
                              {lastMessage?.sender === user && (
                                <span style={{ 
                                  color: lastMessage?.status === 'read' ? '#53bdeb' : '#8696a0', 
                                  marginRight: '4px',
                                  fontWeight: 'bold'
                                }}>
                                  {lastMessage?.status === 'read' ? '✓✓' : '✓'}
                                </span>
                              )}
                              {lastMessage?.text}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSection === "estados" && <Estados />}

          {activeSection === "comunidades" && (
            <div style={{ padding: "2rem" }}>
              <h2>Comunidades</h2>
              <p>Sección en construcción 🚧</p>
            </div>
          )}

          {activeSection === "configuracion" && (
            <Configuracion irAPerfil={() => setActiveSection("perfil")} />
          )}

          {activeSection === "perfil" && (
            <Perfil volver={() => setActiveSection("chats")} />
          )}
        </div>

        <div className="chat-area">
          {activeSection === "chats" && id ? (
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              {/* ADAPTACIÓN: Flecha para volver en móviles dentro del área de chat */}
              <div className="mobile-back-button" style={{ padding: "10px", display: "none" }}>
                <button 
                  onClick={() => navigate("/chats")}
                  style={{ 
                    background: "none", 
                    border: "none", 
                    fontSize: "24px", 
                    cursor: "pointer",
                    color: "#667781"
                  }}
                >
                  ←
                </button>
              </div>
              <ChatDetail chatsData={chatsData} setChatsData={setChatsData} />
            </div>
          ) : (
            <div style={{ margin: "auto", color: "#667781" }}>
              {activeSection === "chats"
                ? "Seleccioná un chat"
                : "Seleccioná una opción del menú"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chats;