/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/Home.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const destacados = [
	{
		title: "La mordida de la piraña mueca",
		image: "",
	},
	{
		title: "La patada del mocho",
		image: "",
	},
	{
		title: "La patada del mocho: El regreso",
		image: "",
	},
];

const Home: React.FC = () => {
	const navigate = useNavigate();
	const [navHover, setNavHover] = useState(false);

	return (
		<div className="min-h-screen bg-[#18181c] text-white">
			{/* Header */}
			<nav
				className="main-header py-6 flex items-center justify-between fixed top-0 left-0 w-full transition-colors duration-300 z-10 bg-[rgba(24,24,28,0.7)]"
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
						<button className="hover:text-gray-300 transition-colors duration-200">
							Inicio
						</button>
						<button className="hover:text-gray-300 transition-colors duration-200">
							Series
						</button>
						<button className="hover:text-gray-300 transition-colors duration-200">
							Peliculas
						</button>
					</div>
				</div>
				<button
					className="text-lg hover:text-gray-300 transition-colors duration-200"
					onClick={() => navigate("/account")}
				>
					Mi cuenta
				</button>
			</nav>
			{/* Contenido principal */}
			<div
				className="main-bordered"
				style={{
					paddingTop: 96,
					position: "relative",
					zIndex: 2,
				}}
			>
				{/* Video ahora está dentro del recuadro */}
				<div
					className="video-preview-wrapper"
					style={{ width: "100%", height: 320, margin: 0 }}
				>
					<div
						className="video-preview-fade"
						style={{
							height: 320,
							borderRadius: "0 0 18px 18px",
						}}
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
				{/* Resto del contenido */}
				<div className="py-10">
					<h2 className="text-4xl font-bold mb-8">Destacados</h2>
					<div className="flex gap-8">
						{destacados.map((item, idx) => (
							<div
								key={idx}
								className="bg-[#23232b] rounded-xl overflow-hidden shadow-lg w-80 flex-shrink-0"
							>
								<img
									src={item.image}
									alt={item.title}
									className="w-full h-40 object-cover"
								/>
								<div className="p-6">
									<h3 className="text-2xl font-semibold">{item.title}</h3>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
