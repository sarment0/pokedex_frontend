import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPokemon from "./components/AddPokemon";
import Pokemon from "./components/Pokemon";
import PokemonsList from "./components/PokemonsList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/pokemons" className="navbar-brand">
          Pokemons
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/pokemons"} className="nav-link">
              Pokemons
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/pokemons"]} component={PokemonsList} />
          <Route exact path="/add" component={AddPokemon} />
          <Route path="/pokemons/:id" component={Pokemon} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
