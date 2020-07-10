import React from "react";
import "./App.css";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import Books from "./components/books";
import NotFound from "./common/notFound";
import SuggestForm from "./components/suggestForm";
import MovieDetail from "./common/movieDetail";
import BookDetail from "./components/bookDetail";
import LikedTitles from "./components/likedTitles";
import { Route, Redirect, Switch } from "react-router-dom";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/home";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container my-3">
        <Switch>
          <Route path="/movies/:id" component={MovieDetail} />
          <Route path="/books/:id" component={BookDetail} />
          <Route path="/movies" component={Movies} />
          <Route path="/books" component={Books} />
          <Route path="/suggest" component={SuggestForm} />
          <Route path="/liked" component={LikedTitles} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
