import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";

import "./playgame.styles.css";

import { roundSubmit } from "../../redux/game/game.actions";

import Header from "../../components/header/header.comp";

const PlayGame = () => {
  const players = useSelector((state) => state.players);
  const game = useSelector((state) => state.game);

  console.log(game);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    // round update
      // id++, mixer next player

    // update player states
    const actualGivesCard = game.givesCard;
    const actualIdx = players.findIndex(player => (player.name === actualGivesCard));
    console.log(actualIdx);
    const nextGivesCard = (actualIdx) => {
      if (actualIdx === players.length-1) {
        return 0;
      } else return (actualIdx + 1);
    }
    console.log(nextGivesCard(actualIdx));
    const nextName = players[nextGivesCard(actualIdx)].name;
    console.log(nextName);
    dispatch(roundSubmit(nextName));
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="header-title mt-3">Let's play!</h2>
        <h2 className="mt-4 mb-4">Actual round: {game.count}</h2>
        <h2 className="mt-4 mb-4">Mixes cards: {game.givesCard}</h2>
        <form onSubmit={handleSubmit} className="">
          <div className="row ">
            {players.map((player, idx) => {
              return (
                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={idx}>
                  <div className="card text-dark bg-light mb-3">
                    <div className="card-header">{player.name}</div>
                    <div className="card-body">
                      <h6 className="card-title">
                        Actual phase: {player.actualPhase}
                      </h6>
                      <hr />
                      <h6 className="card-title">Round result</h6>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
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
                          type="text"
                          className="form-control"
                          id="basic-url"
                          aria-describedby="basic-addon3"
                        />
                      </div>
                      <hr />
                      <h6 className="card-title">
                        Total points: {player.points}
                      </h6>
                      <h6 className="card-title">Rank: 1</h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="btn btn-lg btn-warning mt-3 mb-4">
            Submit round
          </button>
        </form>
        <button className="btn btn-lg btn-outline-danger mb-4">
          Cancel game
        </button>
      </div>
    </div>
  );
};

export default withRouter(PlayGame);
