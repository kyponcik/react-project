export const getRandomQuotes = () => {
  const url = "https://animechan.vercel.app/api/quotes";
  const tempUrl = "http://animechan.melosh.space/quotes";

  return fetch(tempUrl).then((response) => response.json());
};
