import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../pages/api/client";

const initialState = {
  starWarsMovie: [],
  status: "idle",
  error: null,
};

export const fetchMovie = createAsyncThunk("movie/fetchMovie", async () => {
  const response = await client.get("https://swapi.dev/api/films/");

  return response.data.results;
});

const movieSlice = createSlice({
  name: "movie",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchMovie.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        //add fetched movie to the array
        state.starWarsMovie = state.starWarsMovie.concat(action.payload);
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllEpisodes = (state) => state.movie.starWarsMovie;
export default movieSlice.reducer;
