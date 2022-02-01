import StarWarsLogo from "../StarwarsLogo";
import { useDispatch, useSelector } from "react-redux";
import { client } from "../../pages/api/client";
import { useState } from "react";

import { charactersDetails } from "../characters/charactersSlice";

const SelectedEpisode = (props) => {
  const [charactersArray, setCharactersArray] = useState([]);
  const dispatch = useDispatch();
  let episodeId = props.input;
  let episodeProfile;
  if (!episodeId) {
    episodeProfile = <StarWarsLogo />;
  } else {
    setCharactersArray([]);
    const episode = useSelector((state) =>
      state.movie.starWarsMovie.find(
        (episode) => episode.episode_id === episodeId
      )
    );

    episode.characters.map((character) => {
      (async function fetchEpisodeCharacters() {
        const response = await client.get(character);
        let resultNeeded = {
          name: response.data.name,
          gender: response.data.gender,
          height: response.height,
        };
        console.log(resultNeeded);
        setCharactersArray((prevState) => [...prevState, resultNeeded]);
        return response.data.results;
      })();
    });
    dispatch(charactersDetails(charactersArray));
  }
  return <div>{episodeProfile}</div>;
};

export default SelectedEpisode;
