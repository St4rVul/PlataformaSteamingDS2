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
		<div className="min-h-screen bg-[#18181c] text-white px-8 md:px-16">
			{/* Navbar */}
			<nav
				className="py-6 flex items-center justify-between bg-[#18181c] shadow-2xl border-b border-[#23232b] z-10 relative"
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

			{/* Espacio para la preview del video */}
			<div
				style={{
					width: "100%",
					height: "320px",
					background: "#23232b",
					borderRadius: "18px",
					margin: "32px 0",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<span className="text-gray-400 text-xl">
					Aquí irá la preview del video
				</span>
			</div>

			{/* Destacados */}
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
	);
};

export default Home;
