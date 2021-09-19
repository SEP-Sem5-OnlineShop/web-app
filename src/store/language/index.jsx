import {createSlice} from "@reduxjs/toolkit";
import sinhala from "../../assets/languages/sinhala"
import english from "../../assets/languages/english"
import tamil from "../../assets/languages/tamil"

const initialState = {
    language: "english",
    languageFile: english
}

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage(state, action) {
            state.language = action.payload
            switch (state.language) {
                case "english":
                    state.languageFile = english
                    break
                case "sinhala":
                    state.languageFile = sinhala
                    break
                case "tamil":
                    state.languageFile = tamil
            }
        },
    }
})

export default languageSlice