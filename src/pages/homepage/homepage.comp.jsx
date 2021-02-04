import React from "react";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "./homepage.styles.css";

import Header from "../../components/header/header.comp";

import Footer from "../../components/footer/footer.comp";

const HomePage = () => {
  const history = useHistory();
  const players = useSelector((state) => state.players);

  const handleStartGame = () => history.push("/startgame");

  const handleResumeGame = () => history.push("/playgame");

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="header-title mt-3">Welcome!</h2>
        <button
          className="btn btn-lg btn-warning mt-5"
          onClick={handleStartGame}
        >
          Start new game
        </button>
        {players.length ? (
          <button
            className="btn btn-lg btn-primary mt-5"
            onClick={handleResumeGame}
          >
            Resume previous game
          </button>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
