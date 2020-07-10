export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471830", name: "Children" },
  { _id: "5b21ca3eeb7f6fbccd471834", name: "Fantasy" },
];

export function getGenres() {
  return genres.filter((g) => g);
}
