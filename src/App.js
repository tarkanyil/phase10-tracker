import "./App.css";

import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.comp";
import StartGame from "./pages/startgame/startgame.comp";
import PlayGame from "./pages/playgame/playgame.comp";
import Results from "./pages/results/results.comp";

function App() {
  let playersGlobalArray = [];

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <HomePage {...props} playersGlobalArray={playersGlobalArray} />
          )}
        />
        <Route exact path="/startgame" component={StartGame} />
        <Route exact path="/playgame" component={PlayGame} />
        <Route exact path="/results" component={Results} />
      </Switch>
    </div>
  );
}

export default App;
