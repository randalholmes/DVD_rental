

export const selectStore = (id) => {
    return (dispatch) => {
        dispatch({
            type: "change",
            payload: id
        })
    }
}

export const changeCustomerList = (customerList) => {
    return (dispatch) => {
        dispatch({
            type: "newList",
            payload: customerList
        })
    }
}