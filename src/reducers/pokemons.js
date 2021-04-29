import {
  CREATE_Pokemon,
  RETRIEVE_PokemonS,
  UPDATE_Pokemon,
  DELETE_Pokemon,
  DELETE_ALL_PokemonS,
} from "../actions/types";

const initialState = [];

const PokemonReducer = (Pokemons = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_Pokemon:
      return [...Pokemons, payload];

    case RETRIEVE_PokemonS:
      return payload;

    case UPDATE_Pokemon:
      return Pokemons.map((Pokemon) => {
        if (Pokemon.id === payload.id) {
          return {
            ...Pokemon,
            ...payload,
          };
        } else {
          return Pokemon;
        }
      });

    case DELETE_Pokemon:
      return Pokemons.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_PokemonS:
      return [];

    default:
      return Pokemons;
  }
};

export default PokemonReducer;