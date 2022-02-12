const TableFooter = (props) => {
  let charactersHeightArray = props.input;
  let heightArrayLength = charactersHeightArray.length;

  let heightInFeet;
  let heightInInches;
  const convertToFeetandInches = (totalHeight) => {
    let x = totalHeight * 0.032808;
    let y = totalHeight * 0.3937;

    heightInFeet = x.toFixed(2);
    heightInInches = y.toFixed(2);
  };

  const countCharacter = (charactersHeightArray) => {
    let i;
    let totalCharacter = 0;
    let totalHeight = 0;

    charactersHeightArray.map((item) => {
      totalHeight += parseInt(item);
    });

    convertToFeetandInches(totalHeight);

    for (i = 0; i < heightArrayLength; i++) {
      totalCharacter += 1;
    }
    return (
      <tr className="text-yellow-300">
        <td>Total: {totalCharacter}</td>
        <td></td>
        <td>
          Total: {totalHeight} cm ({heightInFeet}ft/{heightInInches}in)
        </td>
      </tr>
    );
  };

  let Tablefoot = countCharacter(charactersHeightArray);

  return Tablefoot;
};

export default TableFooter;
