import React, { Component } from "react";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./../common/listGroup";
import _ from "lodash";
import TitlesTable from "./titlesTable";

class LikedTitles extends Component {
  state = {
    titles: [],
    types: [
      { _id: "", name: "All Titles" },
      { _id: "5b21ca3eeb7f6fbccd471932", name: "Movies" },
      { _id: "5b21ca3eeb7f6fbccd471938", name: "Books" },
    ],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  getLikedMoviesFromStorage() {
    return localStorage.getItem("likedMovies")
      ? JSON.parse(localStorage.getItem("likedMovies"))
      : [];
  }
  getLikedBooksFromStorage() {
    return localStorage.getItem("likedBooks")
      ? JSON.parse(localStorage.getItem("likedBooks"))
      : [];
  }

  componentDidMount() {
    const titles = [
      ...this.getLikedMoviesFromStorage(),
      ...this.getLikedBooksFromStorage(),
    ];
    this.setState({ titles });
  }

  handleDelete = (title) => {
    const titles = this.state.titles.filter((t) => t._id !== title._id);
    this.setState({ titles });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleTypeSelect = (type) => {
    console.log(type);
    this.setState({ selectedType: type, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedType,
      titles: allTitles,
    } = this.state;

    const filtered =
      selectedType && selectedType._id
        ? allTitles.filter((t) => t.type._id === selectedType._id)
        : allTitles;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const titles = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: titles };
  };

  render() {
    const { length: count } = this.state.titles;
    const { pageSize, currentPage, sortColumn, types } = this.state;

    if (count === 0)
      return (
        <div className="p-2 mb-2 bg-secondary text-white rounded text-center">
          <p className="items-counter pt-3">You have no favourite titles.</p>
        </div>
      );

    const { totalCount, data: titles } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-md-3 col-sm-12">
          <ListGroup
            items={types}
            onItemSelect={this.handleTypeSelect}
            selectedItem={this.state.selectedType}
          />
        </div>
        <div className="col">
          <div className="p-3 my-2 bg-secondary text-white rounded">
            You have {totalCount} favourite{" "}
            {!this.state.selectedType ||
            this.state.selectedType.name === "All Titles"
              ? "titles"
              : this.state.selectedType.name === "Movies"
              ? "movies"
              : "books"}
          </div>

          <TitlesTable
            titles={titles}
            sortColumn={sortColumn}
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

export default LikedTitles;
