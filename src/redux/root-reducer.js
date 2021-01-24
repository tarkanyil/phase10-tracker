// combining all the other states together

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import playerReducer from "./player/player.reducer";
import gameReducer from "./game/game.reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["players", "game"]
}

const rootReducer = combineReducers ({
    players: playerReducer,
    game: gameReducer
});

export default persistReducer(persistConfig, rootReducer);