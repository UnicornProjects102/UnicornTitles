import React, { Component } from "react";
import HomeSection from "./homeSection";
import HomeCard from "./homeCard";
import { getMovies } from "./../services/fakeMovieService";
import { getBooks } from "./../services/fakeBookService";

class Home extends Component {
  bestMovies = getMovies().filter((m) => parseInt(m.rating) > 6);
  bestBooks = getBooks().filter((b) => parseInt(b.rating) > 7);

  render() {
    return (
      <main role="main">
        <HomeSection />
        <div className="album py-4 bg-transparent">
          <div className="container">
            <h3 className="my-2">Currently best titles</h3>
            <div className="row">
              <HomeCard data={this.bestBooks[0]} />
              <HomeCard data={this.bestBooks[1]} />
              <HomeCard data={this.bestMovies[0]} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
