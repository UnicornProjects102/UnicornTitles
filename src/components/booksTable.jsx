import React, { Component } from "react";
import Like from "../common/like";
import Table from "../common/table";
import { Link } from "react-router-dom";

class BooksTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (book) => (
        <Link className="text-light" to={`/books/${book._id}`}>
          {book.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "author", label: "Author" },
    { path: "rating", label: "Rating" },
    {
      key: "like",
      content: (book) => (
        <Like liked={book.liked} onClick={() => this.props.onLike(book)} />
      ),
    },
    {
      key: "delete",
      content: (book) => (
        <button
          onClick={() => this.props.onDelete(book)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { books, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={books}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BooksTable;
