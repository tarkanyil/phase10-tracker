import React, { useState, useEffect } from "react";
import lodash from "lodash";

import { useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";

import {
  updatePlayerName,
  addPlayers,
} from "../../redux/player/player.actions";

import { setInitialRound, resetState } from "../../redux/game/game.actions";

import Header from "../../components/header/header.comp";

const StartGame = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePlayerName([]));
    dispatch(resetState());
  }, []);

  const history = useHistory();

  const [playerCount, setPlayerCount] = useState();

  const [countSubmitted, setCountSubmitted] = useState(false);

  const players = useSelector((state) => state.players);

  const handleCountInput = (event) => {
    if (countSubmitted) {
      dispatch(updatePlayerName([]));
      setCountSubmitted(false);
    }
    const { value } = event.target;
    setPlayerCount(value);
  };

  //   const handleInputClick = (event) => {
  //     if ((players.length > 0) & (event.target.value === "")) {
  //       dispatch(updatePlayerName([]));
  //     }
  //   };

  const handleCountSubmit = () => {
    let playerId = 0;
    lodash.times(playerCount, () => {
      dispatch(
        addPlayers({
          id: playerId,
          name: "",
          phaseCompleted: false,
          actualPhase: 1,
          totalPoints: 0,
          roundPoints: "",
          leader: false,
          completedGame: false,
        })
      );
      playerId++;
    });
    setCountSubmitted(true);
  };

  console.log("players state", players);

  const handleNameInput = (event) => {
    console.log("helloNameInputHandler");
    const updatedPlayers = [...players];
    console.log("updated players", updatedPlayers);
    console.log(event.target.dataset.idx);
    console.log(event.target.value);
    updatedPlayers[event.target.dataset.idx].name = event.target.value;
    console.log(updatedPlayers[event.target.dataset.idx].name);
    dispatch(updatePlayerName(updatedPlayers));
  };

  const handleNamesSubmit = (event) => {
    event.preventDefault();
    if (!countSubmitted) {
      alert("You've gotta add players, dummy :)");
    } else {
      dispatch(setInitialRound(players[0].name));
      history.push("/playgame");
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="header-title mt-3">Let's get started!</h2>

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
                // onClick={handleInputClick}
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
                    <div key={idx} className="p-2 bd-highlight">
                      <input
                        key={idx}
                        name={idx}
                        data-idx={idx}
                        type="text"
                        alt={idx}
                        className="form-control-lg"
                        placeholder={`Player ${idx + 1}`}
                        value={players[idx].name}
                        onChange={handleNameInput}
                        required
                      />
                    </div>
                  );
                })}
              {players.length ? (
                <button className="btn btn-lg btn-warning mt-2" type="submit">
                  Let's play!
                </button>
              ) : null}
            </form>
          </div>

          <div className="player-names"></div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(StartGame);
