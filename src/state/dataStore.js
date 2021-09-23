
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/reducers";
import thunk from "redux-thunk"

const dataStore = createStore(reducers, {}, applyMiddleware(thunk))

export default dataStore
