// src/components/Home.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { get } from "idb-keyval"; // Asegúrate de instalar idb-keyval: npm install idb-keyval

// Simulación de videos por perfil
const videosPorPerfil: Record<
  string,
  {
    id: number;
    title: string;
    url: string;
    thumbnail: string;
    duration: string;
    views: number;
    category: string;
  }[]
> = {
  "1": [
    {
      id: 1,
      title: "Introducción a React Hooks",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      duration: "22:45",
      views: 1245000,
      category: "Tecnología",
    },
    {
      id: 2,
      title: "Diseño UI/UX Moderno",
      url: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
      thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
      duration: "15:22",
      views: 845000,
      category: "Diseño",
    },
    {
      id: 3,
      title: "Tutorial de Animaciones CSS",
      url: "https://www.youtube.com/embed/l482T0yNkeo",
      thumbnail: "https://img.youtube.com/vi/l482T0yNkeo/hqdefault.jpg",
      duration: "30:18",
      views: 2100000,
      category: "Desarrollo",
    },
  ],
  "2": [
    {
      id: 4,
      title: "Fundamentos de TypeScript",
      url: "https://www.youtube.com/embed/9bZkp7q19f0",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
      duration: "12:30",
      views: 3210000,
      category: "Desarrollo",
    },
    {
      id: 5,
      title: "Patrones de Diseño Avanzados",
      url: "https://www.youtube.com/embed/2Vv-BfVoq4g",
      thumbnail: "https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg",
      duration: "28:44",
      views: 1750000,
      category: "Desarrollo",
    },
  ],
  "3": [
    {
      id: 7,
      title: "Arquitectura de Microservicios",
      url: "https://www.youtube.com/embed/fRh_vgS2dFE",
      thumbnail: "https://img.youtube.com/vi/fRh_vgS2dFE/hqdefault.jpg",
      duration: "32:10",
      views: 2890000,
      category: "DevOps",
    },
    {
      id: 8,
      title: "Introducción a GraphQL",
      url: "https://www.youtube.com/embed/60ItHLz5WEA",
      thumbnail: "https://img.youtube.com/vi/60ItHLz5WEA/hqdefault.jpg",
      duration: "14:25",
      views: 1120000,
      category: "Desarrollo",
    },
  ],
};

const perfiles: Record<string, { name: string; avatar: string }> = {
  "1": { name: "Marqueza", avatar: "/images/profile1.png" },
  "2": { name: "Cossio", avatar: "/images/profile2.png" },
  "3": { name: "Rueda", avatar: "/images/profile3.png" },
};

