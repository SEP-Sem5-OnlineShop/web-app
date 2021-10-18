import {configureStore} from "@reduxjs/toolkit"
import {localSignIn, signOUt} from "./user/thunk";
import user from "./user"
import language from "./language"
import map from "./map"

const store = configureStore({
    reducer: {
        user: user.reducer,
        language: language.reducer,
        map: map.reducer
    }
})

export default store

export const actions = {
    user: user.actions,
    language: language.actions,
    map: map.actions
}

export const thunks = {
    user: {
        localSignIn,
        signOUt
    }
}