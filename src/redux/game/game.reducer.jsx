import GameActionTypes from "./game.types";
import { increaseId } from "./game.utils";

const INITIAL_STATE = {
  count: 1,
  givesCard: "",
  completed: false,
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
        givesCard: action.payload.nextGiver,
        completed: action.payload.gameCompleted,
      };
    case GameActionTypes.RESET_STATE:
      return {
        count: 1,
        givesCard: action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
