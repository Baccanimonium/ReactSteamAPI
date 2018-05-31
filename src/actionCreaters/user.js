import {GET_USER, START} from "../helpers/constants"


export function getUser(){
    return (dispatch, getState) => {
        const {user} = getState()
        if (user.loading) return
        //
        dispatch({
            type: GET_USER + START,
        })
    }
}