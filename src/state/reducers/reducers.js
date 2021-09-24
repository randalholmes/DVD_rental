
import { combineReducers } from "redux";
import curIdReducer from "./curIdReducer";
import customerList from "./customerListReducer";

const reducers = combineReducers({
    curStoreId: curIdReducer,
    customerList: customerList
})

export default reducers
