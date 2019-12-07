import { ADD_ARTICLE, DATA_LOADED, DATA_LOADED_THUNK } from "../constants/action-types";

const initialState = {
    articles: [],
    remoteArticlesThunked: [],
    remoteArticles: []
  };

function rootReducer(state = initialState, action) {
    if (action.type === ADD_ARTICLE) {
        return Object.assign({}, state, {
            articles: state.articles.concat(action.payload)
          });
    }
    
    if (action.type === DATA_LOADED_THUNK) {
      return Object.assign({}, state, {
        remoteArticlesThunked: state.remoteArticlesThunked.concat(action.payload)
      });
    }

    if (action.type === DATA_LOADED) {
      return Object.assign({}, state, {
        remoteArticles: state.remoteArticles.concat(action.payload)
      });
    }

    return state;
};

export default rootReducer;