import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./../common/listGroup";
import { getGenres } from "../services/fakeMovieGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  getLikedFromStorage() {
    return localStorage.getItem("likedMovies")
      ? JSON.parse(localStorage.getItem("likedMovies"))
      : [];
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    const movies = getMovies();
    const likedInStorage = this.getLikedFromStorage();
    movies.map((m) => {
      if (likedInStorage.find((likedMovie) => likedMovie._id === m._id)) {
        m.liked = true;
      }
    });
    this.setState({ movies, genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
    const likedInStorage = this.getLikedFromStorage();
    if (!movie.liked) {
      likedInStorage.push(movie);
      localStorage.setItem("likedMovies", JSON.stringify(likedInStorage));
    }
    if (movie.liked) {
      let indexInStorage = likedInStorage.indexOf(movie);
      likedInStorage.splice(indexInStorage, 1);
      localStorage.setItem("likedMovies", JSON.stringify(likedInStorage));
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies,
      genres,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, genres } = this.state;

    if (count === 0)
      return (
        <div className="p-3 mb-2 bg-secondary text-white rounded text-center">
          <p className="items-counter pt-3">
            There are no movies in the database.
          </p>
        </div>
      );

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-md-3 col-sm-12">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <div className="p-3 my-2 bg-secondary text-white rounded">
            Showing {totalCount} movies.
          </div>

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
