//Gets the selected episode ID from SelectEpisode component
//Uses the ID to find the episode in the redux store (movieSlice)
//Map through the episode characters and fetch the details for each character

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SelectedMovieProfile from "./SelectedMovieProfile";
import { charactersDetails } from "../characters/charactersSlice";

const SelectedMovieCharacters = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  let selectedMovieId = props.input;

  const selectedMovie = useSelector((state) =>
    state.movies.starWarsMovies.find(
      (movie) => movie.episode_id === selectedMovieId
    )
  );

  let characterLength = selectedMovie.characters.length;

  useEffect(() => {
    let movieCharacters = [];
    let countCharacter = 0;

    (async function fetchMovieCharacters() {
      try {
        const responses = await Promise.all(
          selectedMovie.characters.map((character) => fetch(character))
        );
        let results = await Promise.all(
          responses.map((response) => response.json())
        );
        results.forEach((result) => {
          switch (result.gender) {
            case "male":
              result.gender = "M";
              break;
            case "female":
              result.gender = "F";
              break;
            case "n/a":
              result.gender = "N/A";
              break;
            case "hermaphrodite":
              result.gender = "H";
              break;

            case "none":
              result.gender = "None";
          }

          let responseNeeded = {
            name: result.name,
            gender: result.gender,
            height: result.height,
          };

          console.log(responseNeeded);
          movieCharacters.push(responseNeeded);
          countCharacter += 1;
        });
      } catch (err) {
        router.push("/error");
      }
      if (countCharacter === characterLength) {
        console.log("done");
        dispatch(charactersDetails({ id: selectedMovieId, movieCharacters }));
      }
    })();
  }, [selectedMovieId]);

  return <SelectedMovieProfile input={selectedMovieId} />;
};

export default SelectedMovieCharacters;
