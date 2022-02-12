import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../components/movies/moviesSlice";
import charactersReducer from "../components/characters/charactersSlice";

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),

  reducer: {
    movies: moviesReducer,
    characters: charactersReducer,
  },
});
