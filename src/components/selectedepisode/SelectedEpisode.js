import { useDispatch, useSelector } from "react-redux";
import { client } from "../../pages/api/client";
import { useEffect, useState } from "react";

import { charactersDetails } from "../characters/charactersSlice";

const SelectedEpisode = (props) => {
  const [charactersArray, setCharactersArray] = useState([]);
  const dispatch = useDispatch();
  let episodeId = props.input;
  let episodeProfile;

  let confirm = 0;
  // setCharactersArray([]);
  const episode = useSelector((state) =>
    state.movie.starWarsMovie.find(
      (episode) => episode.episode_id === episodeId
    )
  );
  //   const episodeCharacters = useSelector((state) =>
  //   state.movie.starWarsMovie.find(
  //     (episode) => episode.episode_id === episodeId
  //   )
  // );

  let fig = episode.characters.length;
  console.log(fig);
  useEffect(() => {
    let episodeCharacters = [];
    episode.characters.map((character) => {
      (async function fetchEpisodeCharacters() {
        const response = await client.get(character);
        let resultNeeded = {
          name: response.data.name,
          gender: response.data.gender,
          height: response.data.height,
        };
        episodeCharacters.push(resultNeeded);
        confirm += 1;
        if (confirm === fig) {
          console.log("done");
          // setCharactersArray(check);
          console.log(episodeCharacters);
          dispatch(charactersDetails({ id: episodeId, episodeCharacters }));
        }
      })();
    });
  }, [episodeId]);

  return <div>{episodeProfile}</div>;
};

export default SelectedEpisode;
