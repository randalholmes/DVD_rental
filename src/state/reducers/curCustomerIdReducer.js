
const curCustomerIdReducer = (state=null, action) => {
    switch (action.type) {
        case ("setCustomerId"):
            return action.payload
        default:
            return state
    }
}

export default curCustomerIdReducer
