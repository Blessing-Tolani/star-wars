import React, { useState, useMemo, useEffect } from "react";
import TableFooter from "../features/TableFooter";

const CharactersLayout = (props) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedGender, setSelectedGender] = useState("");

  let charactersProfileArray = props.input;
  let sortedCharacters = [...charactersProfileArray];
  let CharactersProfile;
  let charactersHeightArray = [];

  // Sorts the Table
  useMemo(() => {
    if (sortConfig) {
      sortedCharacters.sort((a, b) => {
        if (isNaN(a[sortConfig.field])) {
          if (a[sortConfig.field] < b[sortConfig.field]) {
            return sortConfig.direction == "ascending" ? -1 : 1;
          } else if (a[sortConfig.field] > b[sortConfig.field]) {
            return sortConfig.direction == "ascending" ? 1 : -1;
          } else {
            return 0;
          }
        } else {
          return sortConfig.direction == "ascending"
            ? a[sortConfig.field] - b[sortConfig.field]
            : b[sortConfig.field] - a[sortConfig.field];
        }
      });

      return sortedCharacters;
    }
  }, [charactersProfileArray, sortConfig, selectedGender]);

  //Table sorter config function
  const requestSort = (field) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.field === field &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ field, direction });
  };

  //Reset selected Gender to all when there is a change in the movie episode
  useEffect(() => {
    setSelectedGender("all");
  }, [charactersProfileArray]);

  //sets the selected Gender
  const handleChange = (e) => {
    setSelectedGender(e.target.value);
  };

  // Creates the charactersHeightArray and body of the table
  if (selectedGender === "all") {
    sortedCharacters.map((character) => {
      charactersHeightArray.push(character.height);
    });

    CharactersProfile = sortedCharacters.map((character, index) => (
      <tr key={index} className="border-b border-yellow-300 text-yellow-300">
        <td className="border-r border-yellow-300 p-2">{character.name}</td>
        <td className="border-r border-yellow-300 p-2">{character.gender}</td>
        <td className="p-2">{character.height}</td>
      </tr>
    ));
  } else {
    sortedCharacters
      .filter((character) => character.gender === selectedGender)
      .map((character) => {
        charactersHeightArray.push(character.height);
      });
    CharactersProfile = sortedCharacters
      .filter((character) => character.gender === selectedGender)
      .map((character, index) => (
        <tr key={index} className="border-b border-yellow-300 text-yellow-300">
          <td className="border-r p-2">{character.name}</td>
          <td className="border-r p-2">{character.gender}</td>
          <td className="p-2">{character.height}</td>
        </tr>
      ));
  }

  return (
    <div className="">
      <div className="my-8 text-white">
        <label htmlFor="gender">Select Gender:</label>
        <select
          name="gender"
          className="bg-black ml-2 border border-white rounded focus:outline-none"
          onChange={(e) => handleChange(e)}
          value={selectedGender}
        >
          <option value="all" className="bg-black">
            All
          </option>
          <option value="male" className="bg-black">
            Male
          </option>
          <option value="female" className="bg-black">
            Female
          </option>
          <option value="hemaphrodite" className="bg-black">
            Hemaphrodite
          </option>
          <option value="n/a" className="bg-black">
            N/A
          </option>
          <option value="none" className="bg-black">
            None
          </option>
        </select>
      </div>
      <table className="border border-yellow-300 w-full sm:w-auto">
        <thead className="border-b border-yellow-300">
          <tr className="text-yellow-300">
            <td
              className="border-r  border-yellow-300 p-2 cursor-pointer"
              onClick={() => requestSort("name")}
            >
              Name
            </td>
            <td
              className="border-r border-yellow-300 p-2 cursor-pointer"
              onClick={() => requestSort("gender")}
            >
              Gender
            </td>
            <td
              className="p-2 cursor-pointer"
              onClick={() => requestSort("height")}
            >
              Height
            </td>
          </tr>
        </thead>
        <tbody>{CharactersProfile}</tbody>
        <tfoot>
          <TableFooter input={charactersHeightArray} />
        </tfoot>
      </table>
    </div>
  );
};

export default CharactersLayout;
