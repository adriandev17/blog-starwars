import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const SinglePlanet = () => {
  const { store } = useGlobalReducer();
  const params = useParams();
  const [planetDetails, setPlanetDetails] = useState(null);

  // 1. Buscamos el planeta en el store (Backup)
  const storePlanet = store.planets.find(item => item.uid === params.theId);

  useEffect(() => {
    // 2. Pedimos los detalles específicos
    fetch(`https://www.swapi.tech/api/planets/${params.theId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error API");
        return res.json();
      })
      .then((data) => {
        if (data.result && data.result.properties) {
          setPlanetDetails(data.result.properties);
        }
      })
      .catch((err) => console.error("Error cargando planeta:", err));
  }, [params.theId]);

  const planet = planetDetails || storePlanet;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        
        {/* IMAGEN */}
        <div className="col-md-6 text-center">
          <img 
            src={`https://starwars-visualguide.com/assets/img/planets/${params.theId}.jpg`}
            className="img-fluid rounded border border-secondary" 
            alt={planet?.name || "Planet"}
            onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
          />
        </div>

        {/* TEXTO */}
        <div className="col-md-6 text-center text-md-start">
          <h1 className="display-4">{planet?.name || "Loading..."}</h1>
          <p className="lead">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
          </p>
        </div>
      </div>

      <hr className="my-4 border-warning border-2" />

      {/* DATOS TÉCNICOS (Color Amarillo) */}
      <div className="row text-warning text-center">
        <div className="col-md-2">
          <strong>Name</strong>
          <p>{planet?.name}</p>
        </div>
        <div className="col-md-2">
          <strong>Climate</strong>
          <p>{planetDetails ? planetDetails.climate : "Loading..."}</p>
        </div>
        <div className="col-md-2">
          <strong>Population</strong>
          <p>{planetDetails ? planetDetails.population : "Loading..."}</p>
        </div>
        <div className="col-md-2">
          <strong>Orbital Period</strong>
          <p>{planetDetails ? planetDetails.orbital_period : "Loading..."}</p>
        </div>
        <div className="col-md-2">
          <strong>Rotation Period</strong>
          <p>{planetDetails ? planetDetails.rotation_period : "Loading..."}</p>
        </div>
        <div className="col-md-2">
          <strong>Diameter</strong>
          <p>{planetDetails ? planetDetails.diameter : "Loading..."}</p>
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