const categorias = [
  { id: "todos", name: "Todos" },
  { id: "desarrollo", name: "Desarrollo" },
  { id: "diseno", name: "Diseño" },
  { id: "devops", name: "DevOps" },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [perfilId, setPerfilId] = useState<number | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [videoModal, setVideoModal] = useState<any | null>(null);
  const [seccion, setSeccion] = useState("inicio"); // inicio, tendencias, milista
  const [miLista, setMiLista] = useState<number[]>([]);

  // Cargar mi lista de favoritos del perfil
  useEffect(() => {
    const id = localStorage.getItem("selectedProfile");
    if (!id) return;
    const lista = JSON.parse(localStorage.getItem(`miLista_${id}`) || "[]");
    setMiLista(lista);
  }, []);

  // Filtrar videos según búsqueda, categoría y sección
  const videosFiltrados = videos.filter((video) => {
    const coincideBusqueda = video.title
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaActiva === "todos" ||
      (video.category && video.category.toLowerCase() === categoriaActiva);
    let coincideSeccion = true;
    if (seccion === "tendencias") {
      // Top 5 más vistos
      return false; // filtramos después
    }
    if (seccion === "milista") {
      coincideSeccion = miLista.includes(video.id);
    }
    return coincideBusqueda && coincideCategoria && coincideSeccion;
  });
  // Si es tendencias, top 5 más vistos
  const videosTendencias =
    seccion === "tendencias"
      ? [...videos].sort((a, b) => b.views - a.views).slice(0, 5)
      : [];

  useEffect(() => {
    const id = localStorage.getItem("selectedProfile");
    if (!id) {
      navigate("/profiles");
      return;
    }
    setPerfilId(Number(id));
    // Leer videos subidos
    const uploadedVideos = JSON.parse(
      localStorage.getItem("uploadedVideos") || "[]"
    );
    // Para cada video subido, si es un video local, obtener el blob de IndexedDB
    const cargarVideos = async () => {
      const videosConUrl = await Promise.all(
        uploadedVideos.map(async (video: any) => {
          if (video.uploaded && video.url) {
            try {
              const blob = await get(video.url);
              if (blob) {
                const blobUrl = URL.createObjectURL(blob);
                return { ...video, url: blobUrl };
              }
            } catch (e) {
              /* ignorar */
            }
          }
          return video;
        })
      );
      const todosVideos = [...(videosPorPerfil[id] || []), ...videosConUrl];
      setVideos(todosVideos);
    };
    cargarVideos();
    // Cargar mi lista de favoritos
    const lista = JSON.parse(localStorage.getItem(`miLista_${id}`) || "[]");
    setMiLista(lista);
  }, [navigate, videoModal]);

  // Añadir o quitar de mi lista
  const toggleMiLista = (videoId: number) => {
    if (!perfilId) return;
    let nuevaLista = [...miLista];
    if (miLista.includes(videoId)) {
      nuevaLista = nuevaLista.filter((id) => id !== videoId);
    } else {
      nuevaLista.push(videoId);
    }
    setMiLista(nuevaLista);
    localStorage.setItem(`miLista_${perfilId}`, JSON.stringify(nuevaLista));
  };

  // Eliminar video subido por el usuario
  const eliminarVideo = (videoId: number) => {
    const uploadedVideos = JSON.parse(
      localStorage.getItem("uploadedVideos") || "[]"
    );
    const nuevos = uploadedVideos.filter((v: any) => v.id !== videoId);
    localStorage.setItem("uploadedVideos", JSON.stringify(nuevos));
    setVideoModal(null);
    // Refrescar lista
    const id = localStorage.getItem("selectedProfile");
    if (id) {
      const todosVideos = [...(videosPorPerfil[id] || []), ...nuevos];
      setVideos(todosVideos);
    }
  };

  if (!perfilId) return null;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Sidebar minimalista */}
      <aside className="sidebar w-20 lg:w-64 h-screen p-2 lg:p-5 flex flex-col items-center border-r border-neutral-800">
        <img
          src={perfiles[String(perfilId)].avatar}
          alt="Avatar"
          className="sidebar-avatar w-12 h-12 lg:w-20 lg:h-20 rounded-full mb-3 lg:mb-6 shadow-lg border-2 border-white"
        />
        <h2 className="text-lg lg:text-xl font-medium mb-4 lg:mb-8 text-center hidden lg:block">
          {perfiles[String(perfilId)].name}
        </h2>
        <button
          className="upload-btn w-full py-2 lg:py-3 rounded-lg mb-4 lg:mb-6 shadow flex items-center justify-center gap-1 lg:gap-2 text-sm lg:text-base"
          onClick={() => navigate("/upload")}
        >
          <span className="text-lg">+</span>
          <span className="hidden lg:inline">Subir video</span>
        </button>
        <nav className="flex flex-col w-full space-y-2 mt-2">
          <button
            className={`text-left flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800 transition-all ${
              seccion === "inicio" ? "bg-neutral-800" : ""
            }`}
            onClick={() => setSeccion("inicio")}
          >
            <span className="text-xl">🏠</span>
            <span className="hidden lg:inline">Inicio</span>
          </button>
          <button
            className={`text-left flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800 transition-all ${
              seccion === "tendencias" ? "bg-neutral-800" : ""
            }`}
            onClick={() => setSeccion("tendencias")}
          >
            <span className="text-xl">🔥</span>
            <span className="hidden lg:inline">Tendencias</span>
          </button>
          <button
            className={`text-left flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800 transition-all ${
              seccion === "milista" ? "bg-neutral-800" : ""
            }`}
            onClick={() => setSeccion("milista")}
          >
            <span className="text-xl">📋</span>
            <span className="hidden lg:inline">Mi lista</span>
          </button>
          <button
            className="text-left flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800 transition-all"
            onClick={() => {
              localStorage.removeItem("selectedProfile");
              navigate("/profiles");
            }}
          >
            <span className="text-xl">🔄</span>
            <span className="hidden lg:inline">Cambiar perfil</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar superior minimalista */}
        <nav className="top-navbar w-full z-50 px-4 lg:px-8 py-3 lg:py-4 flex justify-between items-center border-b border-neutral-800">
          <div className="flex items-center">
            <button className="menu-toggle mr-4 text-2xl lg:hidden">☰</button>
            <img
              src="/logo.png"
              alt="Logo"
              className="h-7 lg:h-9 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="flex space-x-3 lg:space-x-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="px-4 py-2 rounded-full bg-neutral-900 text-white focus:outline-none border border-neutral-700 focus:border-red-600 transition-all duration-200 shadow-sm w-32 lg:w-64 text-sm lg:text-base"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <span className="absolute right-3 top-2.5 text-neutral-400">
                🔍
              </span>
            </div>
            <button className="account-btn px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-neutral-900 border border-neutral-700 shadow flex items-center gap-1 text-sm lg:text-base">
              <span>👤</span>
              <span className="hidden lg:inline">Cuenta</span>
            </button>
          </div>
        </nav>

        {/* Hero destacado - más minimalista */}
        <div className="relative h-[40vh] lg:h-[60vh] flex items-end">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10"></div>
          <img
            src={
              videos[0]?.thumbnail || "https://via.placeholder.com/1920x1080"
            }
            alt="Destacado"
            className="hero-img absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 p-6 lg:p-10 w-full max-w-4xl">
            <h1 className="hero-title mb-4 text-2xl lg:text-5xl font-bold">
              {videos[0]?.title || "Video destacado"}
            </h1>
            <div className="flex gap-3">
              <button
                className="hero-btn flex items-center gap-2 px-6 py-3 rounded-lg text-sm lg:text-base"
                onClick={() => window.open(videos[0]?.url, "_blank")}
              >
                <span className="text-xl">▶</span> Reproducir
              </button>
              <button className="bg-neutral-800 bg-opacity-70 hover:bg-opacity-100 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all text-sm lg:text-base">
                <span className="text-xl">ⓘ</span> Más información
              </button>
            </div>
          </div>
        </div>

        {/* Categorías */}
        <div className="px-4 lg:px-8 py-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex space-x-3">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                className={`px-4 py-2 rounded-full text-sm lg:text-base ${
                  categoriaActiva === categoria.id
                    ? "bg-white text-black font-medium"
                    : "bg-neutral-900 text-gray-300 hover:bg-neutral-800"
                }`}
                onClick={() => setCategoriaActiva(categoria.id)}
              >
                {categoria.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de videos - diseño más limpio */}
        <div className="px-4 lg:px-8 py-4 lg:py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl lg:text-2xl font-bold">
              Recomendados para ti
            </h2>
            {busqueda && (
              <p className="text-neutral-400 text-sm lg:text-base">
                {videosFiltrados.length} resultados
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {(seccion === "tendencias"
              ? videosTendencias
              : videosFiltrados
            ).map((video) => (
              <div
                key={video.id}
                className="video-card cursor-pointer group relative"
                onClick={() => {
                  if (video.uploaded) {
                    setVideoModal(video);
                  } else {
                    window.open(video.url, "_blank");
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 bg-neutral-900 bg-opacity-80 text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>
                  {/* Botón eliminar si es tuyo */}
                  {video.uploaded &&
                    String(video.uploadedBy) === String(perfilId) && (
                      <button
                        className="absolute top-2 right-2 bg-red-700 text-white rounded-full px-2 py-1 text-xs z-10 hover:bg-red-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          eliminarVideo(video.id);
                        }}
                        title="Eliminar video"
                      >
                        🗑
                      </button>
                    )}
                  {/* Botón mi lista */}
                  <button
                    className={`absolute top-2 left-2 rounded-full px-2 py-1 text-xs z-10 ${
                      miLista.includes(video.id)
                        ? "bg-green-600 text-white"
                        : "bg-neutral-700 text-white hover:bg-green-600"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMiLista(video.id);
                    }}
                    title={
                      miLista.includes(video.id)
                        ? "Quitar de mi lista"
                        : "Agregar a mi lista"
                    }
                  >
                    {miLista.includes(video.id) ? "★" : "☆"}
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="text-sm lg:text-base font-semibold mb-1 line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="text-xs text-neutral-400 flex justify-between">
                    <span>{Math.round(video.views / 1000)}K vistas</span>
                    <span>{video.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer minimalista */}
        <footer className="px-4 lg:px-16 py-8 mt-8 bg-neutral-950 text-neutral-500 border-t border-neutral-800 text-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div>
              <h3 className="text-white mb-3">Audio y subtítulos</h3>
              <p className="mb-2">Idiomas</p>
              <p>Subtítulos</p>
            </div>
            <div>
              <h3 className="text-white mb-3">Servicio al cliente</h3>
              <p className="mb-2">Centro de ayuda</p>
              <p>Tarjetas de regalo</p>
            </div>
            <div>
              <h3 className="text-white mb-3">Prensa</h3>
              <p className="mb-2">Relaciones con inversionistas</p>
              <p>Empleo</p>
            </div>
            <div>
              <h3 className="text-white mb-3">Legal</h3>
              <p className="mb-2">Términos de uso</p>
              <p>Privacidad</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>© 2024 StreamVision. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>

      {/* Modal para reproducir el video blob */}
      {videoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-lg p-6 max-w-xl w-full relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setVideoModal(null)}
            >
              ×
            </button>
            <video
              src={videoModal.url}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
            <h2 className="mt-4 text-lg font-bold">{videoModal.title}</h2>
            <p className="text-neutral-400 text-sm mt-2">
              {videoModal.description}
            </p>
            {/* Botón eliminar si es tuyo */}
            {videoModal.uploaded &&
              String(videoModal.uploadedBy) === String(perfilId) && (
                <button
                  className="mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900"
                  onClick={() => eliminarVideo(videoModal.id)}
                >
                  Eliminar video
                </button>
              )}
            {/* Botón mi lista */}
            <button
              className={`mt-4 ml-2 rounded px-4 py-2 ${
                miLista.includes(videoModal.id)
                  ? "bg-green-600 text-white"
                  : "bg-neutral-700 text-white hover:bg-green-600"
              }`}
              onClick={() => toggleMiLista(videoModal.id)}
            >
              {miLista.includes(videoModal.id)
                ? "Quitar de mi lista"
                : "Agregar a mi lista"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
