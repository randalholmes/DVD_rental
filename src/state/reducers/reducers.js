
import { combineReducers } from "redux";
import curIdReducer from "./curIdReducer";

const reducers = combineReducers({
    curId: curIdReducer
})

export default reducers
