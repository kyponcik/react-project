export const getRandomPics = (isNSFW = false) => {
  const baseUrl = "https://api.waifu.im/search/?many=true";

  const nsfwQuery = "&is_nsfw=true";

  const url = isNSFW ? `${baseUrl + nsfwQuery}` : baseUrl;

  return fetch(url).then((response) => response.json());
};
