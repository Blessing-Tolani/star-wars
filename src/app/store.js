import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../components/movie/movieSlice";
import charactersReducer from "../components/characters/charactersSlice";

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),

  reducer: {
    movie: movieReducer,
    characters: charactersReducer,
  },
});
