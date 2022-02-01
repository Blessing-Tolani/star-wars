import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../components/movie/movieSlice";
import charactersReducer from "../components/characters/charactersSlice";

export default configureStore({
  reducer: {
    movie: movieReducer,
    characters: charactersReducer,
  },
});
