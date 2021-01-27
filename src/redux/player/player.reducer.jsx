import PlayerActionTypes from "./player.types";
import { updatePoints } from "./player.utils";

const INITIAL_STATE = [];

export const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlayerActionTypes.ADD_PLAYER:
      return [...state, action.payload];
    case PlayerActionTypes.UPDATE_PLAYER_NAME:
      return action.payload;
    case PlayerActionTypes.UPDATE_PLAYER_ROUND_POINTS:
    return updatePoints(state, action.payload);
    default:
      return state;
  }
};

export default playerReducer;
