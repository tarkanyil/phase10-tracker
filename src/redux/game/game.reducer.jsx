import GameActionTypes from "./game.types";
import { roundSubmit } from "./game.utils";

const INITIAL_STATE = {
  game: {
      id: 1,
      givesCard: "Lackó"
  },
};

export const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GameActionTypes.ROUND_SUBMIT:
      return {
          game: roundSubmit(state.game.id, "Helllllloooo")
        };
    default:
      return state;
  }
};

export default gameReducer;