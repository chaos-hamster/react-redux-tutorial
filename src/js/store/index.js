import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middleware";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas/api-saga";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialiseSagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(forbiddenWordsMiddleware, thunk, initialiseSagaMiddleware))
);

initialiseSagaMiddleware.run(apiSaga);

export default store;