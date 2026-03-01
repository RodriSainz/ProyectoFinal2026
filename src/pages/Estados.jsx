import { useState, useRef, useContext } from "react";
import { UserContext } from "../context/UserContext";

import messi from "../assets/avatars/messi.jpg";
import taylor from "../assets/avatars/taylor.jpg";
import alonso from "../assets/avatars/alonso.jpg";
import duki from "../assets/avatars/duki.jpg";
import biza from "../assets/avatars/biza.jpg";

import messi1 from "../assets/status/messi1.mp4";
import duki1 from "../assets/status/duki1.jpg";
import biza1 from "../assets/status/biza1.jpg";
import alonso1 from "../assets/status/alonso1.jpg";
import alonso2 from "../assets/status/alonso2.mp4";
import taylor1 from "../assets/status/taylor1.jpg";
import taylor2 from "../assets/status/taylor2.jpg";

function Estados() {
  const { userPhoto } = useContext(UserContext);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const contactosMock = [
    { id: 1, nombre: "Taylor Swift", avatar: taylor },
    { id: 2, nombre: "Alonso", avatar: alonso },
    { id: 3, nombre: "Duki", avatar: duki },
    { id: 4, nombre: "Bizarrap", avatar: biza },
    { id: 5, nombre: "Lionel Messi", avatar: messi },
  ];

  const [misEstados, setMisEstados] = useState([]);
  const [estadosContactos, setEstadosContactos] = useState(
    contactosMock.flatMap((c) => {
      if (c.nombre === "Taylor Swift") {
        return [
          {
            id: Date.now() + Math.random(),
            usuario: c.nombre,
            avatar: c.avatar,
            visto: false,
            tipo: "imagen",
            contenido: taylor1,
          },
          {
            id: Date.now() + Math.random(),
            usuario: c.nombre,
            avatar: c.avatar,
            visto: false,
            tipo: "imagen",
            contenido: taylor2,
          },
        ];
      }

      if (c.nombre === "Alonso") {
        return [
          {
            id: Date.now() + Math.random(),
            usuario: c.nombre,
            avatar: c.avatar,
            visto: false,
            tipo: "imagen",
            contenido: alonso1,
          },
          {
            id: Date.now() + Math.random(),
            usuario: c.nombre,
            avatar: c.avatar,
            visto: false,
            tipo: "video",
            contenido: alonso2,
          },
        ];
      }

      if (c.nombre === "Duki") {
        return [
          {
            id: Date.now() + Math.random(),
            usuario: c.nombre,
            avatar: c.avatar,
            visto: false,
            tipo: "imagen",
            contenido: duki1,
          },
        ];
      }

      if (c.nombre === "Bizarrap") {
        return [
          {
            id: Date.now() + Math.random(),
            usuario: c.nombre,
            avatar: c.avatar,
            visto: false,
            tipo: "imagen",
            contenido: biza1,
          },
        ];
      }

      if (c.nombre === "Lionel Messi") {
        return [
          {
            id: Date.now() + Math.random(),
            usuario: c.nombre,
            avatar: c.avatar,
            visto: false,
            tipo: "video",
            contenido: messi1,
          },
        ];
      }

      return [];
    }),
  );

  const [visorIndex, setVisorIndex] = useState(null);
  const [progreso, setProgreso] = useState(0);
  const [preview, setPreview] = useState(null);
  const [comentario, setComentario] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [pausado, setPausado] = useState(false);

  const estadosOrdenados = [...misEstados, ...estadosContactos];

  const abrirSelector = () => inputRef.current.click();

  const subirEstado = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview({
        tipo: file.type.startsWith("video") ? "video" : "imagen",
        contenido: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const publicar = () => {
    if (!preview) return;

    const nuevo = {
      id: Date.now(),
      usuario: "Yo",
      avatar: userPhoto || messi,
      visto: false,
      ...preview,
      comentario,
    };

    setMisEstados([nuevo, ...misEstados]);
    setPreview(null);
    setComentario("");
  };

  const iniciarBarra = () => {
    clearInterval(timerRef.current);
    let value = 0;

    timerRef.current = setInterval(() => {
      if (pausado) return;
      value += 2;
      setProgreso(value);
      if (value >= 100) siguienteEstado();
    }, 100);
  };

  const abrirEstado = (index) => {
    setVisorIndex(index);
    setProgreso(0);
    setMenuAbierto(false);

    if (index >= misEstados.length) {
      const contactoIndex = index - misEstados.length;
      setEstadosContactos((prev) =>
        prev.map((e, i) => (i === contactoIndex ? { ...e, visto: true } : e)),
      );
    }

    iniciarBarra();
  };

  const cerrarVisor = () => {
    clearInterval(timerRef.current);
    setVisorIndex(null);
    setProgreso(0);
    setMenuAbierto(false);
  };

  const siguienteEstado = () => {
    if (visorIndex === estadosOrdenados.length - 1) {
      cerrarVisor();
    } else {
      abrirEstado(visorIndex + 1);
    }
  };

  const anteriorEstado = () => {
    if (visorIndex > 0) abrirEstado(visorIndex - 1);
  };

  const eliminarMiEstado = () => {
    const id = estadosOrdenados[visorIndex].id;
    setMisEstados((prev) => prev.filter((e) => e.id !== id));
    cerrarVisor();
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>Estados</h2>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        style={{ display: "none" }}
        onChange={subirEstado}
      />

      {preview && (
        <div style={{ marginBottom: "2rem" }}>
          {preview.tipo === "video" ? (
            <video src={preview.contenido} controls width="300" />
          ) : (
            <img src={preview.contenido} width="300" alt="preview" />
          )}

          <input
            placeholder="Agregar comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            style={{ marginTop: 10, width: "100%", padding: 8 }}
          />

          <button
            onClick={publicar}
            style={{
              marginTop: 10,
              padding: "8px 16px",
              background: "#25D366",
              border: "none",
              color: "white",
              borderRadius: 20,
              cursor: "pointer",
            }}
          >
            Publicar
          </button>
        </div>
      )}

      {/* MI ESTADO */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
          marginBottom: "2rem",
          cursor: "pointer",
        }}
        onClick={() => misEstados[0] && abrirEstado(0)}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: misEstados.length
              ? "0 0 0 3px #25D366"
              : "0 0 0 3px #ccc",
          }}
        >
          <img
            src={userPhoto || messi}
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        <div>
          <strong>Mi estado</strong>
        </div>

        <div
          style={{ marginLeft: "auto", fontSize: 26 }}
          onClick={(e) => {
            e.stopPropagation();
            abrirSelector();
          }}
        >
          ＋
        </div>
      </div>

      {/* CONTACTOS */}
      {Array.from(
        new Map(estadosContactos.map((e) => [e.usuario, e])).values(),
      ).map((estadoUnico) => {
        const primerIndex = estadosContactos.findIndex(
          (e) => e.usuario === estadoUnico.usuario,
        );

        return (
          <div
            key={estadoUnico.usuario}
            onClick={() => abrirEstado(primerIndex + misEstados.length)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
              marginBottom: "1.5rem",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: estadosContactos
                  .filter((e) => e.usuario === estadoUnico.usuario)
                  .every((e) => e.visto)
                  ? "0 0 0 3px #aaa"
                  : "0 0 0 3px #25D366",
              }}
            >
              <img
                src={estadoUnico.avatar}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div>
              <strong>{estadoUnico.usuario}</strong>
            </div>
          </div>
        );
      })}

      {/* VISOR */}
      {visorIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onMouseDown={() => setPausado(true)}
          onMouseUp={() => setPausado(false)}
        >
          {/* BARRAS MULTIPLES CON ANIMACION */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 20,
              right: 20,
              display: "flex",
              gap: 5,
            }}
          >
            {(() => {
              const estadosDelUsuario = estadosOrdenados.filter(
                (e) => e.usuario === estadosOrdenados[visorIndex].usuario,
              );

              const indicesUsuario = estadosOrdenados
                .map((e, idx) =>
                  e.usuario === estadosOrdenados[visorIndex].usuario
                    ? idx
                    : null,
                )
                .filter((i) => i !== null);

              const posicionActual = indicesUsuario.indexOf(visorIndex);

              return estadosDelUsuario.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 3,
                    background: "rgba(255,255,255,0.3)",
                    borderRadius: 2,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Ya vistos */}
                  {i < posicionActual && (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "white",
                      }}
                    />
                  )}

                  {/* Activo (animado) */}
                  {i === posicionActual && (
                    <div
                      style={{
                        width: `${progreso}%`,
                        height: "100%",
                        background: "white",
                        transition: "width 0.1s linear",
                      }}
                    />
                  )}
                </div>
              ));
            })()}
          </div>

          {/* HEADER USUARIO */}
          <div
            style={{
              position: "absolute",
              top: 25,
              left: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "white",
            }}
          >
            <img
              src={estadosOrdenados[visorIndex].avatar}
              style={{ width: 35, height: 35, borderRadius: "50%" }}
            />
            <strong>{estadosOrdenados[visorIndex].usuario}</strong>
          </div>

          {/* Cerrar */}
          <div
            onClick={cerrarVisor}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              fontSize: 30,
              color: "white",
              cursor: "pointer",
            }}
          >
            ✕
          </div>

          {visorIndex < misEstados.length && (
            <>
              <div
                onClick={() => setMenuAbierto((prev) => !prev)}
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  fontSize: 28,
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ⋮
              </div>

              {menuAbierto && (
                <div
                  style={{
                    position: "absolute",
                    top: 60,
                    left: 20,
                    background: "white",
                    color: "black",
                    padding: "10px 15px",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                  onClick={eliminarMiEstado}
                >
                  Eliminar estado
                </div>
              )}
            </>
          )}

          <div
            onClick={anteriorEstado}
            style={{
              position: "absolute",
              left: 20,
              fontSize: 40,
              color: "white",
              cursor: "pointer",
            }}
          >
            ‹
          </div>

          <div
            onClick={siguienteEstado}
            style={{
              position: "absolute",
              right: 20,
              fontSize: 40,
              color: "white",
              cursor: "pointer",
            }}
          >
            ›
          </div>

          {estadosOrdenados[visorIndex].tipo === "video" ? (
            <video
              src={estadosOrdenados[visorIndex].contenido}
              autoPlay
              style={{ maxHeight: "80%" }}
            />
          ) : (
            <img
              src={estadosOrdenados[visorIndex].contenido}
              style={{ maxHeight: "80%" }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Estados;
