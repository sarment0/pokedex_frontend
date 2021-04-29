export const CREATE_Pokemon = "CREATE_Pokemon";
export const RETRIEVE_PokemonS = "RETRIEVE_PokemonS";
export const UPDATE_Pokemon = "UPDATE_Pokemon";
export const DELETE_Pokemon = "DELETE_Pokemon";
export const DELETE_ALL_PokemonS = "DELETE_ALL_PokemonS";

export interface Pokemon {
    pokemon_name: string,
    pokemon_type: string,
    pokemon_species: string,
    pokemon_height: number,
    pokemon_weight: number,
    pokemon_abilities: string
}