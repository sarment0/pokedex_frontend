import {
  CREATE_Pokemon,
  RETRIEVE_PokemonS,
  UPDATE_Pokemon,
  DELETE_Pokemon,
  DELETE_ALL_PokemonS,
} from "./types";

import PokemonDataService from "../services/PokemonService";

export const createPokemon = ( 
  pokemon_name, 
  pokemon_type, 
  pokemon_species,
  pokemon_height,
  pokemon_weight,
  pokemon_abilities) => async (dispatch) => {
  try {
    const res = await PokemonDataService.create({ 
      pokemon_name, 
      pokemon_type, 
      pokemon_species,
      pokemon_height,
      pokemon_weight,
      pokemon_abilities });

    dispatch({
      type: CREATE_Pokemon,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrievePokemons = () => async (dispatch) => {
  try {
    const res = await PokemonDataService.getAll();

    dispatch({
      type: RETRIEVE_PokemonS,
      payload: res.data.results,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePokemon = (id, data) => async (dispatch) => {
  try {
    const res = await PokemonDataService.update(id, data);

    dispatch({
      type: UPDATE_Pokemon,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deletePokemon = (id) => async (dispatch) => {
  try {
    await PokemonDataService.remove(id);

    dispatch({
      type: DELETE_Pokemon,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllPokemons = () => async (dispatch) => {
  try {
    const res = await PokemonDataService.removeAll();

    dispatch({
      type: DELETE_ALL_PokemonS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findPokemonsByTitle = (title) => async (dispatch) => {
  try {
    const res = await PokemonDataService.findByTitle(title);

    dispatch({
      type: RETRIEVE_PokemonS,
      payload: res.data.results,
    });
  } catch (err) {
    console.log(err);
  }
};
