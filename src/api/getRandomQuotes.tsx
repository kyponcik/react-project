export const getRandomQuotes = () => {
  return fetch("https://animechan.vercel.app/api/quotes").then((response) =>
    response.json()
  );
};
