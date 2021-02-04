import React from "react";

import { updatePlayerName } from "../redux/player/player.actions";

import { resetState } from "../redux/game/game.actions";

import { useDispatch } from "react-redux";

const ResetAllStates = () => {
    const dispatch = useDispatch();
    dispatch(updatePlayerName([]));
    dispatch(resetState());
}

export default ResetAllStates;

