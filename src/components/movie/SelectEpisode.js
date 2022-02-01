import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectedEpisode from "../selectedepisode/SelectedEpisode";
import { selectAllEpisodes } from "./movieSlice";

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
    <>
      <div className="dropdown-container w-full h-80 bg-black flex justify-center items-start pt-10 ">
        <div className="dropdown w-72 h-12 rounded-xl shadow-2xl bg-white">
          <div
            className="dropdown-header p-3 cursor-pointer flex justify-between items-center"
            onClick={toggleDropdown}
          >
            {selectedEpisodeId
              ? movie.find((episode) => episode.episode_id == selectedEpisodeId)
                  .title
              : "Select a star wars movie"}
          </div>
          <div
            className={`dropdown-body text-white bg-red-900 ${
              isOpen ? "block" : "hidden"
            } ...rest`}
          >
            {movie.map((episode) => (
              <div
                className="dropdown-item border-t rounded-xl bg-white text-black p-2 hover:cursor-pointer "
                key={episode.episode_id}
                onClick={() => handleItemClick(episode.episode_id)}
              >
                {episode.title}
              </div>
            ))}
          </div>
        </div>
      </div>
      <SelectedEpisode input={selectedEpisodeId} />
    </>
  );
};

export default SelectEpisode;
