import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {
    expanded: false,
  };

  toggleHandler = () => {
    let expanded = this.state.expanded;
    expanded = !expanded;
    this.setState({ expanded });
  };

  render() {
    let navClass = this.state.expanded
      ? "collapse navbar-collapse show"
      : "collapse navbar-collapse";

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand" href="#">
          UnicornTitles
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            onClick={this.toggleHandler}
            className="navbar-toggler-icon"
          ></span>
        </button>
        <div className={navClass} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies">
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/books">
                Books
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/suggest">
                Suggest a title
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/liked">
                Your favourite
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
