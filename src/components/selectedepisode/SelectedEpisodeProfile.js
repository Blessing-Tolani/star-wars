//Gets the selected episode ID from SelectEpisode component
//Uses the ID to find the episode in the redux store (movieSlice)
//Display the opening crawl
//Map through the episode characters and fetch the details for each character

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SelectedEpisodeCharacters from "./SelectedEpisodeCharacters";
import { charactersDetails } from "../characters/charactersSlice";

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

    (async function fetchEpisodeCharacters() {
      try {
        const responses = await Promise.all(
          episode.characters.map((character) => fetch(character))
        );
        let results = await Promise.all(
          responses.map((response) => response.json())
        );
        results.forEach((result) => {
          let responseNeeded = {
            name: result.name,
            gender: result.gender,
            height: result.height,
          };
          episodeCharacters.push(responseNeeded);
          countCharacter += 1;
        });
      } catch (err) {
        router.push("/error");
      }
      if (countCharacter === characterLength) {
        console.log("done");
        dispatch(charactersDetails({ id: episodeId, episodeCharacters }));
      }
    })();
  }, [episodeId]);

  return (
    <div className="">
      <marquee width="95%" direction="left" height="30px">
        <p className="text-white">{openingCrawl}</p>
      </marquee>

      <SelectedEpisodeCharacters input={episodeId} />
    </div>
  );
};

export default SelectedEpisodeProfile;
