import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // 1. Importamos el store

export const SingleVehicle = () => {
  const { store } = useGlobalReducer(); // 2. Accedemos al store
  const params = useParams();
  const [vehicleDetails, setVehicleDetails] = useState(null);

  // 3. Buscamos el vehículo en el store para tener el nombre YA MISMO (Backup)
  const storeVehicle = store.vehicles.find(item => item.uid === params.theId);

  useEffect(() => {
    // Pedimos los detalles
    fetch(`https://www.swapi.tech/api/vehicles/${params.theId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta de la API");
        return res.json();
      })
      .then((data) => {
        // Aseguramos que la data existe antes de guardarla
        if (data.result && data.result.properties) {
          setVehicleDetails(data.result.properties);
        }
      })
      .catch((err) => console.error("Error cargando vehículo:", err)); // 4. Log para ver errores
  }, [params.theId]);

  // Lógica: Si tenemos los detalles descargados, úsalos. Si no, usa el del store.
  const vehicle = vehicleDetails || storeVehicle;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        
        {/* IMAGEN */}
        <div className="col-md-6 text-center">
          <img
            src={`https://starwars-visualguide.com/assets/img/vehicles/${params.theId}.jpg`}
            className="img-fluid rounded border border-secondary"
            alt={vehicle?.name || "Vehicle"}
            style={{ minHeight: "300px", objectFit: "cover" }}
            onError={(e) => {
              e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
            }}
          />
        </div>

        {/* TÍTULO Y DESCRIPCIÓN */}
        <div className="col-md-6 text-center text-md-start">
          {/* Aquí usamos vehicle?.name para que NO salga "Loading..." si ya tenemos el nombre en el store */}
          <h1 className="display-4">{vehicle?.name || "Loading..."}</h1>
          <p className="lead">
            Vehicles in Star Wars are essential for travel and combat across the galaxy.
          </p>
        </div>
      </div>

      <hr className="my-4 border-info border-2" />

      {/* TABLA DE DATOS TÉCNICOS */}
      <div className="row text-info text-center">
        {/* Aquí sí dependemos de los detalles descargados. Si no han llegado, mostramos un spinner o "..." */}
        <div className="col-md-2">
          <strong>Name</strong>
          <p>{vehicle?.name}</p>
        </div>
        <div className="col-md-2">
          <strong>Class</strong>
          <p>{vehicleDetails ? vehicleDetails.vehicle_class : "Loading..."}</p>
        </div>
        <div className="col-md-2">
          <strong>Manufacturer</strong>
          <p>{vehicleDetails ? vehicleDetails.manufacturer : "Loading..."}</p>
        </div>
        <div className="col-md-2">
          <strong>Cost</strong>
          <p>{vehicleDetails ? vehicleDetails.cost_in_credits : "Loading..."}</p>
        </div>
        <div className="col-md-2">
          <strong>Speed</strong>
          <p>{vehicleDetails ? vehicleDetails.max_atmosphering_speed : "Loading..."}</p>
        </div>
        <div className="col-md-2">
          <strong>Length</strong>
          <p>{vehicleDetails ? vehicleDetails.length : "Loading..."}</p>
        </div>
      </div>

      <div className="text-center mt-4">
        <Link to="/">
          <span className="btn btn-primary btn-lg" role="button">
            Back home
          </span>
        </Link>
      </div>
    </div>
  );
};