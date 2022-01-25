import React, { useState, useEffect } from "react";
import StarWarsLogo from "./LogoContainer";
import SelectedMovieProfile from "./SelectedMovieProfile";

const SelectMovie = () => {
  const [movielist, setMovielist] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState([]);

  const fetchMovies = async () => {
    try {
      let apiUrl = `https://swapi.dev/api/films/`;
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();
      console.log(jsonResponse.results);

      setMovielist(jsonResponse.results);
    } catch (err) {
      console.log(err);
      alert("Error!, Try Again");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const set = (id, movieDetailsArray) => {
    setSelectedMovieId(id);
    setSelectedMovie(movieDetailsArray);
  };

  const toggleDropdown = () => setOpen(!isOpen);
  const handleItemClick = (id, movieDetailsArray) => {
    toggleDropdown();
    if (selectedMovieId != id) {
      set(id, movieDetailsArray);
    } else if (selectedMovieId == id) {
    }
  };

  return (
    <>
      <div className="dropdown-container w-full h-80 bg-black flex justify-center items-start pt-10 ">
        <div className="dropdown w-72 h-12 rounded-xl shadow-2xl bg-white">
          <div
            className="dropdown-header p-3 cursor-pointer flex justify-between items-center"
            onClick={toggleDropdown}
          >
            {selectedMovieId
              ? movielist.find((item) => item.episode_id == selectedMovieId)
                  .title
              : "Select a star wars movie"}
          </div>
          <div
            className={`dropdown-body  ${isOpen ? "block" : "hidden"} ...rest`}
          >
            {movielist.map((movie) => (
              <div
                className="dropdown-item border-t rounded-xl bg-white p-2 hover:cursor-pointer  "
                onClick={(e) =>
                  handleItemClick(e.target.id, [
                    movie.characters,
                    movie.opening_crawl,
                    movie.episode_id,
                  ])
                }
                id={movie.episode_id}
                key={movie.episode_id}
              >
                {movie.title}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        {selectedMovieId ? (
          <SelectedMovieProfile input={selectedMovie} />
        ) : (
          <StarWarsLogo />
        )}
      </div>
    </>
  );
};

export default SelectMovie;
