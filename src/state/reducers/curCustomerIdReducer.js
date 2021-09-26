
const curCustomerIdReducer = (state=null, action) => {
    switch (action.type) {
        case ("setCustId"):
            return action.payload
        default:
            return state
    }
}

export default curCustomerIdReducer
