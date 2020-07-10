import React, { Component } from "react";
import { getMovie } from "./../services/fakeMovieService";

class MovieDetail extends Component {
  movie = getMovie(this.props.match.params.id);
  render() {
    return (
      <div className="container">
        <div className="card text-white text-justify bg-dark m-2">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={this.movie.img} alt="poster" className="card-img" />
            </div>
            <div className="col-md-8 text-justify">
              <div className="card-body">
                <h5 className="card-title row text-justify">
                  <p className="col-8">{this.movie.title}</p>
                  <small className="col text-right">
                    Rating: {this.movie.rating}
                  </small>
                </h5>
                <p className="card-text">{this.movie.synopsis}</p>
                <p className="card-text row">
                  <small className="text-secondary col-8">
                    Directed by: {this.movie.director}
                  </small>
                  <small className="text-alert col text-right">
                    {this.movie.runtime} | {this.movie.publishDate} |{" "}
                    {this.movie.genre.name}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn btn-secondary btn-sm btn-block my-3"
          onClick={() => this.props.history.push("/movies")}
        >
          Back to movies
        </button>
      </div>
    );
  }
}

export default MovieDetail;
