// combining all the other states together

import { combineReducers } from "redux";

import playerReducer from "./player/player.reducer";
import gameReducer from "./game/game.reducer";

export default combineReducers ({
    players: playerReducer,
    game: gameReducer
});