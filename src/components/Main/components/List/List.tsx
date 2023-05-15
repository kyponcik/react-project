export const List = ({ listQuotes, listPic }) => {
  const arr = [];
  listQuotes.map((elem, index) =>
    arr.push(
      <div>
        <li>{elem.quote}</li>
        <img
          src={listPic[index].url}
          style={{ width: "400px", height: "400px" }}
        ></img>
      </div>
    )
  );

  return (
    <>
      <ul>{arr}</ul>
    </>
  );
};
