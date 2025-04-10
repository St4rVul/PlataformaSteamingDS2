// src/components/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Datos de ejemplo para las películas/series
  const contentRows = [
    {
      title: "Tendencias",
      items: Array(8)
        .fill(null)
        .map((_, i) => ({
          id: i,
          title: `Título ${i + 1}`,
          image: "https://via.placeholder.com/300x169",
        })),
    },
    {
      title: "Populares en Netflix",
      items: Array(8)
        .fill(null)
        .map((_, i) => ({
          id: i + 8,
          title: `Popular ${i + 1}`,
          image: "https://via.placeholder.com/300x169",
        })),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-gradient-to-b from-black to-transparent px-4 py-2 flex justify-between items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-8 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex space-x-4">
          <button className="hover:text-gray-300">Buscar</button>
          <button className="hover:text-gray-300">Mi lista</button>
          <button className="hover:text-gray-300">Cuenta</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
          <img
            src="https://via.placeholder.com/1920x1080"
            alt="Featured"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="absolute bottom-20 left-10 max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">Título Principal</h1>
          <p className="text-lg mb-6">
            Descripción de la película o serie. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-black px-8 py-2 rounded hover:bg-opacity-80 flex items-center">
              ▶ Reproducir
            </button>
            <button className="bg-gray-600 bg-opacity-70 px-8 py-2 rounded hover:bg-opacity-40">
              Más información
            </button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 -mt-32">
        {contentRows.map((row, index) => (
          <div key={index} className="mb-8 px-4">
            <h2 className="text-2xl font-bold mb-4">{row.title}</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {row.items.map((item) => (
                <div
                  key={item.id}
                  className="flex-none w-48 transform transition-transform hover:scale-105 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="px-16 py-8 mt-20 bg-black text-gray-400">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="text-white mb-4">Audio y subtítulos</h3>
            {}
          </div>
          <div>
            <h3 className="text-white mb-4">Servicio al cliente</h3>
            {}
          </div>
          <div>
            <h3 className="text-white mb-4">Prensa</h3>
            {/* Agrega más enlaces aquí */}
          </div>
          <div>
            <h3 className="text-white mb-4">Legal</h3>
            {/* Agrega más enlaces aquí */}
          </div>
        </div>
        <div className="mt-8 text-sm">
          <p>© 2024 StreamingApp</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
