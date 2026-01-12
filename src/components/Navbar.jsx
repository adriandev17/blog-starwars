import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-light bg-light mb-3 px-4">
			<Link to="/">
				{/* Puedes poner una imagen del logo de Star Wars aquí si quieres */}
				<span className="navbar-brand mb-0 h1">Star Wars Blog</span>
			</Link>
			
			<div className="ml-auto">
				<div className="dropdown">
					<button 
						className="btn btn-primary dropdown-toggle" 
						type="button" 
						id="dropdownMenuButton" 
						data-bs-toggle="dropdown" 
						aria-expanded="false"
					>
						Favorites 
						<span className="badge bg-secondary ms-2">{store.favorites.length}</span>
					</button>
					
					<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
						{store.favorites.length === 0 ? (
							<li className="dropdown-item text-center">(Empty)</li>
						) : (
							store.favorites.map((item, index) => (
								<li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
									{/* Nombre del favorito */}
									<Link to={item.uid ? `/single/${item.uid}` : "#"} className="text-decoration-none text-dark">
										{item.name}
									</Link>

									{/* Icono de Papelera para borrar */}
									<i 
										className="fas fa-trash-alt text-danger ms-3"
										style={{ cursor: "pointer" }}
										onClick={(e) => {
											// Evitamos que el clic cierre el dropdown o vaya al link
											e.stopPropagation(); 
											dispatch({ type: "remove_favorites", payload: item.name });
										}}
									></i>
								</li>
							))
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};