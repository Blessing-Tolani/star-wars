//Get the selected episdode ID from SelectedEpisode component
// Uses the ID to get the characters details from the redux store (characterSlice)
//Displays the opening crawl of the selected episode and calls character Layout

import { useEffect } from "react";
import { useSelector } from "react-redux";
import CharactersLayout from "../characters/CharactersLayout";
import Loading from "../loading";

const GetSelectedEpisodeCharacters = (props) => {
  let id = props.input;
  let episodeContent;
  const episodeProfile = useSelector((state) =>
    state.characters.find((episode) => episode.id === id)
  );
  if (!episodeProfile) {
    episodeContent = <Loading />;
  } else {
    console.log(episodeProfile);
    let episode_characters = episodeProfile.episodeCharacters;
    episodeContent = <CharactersLayout input={episode_characters} />;
  }

  return <div>{episodeContent}</div>;
};

export default GetSelectedEpisodeCharacters;
