import React from "react";
import { Link } from "react-router-dom";

const homeCard = ({ data }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <img src={data.img} class="card-img-top" alt="..."></img>
        <div className="card-body">
          <h4>{data.title}</h4>
          <p className="card-text synopsis">{data.synopsisShort}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                <Link
                  className="home-link"
                  to={`/${data.type.name}/${data._id}`}
                >
                  See details
                </Link>
              </button>
            </div>
            <small className="text-muted">Genre: {data.genre.name}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default homeCard;
