export const getRandomPics = () => {
  return fetch("https://api.waifu.im/search/?many=true").then((response) =>
    response.json()
  );
};
