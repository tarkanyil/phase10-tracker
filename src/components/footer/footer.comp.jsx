import React from "react";

import { useDispatch } from "react-redux";

import { updatePlayerName } from "../../redux/player/player.actions";

import { resetState } from "../../redux/game/game.actions";

import "./footer.styles.css";

const Footer = () => {
  const dispatch = useDispatch();

  const handleResetStates = () => {
    dispatch(updatePlayerName([]));
    dispatch(resetState());
  };

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-outline-warning btn-footer"
        type="button"
        onClick={handleResetStates}
      >
        Reset states
      </button>
    </div>
  );
};

export default Footer;
