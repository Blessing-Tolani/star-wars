import React, { useState, useEffect } from "react";

const SelectedMovieProfile = (props) => {
  console.log(props.input);
  let arr = [];
  let reply;

  let [selectedMovieCharacters, opening_crawl] = props.input;

  selectedMovieCharacters.map((character) => {
    try {
      let apiUrl = character;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((result) => {
          console.log(result.height);
          arr.push(result.height);
        });
    } catch (err) {
      console.log(err);
      alert("Error!, Try Again");
    }
  });

  return (
    <div>
      <div className="text-lg text-black flex jusitfy-center">
        {opening_crawl}
      </div>
      <div className="bg-yellow-200 mt-2">
        {arr.map((item) => (
          <h1>{item}</h1>
        ))}
      </div>
    </div>
  );
};

export default SelectedMovieProfile;
