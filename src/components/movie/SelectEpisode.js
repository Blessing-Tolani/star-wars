import React, { useState } from "react";
import { useSelector } from "react-redux";
import DropDownIcon from "../features/DropDownIcon";
import SelectedEpisodeProfile from "../selectedepisode/SelectedEpisodeProfile";
import { selectAllEpisodes } from "./movieSlice";
import StarWarsLogo from "./StarwarsLogo";

const SelectEpisode = () => {
  const [isOpen, setOpen] = useState(false);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);

  const movie = useSelector(selectAllEpisodes);

  const toggleDropdown = () => setOpen(!isOpen);
  const handleItemClick = (episode_id) => {
    toggleDropdown();
    setSelectedEpisodeId(episode_id);
  };
  return (
    <div className="bg-black min-h-screen px-6 sm:px-12">
      <div className="dropdown relative inline-block h-72  w-full">
        <div className="flex justify-center pt-32 ">
          <div className=" px-2 flex justify-between items-center dropdown w-64 sm:w-72 py-2 rounded shadow-2xl bg-yellow-300">
            <div className=" dropdown-header  flex  items-center">
              {selectedEpisodeId
                ? movie.find(
                    (episode) => episode.episode_id == selectedEpisodeId
                  ).title
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
            {movie.map((episode) => (
              <div
                className="focus:bg-black hover:bg-black hover:text-yellow-300 focus:text-yellow-300 hover:font-normal focus:font-normal dropdown-item border-t border-black border-dashed rounded bg-yellow-300 font-semibold text-black px-2 py-2 hover:cursor-pointer "
                key={episode.episode_id}
                onClick={() => handleItemClick(episode.episode_id)}
              >
                {episode.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedEpisodeId ? (
        <SelectedEpisodeProfile input={selectedEpisodeId} />
      ) : (
        <StarWarsLogo />
      )}
    </div>
  );
};

export default SelectEpisode;
