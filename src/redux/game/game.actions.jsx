import GameActionTypes from "./game.types"

export const roundSubmit = round => ({
    type: GameActionTypes.ROUND_SUBMIT,
    payload: round
})

export const setInitialRound = round => ({
    type: GameActionTypes.SET_INITIAL_ROUND,
    payload: round
})

export const resetState = round => ({
    type: GameActionTypes.RESET_STATE,
    payload: round
})

export const gameRollback = round => ({
    type: GameActionTypes.GAME_ROLLBACK,
    payload: round
})