import React, { Component } from "react";
import { connect } from "react-redux";
import { getDataThunk } from "../actions/index";

export class Post extends Component {
  componentDidMount() {
    this.props.getDataThunk();
  }
  render() {
    return (
      <ul>
        {this.props.articles.map(el => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.remoteArticlesThunked.slice(10, 20)
  };
}

export default connect(
  mapStateToProps,
  { getDataThunk }
)(Post);