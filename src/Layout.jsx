import React, { useEffect } from "react";
import { Outlet } from "react-router-dom"; // Usamos Outlet en lugar de BrowserRouter
import { Navbar } from "./components/Navbar.jsx";
// import { Footer } from "./components/Footer.jsx"; 

import useGlobalReducer from "./hooks/useGlobalReducer.jsx";

const Layout = () => {
    const { dispatch } = useGlobalReducer();

    useEffect(() => {
        // Cargar Personajes
        fetch("https://www.swapi.tech/api/people")
            .then(response => response.json())
            .then(data => dispatch({ type: "load_people", payload: data.results }))
            .catch(error => console.error(error));

        // Cargar Planetas
        fetch("https://www.swapi.tech/api/planets")
            .then(response => response.json())
            .then(data => dispatch({ type: "load_planets", payload: data.results }))
            .catch(error => console.error(error));

        // --- Cargar Vehículos (Vehicles) ---
        fetch("https://www.swapi.tech/api/vehicles")
             .then(response => response.json())
             .then(data => dispatch({ type: "load_vehicles", payload: data.results }))
             .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <Navbar />
            
            {/* El Outlet es "el hueco" donde React Router pone el Home o el Single */}
            <Outlet />
            
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;