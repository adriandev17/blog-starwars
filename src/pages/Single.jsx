import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Single = () => {
  const { store } = useGlobalReducer();
  const params = useParams();
  const [characterDetails, setCharacterDetails] = useState(null);

  // 1. Buscamos el personaje en el store para tener el nombre YA MISMO
  const storeCharacter = store.people.find(item => item.uid === params.theId);

  useEffect(() => {
    // 2. Pedimos los detalles específicos a la API
    fetch(`https://www.swapi.tech/api/people/${params.theId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error API");
        return res.json();
      })
      .then((data) => {
        if (data.result && data.result.properties) {
          setCharacterDetails(data.result.properties);
        }
      })
      .catch((err) => console.error("Error cargando personaje:", err));
  }, [params.theId]);

  // Si tenemos detalles, úsalos; si no, usa lo básico del store
  const character = characterDetails || storeCharacter;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        
        {/* IMAGEN */}
        <div className="col-md-6 text-center">
          <img 
            src={`https://starwars-visualguide.com/assets/img/characters/${params.theId}.jpg`}
            className="img-fluid rounded border border-secondary" 
            alt={character?.name || "Character"}
            onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
          />
        </div>

        {/* TEXTO */}
        <div className="col-md-6 text-center text-md-start">
          <h1 className="display-4">{character?.name || "Loading..."}</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. A person within the Star Wars universe.
          </p>
        </div>
      </div>

      <hr className="my-4 border-danger border-2" />

      {/* DATOS TÉCNICOS (Color Rojo) */}
      <div className="row text-danger text-center">
        <div className="col-md-2">
          <strong>Name</strong>
          <p>{character?.name}</p>
        </div>
        <div className="col-md-2">
          <strong>Birth Year</strong>
          <p>{characterDetails ? characterDetails.birth_year : "Loading..."}</p>
        </div>
        <div className="col-md-2">
          <strong>Gender</strong>
          <p>{characterDetails ? characterDetails.gender : "Loading..."}</p>
        </div>
        <div className="col-md-2">
          <strong>Height</strong>
          <p>{characterDetails ? characterDetails.height : "Loading..."}</p>
        </div>
        <div className="col-md-2">
          <strong>Skin Color</strong>
          <p>{characterDetails ? characterDetails.skin_color : "Loading..."}</p>
        </div>
        <div className="col-md-2">
          <strong>Eye Color</strong>
          <p>{characterDetails ? characterDetails.eye_color : "Loading..."}</p>
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