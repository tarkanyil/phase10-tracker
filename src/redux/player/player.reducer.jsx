import PlayerActionTypes from "./player.types";
import { updatePoints, updatePhase, roundEndUpdate, resetExistingPlayers, playerRollback } from "./player.utils";

const INITIAL_STATE = [];

export const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlayerActionTypes.ADD_PLAYER:
      return [...state, action.payload];
    case PlayerActionTypes.UPDATE_PLAYER_NAME:
      return action.payload;
    case PlayerActionTypes.UPDATE_PLAYER_ROUND_POINTS:
      return updatePoints(state, action.payload);
    case PlayerActionTypes.UPDATE_PLAYER_PHASE:
      return updatePhase(state, action.payload);
    case PlayerActionTypes.END_OF_ROUND_UPDATE:
      return roundEndUpdate(state);
    case PlayerActionTypes.NEW_ROUND_SAME_PLAYERS:
      return resetExistingPlayers(state);
    case PlayerActionTypes.PLAYER_ROLLBACK:
      return playerRollback(state);
    default:
      return state;
  }
};

export default playerReducer;
