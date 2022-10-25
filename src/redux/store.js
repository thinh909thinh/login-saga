import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const action = (type, payload) => {
  console.log("dispatch", { type, payload });
  store.dispatch({ type, payload });
};
export const onLogout = () => action("LOGOUT_REQUESTED");
export const onSubmit = (username, password) => {
  action("LOGIN_REQUESTED", { username, password });
};
export default store;
