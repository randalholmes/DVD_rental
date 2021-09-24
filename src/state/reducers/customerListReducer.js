
const customerListReducer = (state=[], action) => {
    switch (action.type) {
        case ("newList"):
            return [...action.payload]
        default:
            return state
    }
}

export default customerListReducer
