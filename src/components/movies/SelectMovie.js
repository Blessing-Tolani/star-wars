import React, { useState } from "react";
import { useSelector } from "react-redux";
import DropDownIcon from "../features/DropDownIcon";
import SelectedMovieCharacters from "../selectedmovie/SelectedMovieCharacters";
import { selectAllMovies } from "./moviesSlice";
import StarWarsLogo from "./StarwarsLogo";

const SelectMovie = () => {
  const [isOpen, setOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const movies = useSelector(selectAllMovies);

  const toggleDropdown = () => setOpen(!isOpen);
  const handleItemClick = (episode_id) => {
    toggleDropdown();
    setSelectedMovieId(episode_id);
  };
  return (
    <div className="bg-black min-h-screen px-6 sm:px-12">
      <div className="dropdown relative inline-block h-72  w-full">
        <div className="flex justify-center pt-32 ">
          <div className=" px-2 flex justify-between items-center dropdown w-64 sm:w-72 py-2 rounded shadow-2xl bg-yellow-300">
            <div className=" dropdown-header  flex  items-center">
              {selectedMovieId
                ? movies.find((movie) => movie.episode_id == selectedMovieId)
                    .title
                : "Select a star wars movie"}
            </div>
            <div className=" cursor-pointer" onClick={toggleDropdown}>
              <DropDownIcon />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className={`dropdown-content absolute z-20 w-64 sm:w-72  ${
              isOpen ? "block" : "hidden"
            } ...rest`}
          >
            {movies.map((movie) => (
              <div
                className="focus:bg-black  hover:bg-black hover:text-yellow-300 focus:text-yellow-300 dropdown-item border-t border-black border-dashed rounded bg-yellow-300  text-black px-2 py-2 hover:cursor-pointer "
                key={movie.episode_id}
                onClick={() => handleItemClick(movie.episode_id)}
              >
                {movie.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedMovieId ? (
        <SelectedMovieCharacters input={selectedMovieId} />
      ) : (
        <StarWarsLogo />
      )}
    </div>
  );
};

export default SelectMovie;
