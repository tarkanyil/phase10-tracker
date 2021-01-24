import PlayerActionTypes from "./player.types";

const INITIAL_STATE = [];


export const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlayerActionTypes.ADD_PLAYER:
      return [...state, action.payload];
    case PlayerActionTypes.UPDATE_PLAYER_NAME:
      return action.payload;
    case PlayerActionTypes.REMOVE_PLAYERS:
      return [];
    default:
      return state;
  }
};

export default playerReducer;
