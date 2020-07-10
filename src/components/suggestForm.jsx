import React, { Component } from "react";
import Input from "./../common/input";

class SuggestForm extends Component {
  state = {
    data: { title: "", author: "" },
    errors: {},
    formSubmitted: false,
  };

  validate = () => {
    const errors = {};
    const { data } = this.state;
    if (data.title.trim() === "") errors.title = "Please, provide a title.";
    if (data.author.trim() === "")
      errors.author = "Please, provide an author or director.";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const data = { ...this.state.data };
    data.title = "";
    data.author = "";
    this.setState({ data });

    let formSubmitted = this.state.formSubmitted;
    formSubmitted = true;
    this.setState({ formSubmitted });
    setTimeout(() => {
      formSubmitted = false;
      this.setState({ formSubmitted });
    }, 5000);
  };

  validateProperty = ({ name, value }) => {
    if (name === "title") {
      if (value.trim() === "") return "Please, provide a title.";
    }
    if (name === "author") {
      if (value.trim() === "") return "Please, provide an author or director.";
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  render() {
    const { data, errors, formSubmitted } = this.state;
    return (
      <div>
        {formSubmitted && (
          <div className="alert alert-success text-center">
            Thank you for suggesting a title. We'll consider adding it to the
            database.
          </div>
        )}
        <h1>Suggest a title</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="title"
            value={data.title}
            label="Title"
            onChange={this.handleChange}
            error={errors.title}
          />
          <Input
            name="author"
            value={data.author}
            label="Author/director"
            onChange={this.handleChange}
            error={errors.author}
          />
          <button className="btn btn-secondary">Send</button>
        </form>
      </div>
    );
  }
}

export default SuggestForm;
