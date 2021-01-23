// NOT USED!!!

import { createSelector } from "reselect";

// gotta update the below, example copied from crwn project
const selectPlayers = state => state.player;

export const actualPlayers = createSelector(
    [selectPlayers],
    (players) => players
)