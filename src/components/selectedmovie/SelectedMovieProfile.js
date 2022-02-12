//Get the selected episdode ID from SelectedEpisodeCharacters component
// Uses the ID to get the characters details  and opening crawl from the redux store
//Displays the opening crawl of the selected episode and calls character Layout

import { useSelector } from "react-redux";
import CharactersLayout from "../characters/CharactersLayout";
import Loading from "../features/loading";

const SelectedMovieProfile = (props) => {
  let id = props.input;
  let movieContent;

  const selectedMovie = useSelector((state) =>
    state.movies.starWarsMovies.find((movie) => movie.episode_id === id)
  );

  let openingCrawl = selectedMovie.opening_crawl;
  const movieProfile = useSelector((state) =>
    state.characters.find((movie) => movie.id === id)
  );

  if (!movieProfile) {
    movieContent = (
      <div className="h-64 ">
        <Loading />
      </div>
    );
  } else {
    let movie_characters = movieProfile.movieCharacters;
    movieContent = (
      <div className=" ">
        <p className="movieheader pb-4 text-2xl sm:text-3xl text-white text-center">
          Movie Details
        </p>
        <marquee width="95%" direction="left" height="30px">
          <p className="text-white text-sm ">{openingCrawl}</p>
        </marquee>
        <CharactersLayout input={movie_characters} />;
      </div>
    );
  }

  return <div>{movieContent}</div>;
};

export default SelectedMovieProfile;
