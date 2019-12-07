import { ADD_ARTICLE, DATA_REQUESTED, DATA_LOADED_THUNK } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export function getDataThunk() {
  return function(dispatch) {
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: DATA_LOADED_THUNK, payload: json });
      });
  };
}

export function getData() {
  return { type: DATA_REQUESTED };
}
