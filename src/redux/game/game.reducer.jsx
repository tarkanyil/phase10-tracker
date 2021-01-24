import GameActionTypes from "./game.types";
import { increaseId } from "./game.utils";

const INITIAL_STATE = {
  count: 1,
  givesCard: "",
};

export const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GameActionTypes.SET_INITIAL_ROUND:
      return {
        ...state,
        givesCard: action.payload,
      };
    case GameActionTypes.ROUND_SUBMIT:
      return {
        count: increaseId(state.count),
        givesCard: action.payload,
      };
    case GameActionTypes.RESET_STATE:
      return {
        count: 1,
        givesCard: "",
      };
    default:
      return state;
  }
};

export default gameReducer;
