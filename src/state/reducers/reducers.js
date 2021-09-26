
import { combineReducers } from "redux";
import curIdReducer from "./curIdReducer";
import customerListReducer from "./customerListReducer";
import curCustomerIdReducer from "./curCustomerIdReducer";

const reducers = combineReducers({
    curStoreId: curIdReducer,
    customerList: customerListReducer,
    curCustomerId: curCustomerIdReducer
})

export default reducers
