//Gets the selected episode ID from SelectEpisode component
//Uses the ID to find the episode in the redux store (movieSlice)
//Display the opening crawl
//Map through the episode characters and fetch the details for each character

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SelectedEpisodeCharacters from "./SelectedEpisodeCharacters";

const SelectedEpisodeProfile = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  let episodeId = props.input;

  const episode = useSelector((state) =>
    state.movie.starWarsMovie.find(
      (episode) => episode.episode_id === episodeId
    )
  );

  let openingCrawl = episode.opening_crawl;
  let characterLength = episode.characters.length;

  useEffect(() => {
    let episodeCharacters = [];
    let countCharacter = 0;

    // let requests = episode.characters.map((character) => client.get(character));
    // console.log(requests);
    (async function fetchEpisodeCharacters() {
      try {
        const responses = await Promise.all(
          episode.characters.map((character) => fetch(character))
        );
        console.log(responses);
        let results = await Promise.all(
          responses.map((response) => response.json())
        );
        results.forEach((result) => console.log(result));
      } catch (err) {
        router.push("/error");
      }
    })();
    // episode.characters.map((character) => {
    //   (async function fetchEpisodeCharacters() {
    //     const response = await client.get(character);
    //     console.log(response);
    //     let responseNeeded = {
    //       name: response.data.name,
    //       gender: response.data.gender,
    //       height: response.data.height,
    //     };
    //     episodeCharacters.push(responseNeeded);
    //     countCharacter += 1;

    //     if (countCharacter === characterLength) {
    //       console.log("done");
    //       console.log(episodeCharacters);
    //       dispatch(charactersDetails({ id: episodeId, episodeCharacters }));
    //     }
    //   })();
    // });
  }, [episodeId]);

  return (
    <div>
      <div>
        <p>{openingCrawl}</p>
      </div>
      <SelectedEpisodeCharacters input={episodeId} />
    </div>
  );
};

export default SelectedEpisodeProfile;
