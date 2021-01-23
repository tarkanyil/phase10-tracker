import GameActionTypes from "./game.types"

export const roundSubmit = round => ({
    type: GameActionTypes.ROUND_SUBMIT,
    payload: round
})