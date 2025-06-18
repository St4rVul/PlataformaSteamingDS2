import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Reproductor.css";

const movieData = {
  Inception: {
    year: 2010,
    synopsis:
      "Dom Cobb es un extractor experto: roba secretos del subconsciente mientras duermes. Pero le proponen un reto imposible: plantar una idea que cambie el mundo. En un viaje por sueños dentro de sueños, enfrentará sus propios demonios.",
    youtubeId: "8hP9D6kZseM",
    image:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sNxqwtyHMNQwKWoFYDqcYTui5Ok.jpg",
  },
  "The Dark Knight": {
    year: 2008,
    synopsis:
      "El caballero oscuro enfrenta su mayor desafío cuando Gotham es aterrorizada por un criminal anárquico: el Joker. Sin reglas, sin piedad, impulsado solo por el caos, el Joker obligará a Batman a cuestionarse qué tipo de héroe quiere ser.",
    youtubeId: "EXeTwQWrcwY",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  Interstellar: {
    year: 2014,
    synopsis:
      "En un futuro cercano, la Tierra agoniza. Cooper, ex piloto de la NASA, lidera una expedición a través de un agujero de gusano para encontrar un nuevo hogar para la humanidad. Una odisea épica que desafía el amor, la física y el tiempo.",
    youtubeId: "zSWdZVtXT7E",
    image:
      "https://musicart.xboxlive.com/7/912b1000-0000-0000-0000-000000000002/504/image.jpg",
  },
  "The Matrix": {
    year: 1999,
    synopsis:
      "Neo vive en una realidad simulada, controlada por máquinas. Al descubrir la verdad, debe elegir entre seguir durmiendo o despertar y liderar la lucha por la libertad de la humanidad.",
    youtubeId: "vKQi3bBA1y8",
    image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  "Fight Club": {
    year: 1999,
    synopsis:
      "Un trabajador frustrado y un vendedor de jabón carismático crean un club clandestino de peleas para enfrentarse al sistema y a sí mismos. Pero cuando se escapa de sus controles, el caos amenaza con destruirlos todo.",
    youtubeId: "SUXWAEX2jlg",
    image: "https://image.tmdb.org/t/p/w500/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg",
  },
  "Pulp Fiction": {
    year: 1994,
    synopsis:
      "Historias entrelazadas de crimen, redención y humor negro en Los Ángeles: una pareja de asesinos a sueldo, un boxeador en problemas, una misión para rescatar a la esposa del jefe. Una película que redefinió el cine moderno.",
    youtubeId: "s7EdQ4FqbhY",
    image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  },
  "Forrest Gump": {
    year: 1994,
    synopsis:
      "Con un coeficiente intelectual por debajo de la media, Forrest Gump se convierte, sin proponérselo, en testigo (y partícipe) de momentos históricos de EE.UU., demostrando que la inocencia y la bondad pueden cambiar el mundo.",
    youtubeId: "bLvqoHBptjg",
    image: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
  },
  Gladiator: {
    year: 2000,
    synopsis:
      "Máximo, general romano traicionado, es forzado a convertirse en gladiador. Con honor y venganza como armas, lucha para recuperar su libertad y desafiar al corrupto imperio que destruyó a su familia.",
    youtubeId: "owK1qxDselE",
    image: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
  },
  "The Shawshank Redemption": {
    year: 1994,
    synopsis:
      "Andy Dufresne, condenado injustamente por asesinato, sobrevive a la brutal prisión de Shawshank con su entereza. Su amistad con Red y su ingenio finalmente desafían a un sistema corrupto.",
    youtubeId: "6hB3S9bIaco",
    image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  },
  "The Godfather": {
    year: 1972,
    synopsis:
      "La saga de los Corleone, la familia mafiosa más poderosa de Nueva York. Entre traición, poder y honor, Michael toma el control para defender a los suyos, aunque eso signifique perder su inocencia.",
    youtubeId: "sY1S34973zA",
    image: "https://image.tmdb.org/t/p/w500/iVZ3JAcAjmguGPnRNfWFOtLHOuY.jpg",
  },
  Braveheart: {
    year: 1995,
    synopsis:
      "William Wallace lidera a su gente en una rebelión sangrienta contra el dominio inglés. Con coraje y pasión, Wallace lucha por la libertad de Escocia, inspirando a toda una nación.",
    youtubeId: "1NJO0jxBtMo",
    image: "https://image.tmdb.org/t/p/w500/or1gBugydmjToAEq7OZY0owwFk.jpg",
  },
  "Good Will Hunting": {
    year: 1997,
    synopsis:
      "Will Hunting es un genio autodidacta, pero sus traumas lo hunden. Con la ayuda de un terapeuta poco convencional, enfrentará su dolor y decidirá si aprovechar su potencial o quedarse en su zona de confort.",
    youtubeId: "PaZVjZEFkRs",
    image:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4Yy63A10sPQZ9kd2kWj13S4WUkn.jpg",
  },
  "The Social Network": {
    year: 2010,
    synopsis:
      "La meteórica creación de Facebook desde el dormitorio de un universitario. Éxito, traición y demandas definen el ascenso de Mark Zuckerberg como el genio detrás de una revolución digital.",
    youtubeId: "lB95KLmpLR4",
    image: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
  },
  Whiplash: {
    year: 2014,
    synopsis:
      "Un joven baterista con talento se inscribe en una academia exigente. Bajo la tutela de un director tiránico, su obsesión por la perfección se convierte en un viaje al límite del sacrificio personal.",
    youtubeId: "7d_jQycdQGo",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*HygtAUSg3MqQjimu0MQy3Q.jpeg",
  },
  "The Revenant": {
    year: 2015,
    synopsis:
      "Hugh Glass, explorador herido de muerte tras un ataque de oso, sobrevive en la naturaleza salvaje y emprende una misión de venganza contra quienes lo dejaron a su suerte.",
    youtubeId: "LoebZZ8K5N0",
    image:
      "https://m.media-amazon.com/images/M/MV5BYTgwNmQzZDctMjNmOS00OTExLTkwM2UtNzJmOTJhODFjOTdlXkEyXkFqcGc@._V1_.jpg",
  },
  "La La Land": {
    year: 2016,
    synopsis:
      "Un músico de jazz y una aspirante a actriz se enamoran en Los Ángeles mientras persiguen sus sueños. Una historia de amor, arte y sacrificio que celebra la pasión y el precio de la ambición.",
    youtubeId: "0pdqf4P9MB8",
    image: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
  },
  "Black Swan": {
    year: 2010,
    synopsis:
      "Nina, una bailarina obsesionada con la perfección, se sumerge en un descenso psicológico mientras lucha por el papel principal en El Lago de los Cisnes. Gravedad y obsesión convergen en un ballet oscuro.",
    youtubeId: "5jaI1XOB-bs",
    image: "https://pics.filmaffinity.com/Cisne_negro-511211940-large.jpg",
  },
  Joker: {
    year: 2019,
    synopsis:
      "Arthur Fleck, un comediante frustrado y maltratado por la sociedad, se transforma en el villano más emblemático de Gotham. Un estudio psicológico del caos y la alienación urbana.",
    youtubeId: "zAGVQLHvwOY",
    image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
};

const Reproductor: React.FC = () => {
  const navigate = useNavigate();
  const [navHover, setNavHover] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = decodeURIComponent(searchParams.get("title") || "");

  const data = movieData[title as keyof typeof movieData];

  if (!data) {
    return (
      <div className="text-white p-8">
        <h1 className="text-4xl">Película no encontrada</h1>
      </div>
    );
  }

  return (
    <>
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
            <button
              className="hover:text-gray-300 transition-colors duration-200 cursor-pointer"
              onClick={() => navigate("/home")}
            >
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
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Fondo con imagen */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${data.image})`,
          }}
        />

        {/* Capa con blur */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/30" />

        {/* Contenido encima */}
        <div id="contenido" className="relative z-10">
          <div className="w-full max-w-3xl mx-auto aspect-video mb-6">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${data.youtubeId}`}
              title={`Trailer de ${title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="max-w-150 flex flex-col gap-3">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg mb-2">
              <strong>Año de estreno:</strong> {data.year}
            </p>
            <p className="text-lg">
              <strong>Sinopsis:</strong> {data.synopsis}
            </p>
            <button
              className="subscribe-btn max-w-50"
              style={{ marginTop: 12 }}
              onClick={() => navigate("/home")}
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reproductor;
