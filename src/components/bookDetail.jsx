import React, { Component } from "react";
import { getBook } from "../services/fakeBookService";

class BookDetail extends Component {
  book = getBook(this.props.match.params.id);
  render() {
    return (
      <div className="container">
        <div className="card text-white bg-dark m-2">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={this.book.img} alt="cover" className="card-img" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title row">
                  <span className="col-7">
                    <p>{this.book.title}</p>
                    <small className="card-text">
                      Author: {this.book.author}
                    </small>
                  </span>
                  <small className="col text-right">
                    Rating: {this.book.rating}
                  </small>
                </h5>

                <p className="card-text">{this.book.synopsis}</p>
                <p className="card-text row">
                  <small className="text-alert col text-right">
                    Published in {this.book.publishDate} by{" "}
                    {this.book.publisher}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn btn-secondary btn-sm btn-block my-3"
          onClick={() => this.props.history.push("/books")}
        >
          Back to books
        </button>
      </div>
    );
  }
}

export default BookDetail;
