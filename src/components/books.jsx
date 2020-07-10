import React, { Component } from "react";
import BooksTable from "./booksTable";
import { getBooks } from "../services/fakeBookService";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./../common/listGroup";
import { getGenres } from "../services/fakeBookGenreService";
import _ from "lodash";

class Books extends Component {
  state = {
    books: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  getLikedFromStorage() {
    return localStorage.getItem("likedBooks")
      ? JSON.parse(localStorage.getItem("likedBooks"))
      : [];
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    const books = getBooks();
    const likedInStorage = this.getLikedFromStorage();
    books.map((b) => {
      if (likedInStorage.find((likedBook) => likedBook._id === b._id)) {
        b.liked = true;
      }
    });
    this.setState({ books, genres });
  }

  handleDelete = (book) => {
    const books = this.state.books.filter((b) => b._id !== book._id);
    this.setState({ books });
  };

  handleLike = (book) => {
    const books = [...this.state.books];
    const index = books.indexOf(book);
    books[index] = { ...books[index] };
    books[index].liked = !books[index].liked;
    this.setState({ books });
    const likedInStorage = this.getLikedFromStorage();
    if (!book.liked) {
      likedInStorage.push(book);
      localStorage.setItem("likedBooks", JSON.stringify(likedInStorage));
    }
    if (book.liked) {
      let indexInStorage = likedInStorage.indexOf(book);
      likedInStorage.splice(indexInStorage, 1);
      localStorage.setItem("likedBooks", JSON.stringify(likedInStorage));
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
      books: allBooks,
      genres,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allBooks.filter((b) => b.genre._id === selectedGenre._id)
        : allBooks;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const books = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: books };
  };

  render() {
    const { length: count } = this.state.books;
    const { pageSize, currentPage, sortColumn, genres } = this.state;

    if (count === 0)
      return (
        <div class="p-3 mb-2 bg-secondary text-white rounded text-center">
          <p className="items-counter pt-3">
            There are no books in the database.
          </p>
        </div>
      );

    const { totalCount, data: books } = this.getPagedData();

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
          <div class="p-3 my-2 bg-secondary text-white rounded">
            Showing {totalCount} books.
          </div>

          <BooksTable
            books={books}
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

export default Books;
