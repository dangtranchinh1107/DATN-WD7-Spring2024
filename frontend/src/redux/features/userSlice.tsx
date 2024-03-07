import { createSlice } from "@reduxjs/toolkit";

const initiaState = {
    user: null,
    isAuthenticated: false
}

export const userSlice = createSlice({
    initiaState,
    name: "userSlice",
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setIsAuthenticated(state, action) {
            state.isAuthenticated = action.payload
        },
    }

})

export default userSlice.reducer;


export const { setIsAuthenticated, setUser } = userSlice.actions