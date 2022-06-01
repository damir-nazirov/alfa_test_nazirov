
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    liked: false
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersChanged: (state) => {
            state.liked = !state.liked;
        }
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    filtersChanged
} = actions;