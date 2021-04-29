import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePokemon, deletePokemon } from "../actions/Pokemons";
import PokemonDataService from "../services/PokemonService";

const Pokemon = (props) => {
  const initialPokemonState = {
    pokemon_id: null,
    pokemon_name: null
  };
  const [currentPokemon, setCurrentPokemon] = useState(initialPokemonState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getPokemon = id => {
    PokemonDataService.get(id)
      .then(response => {
        setCurrentPokemon(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPokemon(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPokemon({ ...currentPokemon, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      pokemon_name: currentPokemon.pokemon_name,
      "pokemon_type": "Electric",
      "pokemon_species": "Mouse",
      "pokemon_height": "30",
      "pokemon_weight": "10",
      "pokemon_abilities": "Static"
    };

    dispatch(updatePokemon(currentPokemon.pokemon_id, data))
      .then(response => {
        console.log(response);

        setCurrentPokemon({ ...currentPokemon });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updatePokemon(currentPokemon.pokemon_id, currentPokemon))
      .then(response => {
        console.log(response);

        setMessage("The pokemon was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removePokemon = () => {
    dispatch(deletePokemon(currentPokemon.pokemon_id))
      .then(() => {
        props.history.push("/pokemons");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPokemon ? (
        <div className="edit-form">
          <h4>Pokemon</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="pokemon_name"
                name="pokemon_name"
                value={currentPokemon.pokemon_name}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentPokemon.description}
                onChange={handleInputChange}
              />
            </div> */}
          </form>
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Save
            </button>

          <button className="badge badge-danger mr-2" onClick={removePokemon}>
            Delete
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Pokemon...</p>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
