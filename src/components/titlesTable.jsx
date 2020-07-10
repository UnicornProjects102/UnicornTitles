import React, { Component } from "react";
import Table from "../common/table";
import { Link } from "react-router-dom";

class TitlesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (title) => (
        <Link className="text-light" to={`/${title.type.name}/${title._id}`}>
          {title.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "rating", label: "Rating" },
    {
      key: "delete",
      content: (title) => (
        <button
          onClick={() => this.props.onDelete(title)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { titles, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={titles}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default TitlesTable;
