import React, { useState } from "react";
import lodash from "lodash";

import { useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";

import {
  updatePlayerName,
  addPlayers,
} from "../../redux/player/player.actions";

import { setInitialRound, resetState } from "../../redux/game/game.actions";

import Header from "../../components/header/header.comp";

import "./startgame.styles.css";

const StartGame = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(updatePlayerName([]));
  //   dispatch(resetState());
  // }, []);

  const history = useHistory();

  const [whatToDo, setWhatToDo] = useState(false);

  const [playerCount, setPlayerCount] = useState();

  const [countSubmitted, setCountSubmitted] = useState(false);

  const [isInputError, setIsInputError] = useState(false);

  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const players = useSelector((state) => state.players);

  const handleRestart = () => {
    dispatch(updatePlayerName([]));
    dispatch(resetState());
    setCountSubmitted(false);
    setPlayerCount("");
  };

  const handleResumeGame = () => {
    if (players.length === 0) {
      setIsInputError(true);
      setInputErrorMessage(
        "Ooops, there is no actual game at the moment. Please start a new game."
      );
    } else {
      history.push("/playgame");
    }
  };
  const handleStartNewGame = () => {
    setIsInputError(false);
    dispatch(updatePlayerName([]));
    dispatch(resetState());
    setWhatToDo("newgame");
  };

  const handleCountInput = (event) => {
    setIsInputError(false);
    const { value } = event.target;
    setPlayerCount(value);
  };

  const handleCountSubmit = (event) => {
    event.preventDefault();
    if (isNaN(playerCount)) {
      setIsInputError(true);
      setInputErrorMessage("Please enter a number between 2 and 6");
      setPlayerCount("");
      return;
    } else if (playerCount < 2 || playerCount > 6) {
      setIsInputError(true);
      setInputErrorMessage("Please enter a number between 2 and 6");
      setPlayerCount("");
      return;
    } else {
      let playerId = 0;
      lodash.times(playerCount, () => {
        dispatch(
          addPlayers({
            id: playerId,
            name: "",
            phaseCompleted: false,
            actualPhase: 1,
            prevActualPhase: 1,
            totalPoints: 0,
            prevTotalPoints: 0,
            roundPoints: "",
            leader: false,
            completedGame: false,
          })
        );
        playerId++;
      });
      setCountSubmitted(true);
    }
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
        {!whatToDo ? (
          <div>
            <button
              className="btn btn-lg btn-warning mt-5"
              onClick={handleStartNewGame}
            >
              Start new game NOW :)
            </button>

            <button
              className="btn btn-lg btn-primary mt-5"
              onClick={handleResumeGame}
            >
              Resume actual game
            </button>
            {isInputError ? (
              <p className="error-msg mt-1">*{inputErrorMessage}</p>
            ) : null}
          </div>
        ) : (
          <div className="init-input mt-5">
            <div className="d-flex flex-column bd-highlight">
              <form className="player-input mt-4" onSubmit={handleCountSubmit}>
                {!countSubmitted ? (
                  <div>
                    <div className="p-2 bd-highlight">
                      {" "}
                      <input
                        type="text"
                        name="playercount"
                        className="form-control-lg"
                        placeholder="No. of players"
                        value={playerCount}
                        onChange={handleCountInput}
                        required
                      />
                      {isInputError ? (
                        <p className="error-msg mt-1">*{inputErrorMessage}</p>
                      ) : null}
                    </div>
                    <div className="d-flex flex-row bd-highlight mt-2 justify-content-center">
                      <div className="p-2 bd-highlight">
                        {" "}
                        <button
                          className="btn btn-lg btn-warning"
                          type="submit"
                          id="button-addon2"
                          onClick={handleCountSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </form>
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
              {countSubmitted ? (
                <button
                  className="btn btn-lg btn-outline-warning mt-2"
                  onClick={handleRestart}
                >
                  Restart
                </button>
              ) : null}
            </div>

            <div className="player-names"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(StartGame);
