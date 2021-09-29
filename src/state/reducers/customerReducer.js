
const customerReducer = (state=null, action) => {
    switch (action.type) {
        case ("updateCustomer"):
            return {...action.payload}

        case ("clearCustomer"):
            return null

        default:
            return state
    }
}

export default customerReducer
    