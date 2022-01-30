import React, { useState, useMemo, useEffect } from "react";

const CharactersList = (props) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedGender, setSelectedGender] = useState("");

  let charactersProfileArray = props.input;
  let sortedCharacter = [...charactersProfileArray];

  // Table sorter section
  useMemo(() => {
    if (sortConfig) {
      sortedCharacter.sort((a, b) => {
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
      console.log(sortedCharacter);
      return sortedCharacter;
    }
  }, [charactersProfileArray, sortConfig]);

  useEffect(() => {
    setSelectedGender("all");
  }, [charactersProfileArray]);

  //Table sorter function
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

  //selection of gender function
  const handleChange = (e) => {
    console.log(e.target.value);
    setSelectedGender(e.target.value);
  };

  let CharactersProfile;
  let heightarr = [];

  if (selectedGender === "all") {
    //height adder
    sortedCharacter.map((item) => {
      heightarr.push(item.height);
    });

    CharactersProfile = sortedCharacter.map((item, index) => (
      <tr key={index} className="border-b">
        <td className="border-r p-2">{item.name}</td>
        <td className="border-r p-2">{item.gender}</td>
        <td className="p-2">{item.height}</td>
      </tr>
    ));
  } else {
    //height adder
    sortedCharacter
      .filter((objitem) => objitem.gender === selectedGender)
      .map((item) => {
        heightarr.push(item.height);
      });
    CharactersProfile = sortedCharacter
      .filter((objitem) => objitem.gender === selectedGender)
      .map((item, index) => (
        <tr key={index} className="border-b">
          <td className="border-r p-2">{item.name}</td>
          <td className="border-r p-2">{item.gender}</td>
          <td className="p-2">{item.height}</td>
        </tr>
      ));
  }

  //converter function
  let heightInFeet;
  let heightInInches;
  const convertToFeetandInches = (totalHeight) => {
    let x = totalHeight * 0.032808;
    let y = totalHeight * 0.3937;

    heightInFeet = x.toFixed(2);
    heightInInches = y.toFixed(2);
  };

  // Counting character function
  let arrlength = heightarr.length;
  const countCharacter = (heightarr) => {
    let i;
    let totalCharacter = 0;
    let totalHeight = 0;

    heightarr.map((item) => {
      totalHeight += parseInt(item);
    });

    convertToFeetandInches(totalHeight);

    for (i = 0; i < arrlength; i++) {
      totalCharacter += 1;
    }
    return (
      <tr>
        <td>Total: {totalCharacter}</td>
        <td></td>
        <td>
          Total: {totalHeight}cm ({heightInFeet}ft/{heightInInches}in)
        </td>
      </tr>
    );
  };
  let foot = countCharacter(heightarr);

  return (
    <div className="bg-blue-900 text-white">
      <div>
        <h1 className="text-lg">Filter</h1>
        <div>
          <label for="gender">Select Gender:</label>
          <select
            id="gender"
            className="bg-black ml-2"
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
              None
            </option>
          </select>
        </div>
      </div>
      <table className="border">
        <thead className="border-b">
          <tr>
            <td className="border-r p-2">
              <button onClick={() => requestSort("name")}>Name</button>
            </td>
            <td className="border-r p-2">
              <button onClick={() => requestSort("gender")}>Gender</button>
            </td>
            <td className="p-2" onClick={() => requestSort("height")}>
              Height
            </td>
          </tr>
        </thead>
        <tbody>{CharactersProfile}</tbody>
        <tfoot>{foot}</tfoot>
      </table>
    </div>
  );
};

export default CharactersList;
