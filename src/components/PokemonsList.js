import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievePokemons,
  findPokemonsByTitle,
  deleteAllPokemons,
} from "../actions/Pokemons";
import { Link } from "react-router-dom";

const PokemonsList = () => {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const Pokemons = useSelector(state => state.Pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrievePokemons());
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentPokemon(null);
    setCurrentIndex(-1);
  };

  const setActivePokemon = (Pokemon, index) => {
    setCurrentPokemon(Pokemon);
    setCurrentIndex(index);
  };

  const removeAllPokemons = () => {
    dispatch(deleteAllPokemons())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findPokemonsByTitle(searchTitle));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Pokemon name (Ex: Pikachu)"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Pokemons List</h4>

        <ul className="list-group">
          {Pokemons &&
            Pokemons.map((Pokemon, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePokemon(Pokemon, index)}
                key={index}
              >
                {Pokemon.pokemon_name}
              </li>
            ))}
        </ul>

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllPokemons}
        >
          Remove All
        </button> */}
      </div>
      <div className="col-md-6">
        {currentPokemon ? (
          <div>
            <h4>Pokemon</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentPokemon.pokemon_name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentPokemon.pokemon_type}
            </div>
            <div>
              <label>
                <strong>Species:</strong>
              </label>{" "}
              {currentPokemon.pokemon_species}
            </div>
            <Link
              to={"/pokemons/" + currentPokemon.pokemon_id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Pokemon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonsList;
