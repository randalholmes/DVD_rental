
import { combineReducers } from "redux";
import curIdReducer from "./curIdReducer";
import customerListReducer from "./customerListReducer";
import curCustomerIdReducer from "./curCustomerIdReducer";
import customerReducer from "./customerReducer";

const reducers = combineReducers({
    curStoreId: curIdReducer,
    customerList: customerListReducer,
    curCustomerId: curCustomerIdReducer,
    customer: customerReducer
})

export default reducers
