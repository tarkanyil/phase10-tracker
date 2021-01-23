import PlayerActionTypes from "./player.types";

const INITIAL_STATE = {
  players: [],
};

export const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlayerActionTypes.ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.payload],
      };
    case PlayerActionTypes.UPDATE_PLAYER_NAME:
      return {
        ...state,
        players: action.payload
      };
    case PlayerActionTypes.REMOVE_PLAYERS:
      return {
        ...state,
        players: [],
      };
    default:
      return state;
  }
};

export default playerReducer;
