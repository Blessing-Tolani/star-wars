import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    charactersDetails(state, action) {
      state.push(action.payload);
    },
  },
});

export const { charactersDetails } = charactersSlice.actions;

export default charactersSlice.reducer;
