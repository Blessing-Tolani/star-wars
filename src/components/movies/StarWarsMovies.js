import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../features/loading";
import { useRouter } from "next/router";
import { fetchMovies } from "./moviesSlice";

import SelectMovie from "./SelectMovie";

export const StarWarsMovies = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const moviesStatus = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (moviesStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [moviesStatus, dispatch]);

  let content;

  if (moviesStatus === "loading") {
    content = (
      <div className="fixed w-full h-full inset-0 flex justify-center items-center bg-black">
        <Loading />;
      </div>
    );
  }
  if (moviesStatus === "succeeded") {
    content = <SelectMovie />;
  } else if (moviesStatus === "failed") {
    router.push("/error");
  }

  return <div className="posts-list">{content}</div>;
};
