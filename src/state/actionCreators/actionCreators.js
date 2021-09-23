

export const selectStore = (id) => {
    return (dispatch) => {
        dispatch({
            type: "change",
            payload: id
        })
    }
}