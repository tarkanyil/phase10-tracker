import PlayerActionTypes from "./player.types"

export const addPlayers = players => ({
    type: PlayerActionTypes.ADD_PLAYER,
    payload: players
})

export const updatePlayerName = players => ({
    type: PlayerActionTypes.UPDATE_PLAYER_NAME,
    payload: players
})

export const removePlayers = players => ({
    type: PlayerActionTypes.REMOVE_PLAYERS,
    payload: players
})

