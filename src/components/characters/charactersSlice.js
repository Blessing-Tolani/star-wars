import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    charactersDetails(state, action) {
      const { id, episodeCharacters } = action.payload;
      const existingEpisodeCharacters = state.find(
        (episode) => episode.id === id
      );
      if (!existingEpisodeCharacters) {
        console.log(action.payload);
        state.push(action.payload);
      } else {
      }
    },
  },
});

export const { charactersDetails } = charactersSlice.actions;

export default charactersSlice.reducer;
