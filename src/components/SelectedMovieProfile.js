import React, { useState } from "react";
import CharactersList from "./CharactersList";

const SelectedMovieProfile = (props) => {
  const [charactersProfileArray, setCharactersProfileArray] = useState([]);
  const [movieId, setMovieId] = useState(null);
  console.log(props.input);

  let [selectedMovieCharacters, opening_crawl, id] = props.input;

  if (movieId !== id) {
    setMovieId(id);
    setCharactersProfileArray([]);
    selectedMovieCharacters.map((character) => {
      try {
        let apiUrl = character;
        fetch(apiUrl)
          .then((response) => response.json())
          .then((result) => {
            let resultNeeded = {
              name: result.name,
              gender: result.gender,
              height: result.height,
            };
            console.log(resultNeeded);
            setCharactersProfileArray((prevState) => [
              ...prevState,
              resultNeeded,
            ]);
          });
      } catch (err) {
        console.log(err);
        alert("Error!, Try Again");
      }
    });
  } else {
  }

  return (
    <div>
      <div className="text-lg text-black flex jusitfy-center">
        {opening_crawl}
      </div>
      <CharactersList input={charactersProfileArray} />
    </div>
  );
};

export default SelectedMovieProfile;
