import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../loading";
import { useRouter } from "next/router";
import { fetchMovie } from "./movieSlice";

import SelectEpisode from "./SelectEpisode";

export const StarWarsMovie = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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
    router.push("/error");
  }

  return <div className="posts-list">{content}</div>;
};
