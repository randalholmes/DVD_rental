
const curIdReducer = (state = null, action) => {
    switch (action.type) {
        case ("change"):
            return action.payload
        default:
            return state
    }
}

export default curIdReducer