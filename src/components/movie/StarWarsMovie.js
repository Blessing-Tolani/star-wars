import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Loading from "../loading";

import { fetchMovie } from "./movieSlice";

import SelectEpisode from "./SelectEpisode";

export const StarWarsMovie = () => {
  const dispatch = useDispatch();
  const movieStatus = useSelector((state) => state.movie.status);
  const error = useSelector((state) => state.movie.error);

  useEffect(() => {
    if (movieStatus === "idle") {
      dispatch(fetchMovie());
    }
  }, [movieStatus, dispatch]);

  let content;

  if (movieStatus === "loading") {
    content = <Loading />;
  }
  if (movieStatus === "succeeded") {
    content = <SelectEpisode />;
  } else if (movieStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <div className="posts-list">{content}</div>;
};
