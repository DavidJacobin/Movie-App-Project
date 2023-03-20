import { createSlice } from "@reduxjs/toolkit";


export const modeSlice = createSlice({
    name: "Mode",
    initialState: {
        mode: "dark"
    },
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload
        },
        

    }
});

export const {
    setMode,
    
} = modeSlice.actions;

export default modeSlice.reducer;