import React, { useState } from "react";
import lodash from "lodash";

import { useHistory } from "react-router-dom";

import Header from "../../components/header/header.comp";

const HomePage = ({ playersGlobalArray }) => {
  const history = useHistory();

  const [playerCount, setPlayerCount] = useState();

  const [countSubmitted, setCountSubmitted] = useState(false);

  const [players, setPlayers] = useState([]);

  const handleCountInput = (event) => {
    if (countSubmitted) {
      setPlayers([]);
      setCountSubmitted(false);
    }
    const { value } = event.target;
    setPlayerCount(value);
  };

  const handleCountSubmit = () => {
    lodash.times(playerCount, () =>
      setPlayers((prevPlayers) => {
        return [...prevPlayers, { name: "" }];
      })
    );
    console.log(players);
    setCountSubmitted(true);
  };

  const handleNameInput = (event) => {
    console.log("helloNameInputHandler");
    const updatedPlayers = [...players];
    console.log(updatedPlayers);
    console.log(event.target.dataset.idx);
    updatedPlayers[event.target.dataset.idx][event.target.alt] =
      event.target.value;
    setPlayers(updatedPlayers);
  };

  const handleNamesSubmit = (event) => {
    event.preventDefault();
    if (!countSubmitted) {
      alert("You've gotta add players, dummy :)");
    } else {
      playersGlobalArray = players;
      console.log("global", playersGlobalArray);
      //   history.push("/playgame", { state: playersGlobalArray });
      history.push("/playgame", {
        params: playersGlobalArray,
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="header-title mt-3">Welcome!</h2>

        <div className="init-input mt-5">
          <div className="d-flex flex-column bd-highlight">
            <div className="p-2 bd-highlight">
              {" "}
              <input
                type="text"
                name="playercount"
                className="form-control-lg"
                placeholder="No. of players"
                value={playerCount}
                onChange={handleCountInput}
              />
            </div>

            <div className="d-flex flex-row bd-highlight mt-2 justify-content-center">
              <div className="p-2 bd-highlight">
                {" "}
                <button
                  className="btn btn-lg btn-warning"
                  type="button"
                  id="button-addon2"
                  onClick={handleCountSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
            <form className="player-input mt-4" onSubmit={handleNamesSubmit}>
              {countSubmitted &&
                players.map((player, idx) => {
                  return (
                    <div className="p-2 bd-highlight">
                      <input
                        key={idx}
                        name={idx}
                        data-idx={idx}
                        type="text"
                        alt="name"
                        className="form-control-lg"
                        placeholder={`Player ${idx + 1}'s name`}
                        value={players[idx].name}
                        onChange={handleNameInput}
                        required
                      />
                    </div>
                  );
                })}
              <button className="btn btn-lg btn-warning mt-2" type="submit">
                Let's play!
              </button>
            </form>
          </div>

          <div className="player-names"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
