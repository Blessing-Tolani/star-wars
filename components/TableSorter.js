import React, { useState, useMemo } from "react";

const TableSorter = (props) => {
  const [sortConfig, setSortConfig] = useState(null);
  let charactersProfileArray = props.input;
  let sortedCharacter = [...charactersProfileArray];

  useMemo(() => {
    if (sortConfig) {
      sortedCharacter.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.direction == ascending ? -1 : 1;
        } else if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.direction == ascending ? 1 : -1;
        } else {
          return 0;
        }
      });
    }

    return sortedCharacter;
  }, [charactersProfileArray, sortConfig]);

  const requestSort = (field) => {
    let direction = "ascending";
    if (sortConfig.field === field && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ field, direction });
  };

  let CharactersProfile = sortedCharacter.map((item, index) => (
    <tr key={index} className="border-b">
      <td className="border-r p-2">{item.name}</td>
      <td className="border-r p-2">{item.gender}</td>
      <td className="p-2">{item.height}</td>
    </tr>
  ));

  return (
    <div className="bg-blue-900 text-white">
      <table className="border">
        <thead className="border-b">
          <tr>
            <td className="border-r p-2">
              <button onClick={() => requestSort("name")}></button>Name
            </td>
            <td className="border-r p-2">
              <button onClick={() => requestSort("gender")}></button>Gender
            </td>
            <td className="p-2" onClick={() => requestSort("height")}>
              Height
            </td>
          </tr>
        </thead>
        <tbody>{CharactersProfile}</tbody>
      </table>
    </div>
  );
};

export default TableSorter;
