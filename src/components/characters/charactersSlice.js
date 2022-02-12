import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    charactersDetails(state, action) {
      const { id, movieCharacters } = action.payload;
      const existingMovieCharacters = state.find((movie) => movie.id === id);
      if (!existingMovieCharacters) {
        console.log(action.payload);
        state.push(action.payload);
      } else {
      }
    },
  },
});

export const { charactersDetails } = charactersSlice.actions;

export default charactersSlice.reducer;
