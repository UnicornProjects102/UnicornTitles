import React from "react";
import { Link } from "react-router-dom";

const homeSection = () => {
  return (
    <section className="jumbotron text-center">
      <div className="container">
        <h1>Unicorn Titles</h1>
        <p className="lead text-muted">
          Looking for a unicorn movie or book? We've gathered all the titles in
          one place, ordered and labeled. Search our database for unicorn
          titles.
        </p>
        <p>
          <Link to="/movies" className="btn btn-primary my-2">
            Movies
          </Link>
          <Link to="/books" className="btn btn-secondary my-2">
            Books
          </Link>
        </p>
      </div>
    </section>
  );
};

export default homeSection;
