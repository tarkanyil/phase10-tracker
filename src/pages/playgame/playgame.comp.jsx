import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./playgame.styles.css";

import Header from "../../components/header/header.comp";

const PlayGame = ({ params }) => {
  const location = useLocation();
  const players = location.state.params;

  const [round, setRound] = useState(1);

  const handleSubmit = () => {
    setRound(round + 1);
    console.log(round);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="header-title mt-3">Let's play!</h2>
        <h2 className="mt-4 mb-4">Actual round: {round}</h2>
        <h2 className="mt-4 mb-4">Mixes cards: Judith</h2>
        <form onSubmit={handleSubmit} className="">
          <div className="row ">
            {players.map((player, idx) => {
              return (
                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3" key={idx}>
                  <div class="card text-dark bg-light mb-3">
                    <div class="card-header">{player.name}</div>
                    <div class="card-body">
                      <h6 class="card-title">Actual phase: 1</h6>
                      <div class="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                        />
                        <label class="form-check-label" htmlFor="exampleCheck1">
                          Gives cards
                        </label>
                      </div>
                      <hr />
                      <h6 class="card-title">Round result</h6>
                      <div class="mb-3 form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck1"
                        />
                        <label class="form-check-label" htmlFor="exampleCheck1">
                          Phase completed
                        </label>
                      </div>

                      <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon3">
                          Points
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          id="basic-url"
                          aria-describedby="basic-addon3"
                        />
                      </div>
                      <hr />
                      <h6 class="card-title">Total points: 100</h6>
                      <h6 class="card-title">Rank: 1</h6>
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

export default PlayGame;
