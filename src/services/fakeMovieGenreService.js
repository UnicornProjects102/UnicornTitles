export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Family" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Horror" },
  { _id: "5b21ca3eeb7f6fbccd471824", name: "Drama" },
];

export function getGenres() {
  return genres.filter((g) => g);
}
