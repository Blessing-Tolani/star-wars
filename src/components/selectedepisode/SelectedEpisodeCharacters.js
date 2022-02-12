//Get the selected episdode ID from SelectedEpisode component
// Uses the ID to get the characters details from the redux store (characterSlice)
//Displays the opening crawl of the selected episode and calls character Layout

import { useSelector } from "react-redux";
import CharactersLayout from "../characters/CharactersLayout";
import Loading from "../features/loading";

const SelectedEpisodeCharacters = (props) => {
  let id = props.input;
  let episodeContent;

  const episodeProfile = useSelector((state) =>
    state.characters.find((episode) => episode.id === id)
  );

  if (!episodeProfile) {
    episodeContent = (
      <div className="h-64 ">
        <Loading />
      </div>
    );
  } else {
    console.log(episodeProfile);
    let episode_characters = episodeProfile.episodeCharacters;
    episodeContent = <CharactersLayout input={episode_characters} />;
  }

  return <div>{episodeContent}</div>;
};

export default SelectedEpisodeCharacters;
