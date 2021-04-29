import http from "../http-common";

const getAll = () => {
  return http.get("/pokemons/?format=json");
};

const get = id => {
  return http.get(`/pokemons/${id}`);
};

const create = data => {
  return http.post("/pokemons/", data);
};

const update = (id, data) => {
  return http.put(`/pokemons/${id}/`, data);
};

const remove = id => {
  return http.delete(`/pokemons/${id}`);
};

const removeAll = () => {
  return http.delete(`/pokemons/`);
};

const findByTitle = title => {
  return http.get(`/pokemons/?search=${title}`);
};

const PokemonService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default PokemonService;
