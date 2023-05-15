export const ListItem = ({ quote, imgSrc }) => {
  return (
    <>
      <div>
        <li>{quote}</li>
        <img src={imgSrc} style={{ width: "200px", height: "200px" }}></img>
      </div>
    </>
  );
};
