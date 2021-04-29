import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPokemon } from "../actions/Pokemons";

const AddPokemon = () => {
  const initialPokemonState = {
    "pokemon_name": null,
    "pokemon_type": "Electric",
    "pokemon_species": "Mouse",
    "pokemon_height": "30",
    "pokemon_weight": "10",
    "pokemon_abilities": "Static"
};
  const [Pokemon, setPokemon] = useState(initialPokemonState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPokemon({ ...Pokemon, [name]: value });
  };

  const savePokemon = () => {
    const { pokemon_name, 
      pokemon_type, 
      pokemon_species,
      pokemon_height,
      pokemon_weight,
      pokemon_abilities } = Pokemon;

    dispatch(createPokemon(pokemon_name, 
      pokemon_type, 
      pokemon_species,
      pokemon_height,
      pokemon_weight,
      pokemon_abilities))
      .then(data => {
        setPokemon({
          pokemon_name: data.pokemon_name,
          pokemon_type: "Electric",
          pokemon_species: "Mouse",
          pokemon_height: "30",
          pokemon_weight: "10",
          pokemon_abilities: "Static"
      });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPokemon = () => {
    setPokemon(initialPokemonState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPokemon}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              className="form-control"
              id="pokemon_name"
              required
              value={Pokemon.pokemon_name}
              onChange={handleInputChange}
              name="pokemon_name"
            />
          </div>
          <button onClick={savePokemon} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPokemon;
