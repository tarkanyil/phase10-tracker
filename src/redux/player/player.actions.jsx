import PlayerActionTypes from "./player.types"

export const addPlayers = players => ({
    type: PlayerActionTypes.ADD_PLAYER,
    payload: players
})

export const updatePlayerName = players => ({
    type: PlayerActionTypes.UPDATE_PLAYER_NAME,
    payload: players
})

export const updatePlayerRoundPoints = players => ({
    type: PlayerActionTypes.UPDATE_PLAYER_ROUND_POINTS,
    payload: players
})

export const updatePlayerPhase = players => ({
    type: PlayerActionTypes.UPDATE_PLAYER_PHASE,
    payload: players
})

export const endOfRoundUpdate = players => ({
    type: PlayerActionTypes.END_OF_ROUND_UPDATE,
    payload: players
})

export const newRoundSamePlayers = players => ({
    type: PlayerActionTypes.NEW_ROUND_SAME_PLAYERS,
    payload: players
})

