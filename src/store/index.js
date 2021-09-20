import {configureStore} from "@reduxjs/toolkit"
import {localSignIn, signOUt} from "./user/thunk";
import user from "./user"
import language from "./language"

const store = configureStore({
    reducer: {
        user: user.reducer,
        language: language.reducer,
    }
})

export default store

export const actions = {
    user: user.actions,
    language: language.actions,
}

export const thunks = {
    user: {
        localSignIn,
        signOUt
    }
}