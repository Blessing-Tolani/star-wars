import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../pages/api/client";

const initialState = {
  starWarsMovies: [],
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await client.get("https://swapi.dev/api/films/");
  return response.data.results;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        //add fetched movie to the array
        state.starWarsMovies = state.starWarsMovies.concat(action.payload);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllMovies = (state) => state.movies.starWarsMovies;
export default moviesSlice.reducer;
