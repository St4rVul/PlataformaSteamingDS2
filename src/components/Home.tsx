import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [navHover, setNavHover] = useState(false);

  const sliderRef1 = useRef<HTMLDivElement>(null!);
  const sliderRef2 = useRef<HTMLDivElement>(null!);
  const sliderRef3 = useRef<HTMLDivElement>(null!);

  const scrollSlider = (
    direction: "left" | "right",
    ref: React.RefObject<HTMLDivElement>
  ) => {
    const scrollAmount = 340;
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const SliderSection = ({
    title,
    sliderRef,
    data,
  }: {
    title: string;
    sliderRef: React.RefObject<HTMLDivElement>;
    data: { title: string; image: string }[];
  }) => (
    <div className="relative mt-8">
      <h2 id="destacados" className="text-4xl px-4">
        {title}
      </h2>

      <button
        onClick={() => scrollSlider("left", sliderRef)}
        className="cursor-pointer absolute -left-13 top-1/2 -translate-y-1/3 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full ml-2 hidden md:block h-2/3 w-10"
      >
        ◀
      </button>

      <div
        ref={sliderRef}
        className="flex overflow-x-hidden scroll-smooth gap-8 px-8 py-4 no-scrollbar"
      >
        {data.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#23232b] rounded-xl overflow-hidden shadow-lg h-content w-80 flex-shrink-0 cursor-pointer hover:brightness-110 transition-all duration-200"
            onClick={() =>
              navigate(`/reproductor?title=${encodeURIComponent(item.title)}`)
            }
          >
            <img
              src={item.image}
              alt={item.title}
              className=" cursor-pointer w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-center">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollSlider("right", sliderRef)}
        className="cursor-pointer absolute -right-13 top-1/2 -translate-y-1/3 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full mr-2 hidden md:block h-2/3 w-10"
      >
        ▶
      </button>
    </div>
  );

  // Datos de películas con imágenes generadas
  const destacados1 = [
    {
      title: "Inception",
      image:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sNxqwtyHMNQwKWoFYDqcYTui5Ok.jpg",
    },
    {
      title: "The Dark Knight",
      image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      title: "Interstellar",
      image:
        "https://musicart.xboxlive.com/7/912b1000-0000-0000-0000-000000000002/504/image.jpg",
    },
    {
      title: "The Matrix",
      image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    },
    {
      title: "Fight Club",
      image: "https://image.tmdb.org/t/p/w500/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg",
    },
    {
      title: "Pulp Fiction",
      image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    },
  ];

  const destacados2 = [
    {
      title: "Forrest Gump",
      image: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    },
    {
      title: "Gladiator",
      image: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    },
    {
      title: "The Shawshank Redemption",
      image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    },
    {
      title: "The Godfather",
      image: "https://image.tmdb.org/t/p/w500/iVZ3JAcAjmguGPnRNfWFOtLHOuY.jpg",
    },
    {
      title: "Braveheart",
      image: "https://image.tmdb.org/t/p/w500/or1gBugydmjToAEq7OZY0owwFk.jpg",
    },
    {
      title: "Good Will Hunting",
      image:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4Yy63A10sPQZ9kd2kWj13S4WUkn.jpg",
    },
  ];

  const destacados3 = [
    {
      title: "The Social Network",
      image: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
    },
    {
      title: "Whiplash",
      image:
        "https://miro.medium.com/v2/resize:fit:1400/1*HygtAUSg3MqQjimu0MQy3Q.jpeg",
    },
    {
      title: "The Revenant",
      image:
        "https://m.media-amazon.com/images/M/MV5BYTgwNmQzZDctMjNmOS00OTExLTkwM2UtNzJmOTJhODFjOTdlXkEyXkFqcGc@._V1_.jpg",
    },
    {
      title: "La La Land",
      image: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    },
    {
      title: "Black Swan",
      image: "https://pics.filmaffinity.com/Cisne_negro-511211940-large.jpg",
    },
    {
      title: "Joker",
      image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    },
  ];
  return (
    <div id="body" className="min-h-screen bg-[#18181c] text-white">
      {/* Header */}
      <nav
        className="main-header font-montserrat h-1/10 py-6 flex items-center justify-between fixed top-0 left-0 w-full transition-colors duration-300 z-10 bg-[rgba(24,24,28,0.7)]"
        onMouseEnter={() => setNavHover(true)}
        onMouseLeave={() => setNavHover(false)}
      >
        <div className="flex-1 flex justify-center relative transition-all duration-300">
          <span
            className={`text-3xl font-extrabold text-white transition-all duration-300 ${
              navHover ? "translate-x-32" : "translate-x-0"
            }`}
          >
            Streamberry
          </span>
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 flex gap-16 text-lg transition-opacity duration-300 ${
              navHover
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <button className="hover:text-gray-300 transition-colors duration-200 cursor-pointer">
              Inicio
            </button>
            <button className="hover:text-gray-300 transition-colors duration-200 cursor-pointer">
              Series
            </button>
            <button className="hover:text-gray-300 transition-colors duration-200 cursor-pointer">
              Peliculas
            </button>
          </div>
        </div>
        <button
          className="text-lg hover:text-gray-300 transition-colors duration-200 cursor-pointer"
          onClick={() => navigate("/account")}
        >
          Mi cuenta
        </button>
      </nav>

      {/* Contenido principal */}
      <div
        className="main-bordered"
        style={{ paddingTop: 96, position: "relative", zIndex: 2 }}
      >
        {/* Video */}
        <div
          className="video-preview-wrapper"
          style={{ width: "100%", height: 320, margin: 0 }}
        >
          <div
            className="video-preview-fade"
            style={{ height: 320, borderRadius: "0 0 18px 18px" }}
          >
            <video
              src="/videos/prueba.mp4"
              autoPlay
              muted
              loop
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                borderRadius: "0 0 18px 18px",
              }}
            />
          </div>
        </div>

        {/* Sliders */}
        <SliderSection
          title="Destacados"
          sliderRef={sliderRef1}
          data={destacados1}
        />
        <SliderSection
          title="También te puede gustar"
          sliderRef={sliderRef2}
          data={destacados2}
        />
        <SliderSection
          title="Tu próxima historia"
          sliderRef={sliderRef3}
          data={destacados3}
        />
      </div>
    </div>
  );
};

export default Home;
