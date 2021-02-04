import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";

import "./playgame.styles.css";
import image from "../../assets/leader-badge.png";

import { resetState, roundSubmit } from "../../redux/game/game.actions";
import {
  updatePlayerRoundPoints,
  updatePlayerPhase,
  endOfRoundUpdate,
  newRoundSamePlayers,
} from "../../redux/player/player.actions";

import { numberOfPhases, phases } from "../../utils/constants";

import Header from "../../components/header/header.comp";
import { trimEnd } from "lodash";

const PlayGame = () => {
  const players = useSelector((state) => state.players);
  const game = useSelector((state) => state.game);
  const history = useHistory();

  const [isInputError, setIsInputError] = useState({
    isError: false,
    playerId: "",
  });

  const [inputErrorMessage, setInputErrorMessage] = useState("");

  let gameCompleted = false;

  const dispatch = useDispatch();

  const handlePointsInput = (event) => {
    const value = event.target.value;
    const idx = event.target.name;
    isInputError.isError && setIsInputError({ isError: false, playerId: "" });
    if (isNaN(value)) {
      setIsInputError({ isError: true, playerId: idx });
      setInputErrorMessage("Please enter a numeric value");
      //update playerPoint to nixxx
      dispatch(updatePlayerRoundPoints({ idx: idx, value: "" }));
      return;
    } else {
      dispatch(updatePlayerRoundPoints({ idx: idx, value: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updatePlayerState();

    setTimeout(() => updateGameState(), 1);
  };

  const updatePlayerState = () => {
    dispatch(endOfRoundUpdate());
  };

  const updateGameState = () => {
    gameCompleted = checkGameCompleted();
    console.log("updateGameState checkGameComp", gameCompleted);
    const nextGiver = givesCardsNext(game.givesCard);
    dispatch(
      roundSubmit({ nextGiver: nextGiver, gameCompleted: gameCompleted })
    );
  };

  const givesCardsNext = (actualGivesCards) => {
    const actualIdx = players.findIndex(
      (player) => player.name === actualGivesCards
    );
    const nextIdx = (actualIdx) => {
      if (actualIdx === players.length - 1) {
        return 0;
      } else return actualIdx + 1;
    };
    return players[nextIdx(actualIdx)].name;
  };

  const handleCheckBox = (event) => {
    console.log(event.target);
    const playerId = event.target.name;
    const actualChecked = event.target.checked;
    dispatch(updatePlayerPhase({ id: playerId, value: actualChecked }));
  };

  const handleNewSame = () => {
    dispatch(newRoundSamePlayers());
    dispatch(resetState(players[0].name));
  };

  const checkGameCompleted = () => {
    let completed = false;
    players.map((player) => {
      if (player.actualPhase == numberOfPhases && player.phaseCompleted) {
        completed = true;
        return completed;
      }
      return completed;
    });
    return completed;
  };

  const determineWinner = () => {
    let idxWinner = 0;
    let minPointAmount = 1000;
    const playersCompleted = players.filter(
      (player) => player.actualPhase == "GAME COMPLETED"
    );
    if (playersCompleted.length > 1) {
      playersCompleted.map((player, idx) => {
        if (player.totalPoints < minPointAmount) {
          minPointAmount = player.totalPoints;
          idxWinner = idx;
        }
        return minPointAmount;
      });
    }
    return playersCompleted[idxWinner].name;
  };

  const handleResetWithNewPlayers = () => history.push("/startgame");

  const isWinner = (name) => {
    if (game.completed && name == determineWinner()) {
      return true;
    }
    return false;
  };

  const isErrorWith = (id) => {
    if (isInputError.isError && id == isInputError.playerId) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="header-title mt-3">Let's play!</h2>
        {!game.completed ? (
          <div>
            <h2 className="mt-4 mb-4">Actual round: {game.count}</h2>
            <h2 className="mt-4 mb-4">Mixes cards: {game.givesCard}</h2>
          </div>
        ) : (
          <div>
            <h2 className="mt-4 mb-4">GAME COMPLETED</h2>
            <h2 className="mt-4 mb-4">The winner is: {determineWinner()}</h2>
          </div>
        )}
        <form onSubmit={handleSubmit} className="playgame-form">
          <div className="row ">
            {players.map((player, idx) => {
              return (
                <div className="col-sm-12 col-md-6 col-lg-4" key={idx}>
                  <div className="card text-dark bg-light mb-3">
                    <div className="card-header">{player.name}</div>
                    {isWinner(player.name) ? (
                      <img
                        src={image}
                        alt="leader badge"
                        className="leader-image"
                      />
                    ) : null}

                    <div className="card-body">
                      <h6 className="card-title">
                        Actual phase: {player.actualPhase}
                      </h6>
                      <h6 className="card-subtitle">
                        {phases[player.actualPhase - 1].desc}
                      </h6>
                      <hr />
                      <h6 className="card-title">Round result</h6>
                      <div className="mb-3 form-check">
                        <input
                          name={idx}
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          value={player.phaseCompleted}
                          onChange={handleCheckBox}
                          checked={player.phaseCompleted}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Phase completed
                        </label>
                      </div>

                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon3">
                          Points
                        </span>
                        <input
                          key={idx}
                          name={idx}
                          type="text"
                          className="form-control"
                          id="basic-url"
                          aria-describedby="basic-addon3"
                          value={players[idx].roundPoints}
                          onChange={handlePointsInput}
                        />
                      </div>
                      {isErrorWith(idx) ? (
                        <p className="error-msg">*{inputErrorMessage}</p>
                      ) : null}
                      <hr />
                      <h6 className="card-title">
                        Total points: {player.totalPoints}
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {!game.completed && (
            <button className="btn btn-lg btn-warning mt-3 mb-4">
              Submit round
            </button>
          )}
        </form>
        <button
          className="btn btn-lg btn-outline-primary mb-4 new-game"
          onClick={handleNewSame}
        >
          New game with the same players
        </button>
        <button
          className="btn btn-lg btn-outline-success mb-4 new-game"
          onClick={handleResetWithNewPlayers}
        >
          Restart with new players
        </button>
      </div>
    </div>
  );
};

export default withRouter(PlayGame);
