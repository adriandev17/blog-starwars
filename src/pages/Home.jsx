import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <div className="container mt-5">
      
      {/* --- SECCIÓN 1: PERSONAJES (CHARACTERS) --- */}
      <h1 className="text-danger mb-4">Characters</h1>
      <div className="row">
        {store.people.map((item, index) => {
          const imgId = item.uid; 
          return (
            <div key={index} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={`https://starwars-visualguide.com/assets/img/characters/${imgId}.jpg`}
                  className="card-img-top"
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    Gender: {item.gender || "n/a"} <br />
                    Hair Color: {item.hair_color || "n/a"} <br />
                    Eye Color: {item.eye_color || "n/a"}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link to={"/single/" + item.uid} className="btn btn-outline-primary">
                      Learn more!
                    </Link>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => dispatch({ type: "add_favorites", payload: item })}
                    >
                      <i className="fa-regular fa-heart" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- SECCIÓN 2: PLANETAS (PLANETS) --- */}
      <h1 className="text-warning mt-5 mb-4">Planets</h1>
      <div className="row">
        {store.planets.map((item, index) => {
           const imgId = item.uid;
          return (
            <div key={index} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={`https://starwars-visualguide.com/assets/img/planets/${imgId}.jpg`}
                  className="card-img-top"
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                     Population: {item.population || "n/a"} <br />
                     Terrain: {item.terrain || "n/a"}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link to={"/single-planet/" + item.uid} className="btn btn-outline-primary">
                      Learn more!
                    </Link>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => dispatch({ type: "add_favorites", payload: item })}
                    >
                      <i className="fa-regular fa-heart" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- SECCIÓN 3: VEHÍCULOS (VEHICLES) --- */}
      <h1 className="text-info mt-5 mb-4">Vehicles</h1>
      <div className="row">
        {store.vehicles.map((item, index) => {
           const imgId = item.uid;
          return (
            <div key={index} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={`https://starwars-visualguide.com/assets/img/vehicles/${imgId}.jpg`}
                  className="card-img-top"
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                     Model: {item.model || "n/a"} <br />
                     Manufacturer: {item.manufacturer || "n/a"}
                  </p>
                  <div className="d-flex justify-content-between">
                    {/* Nota: Esta ruta /single-vehicle/ aún no existe, hay que crearla después */}
                    <Link to={"/single-vehicle/" + item.uid} className="btn btn-outline-primary">
                      Learn more!
                    </Link>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => dispatch({ type: "add_favorites", payload: item })}
                    >
                      <i className="fa-regular fa-heart" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};