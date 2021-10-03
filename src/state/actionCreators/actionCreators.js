
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

export const setCustomerId = (cusId) => {
    return (dispatch) => {
        dispatch({
            type: "setCustomerId",
            payload: cusId
        })
    }
}

export const setCustomer = (customer) => {
    return (dispatch) => {
        dispatch({
            type: "updateCustomer",
            payload: customer
        })
    }
}

export const clearCustomer = () => {
    return (dispatch) => {
        dispatch({
            type: "clearCustomer",
            payload: null
        })
    }
}
