import {GET_USER,START,SUCCESS,FAIL,LOADED} from "../helpers/constants"


const defaultUsers = {
    loading: false,
    users: [],
    error:null
}


export default (state = defaultUsers, action) => {
    switch (action.type) {
        case GET_USER + START:
            return {
                ...state,
                loading: true
            }

        case GET_USER + SUCCESS:
            return {
                ...state,
                users: state.users.concat(action.data),
                loading: false,
                error: null
            }
        case GET_USER + FAIL:
            return {
                ...state,
                loading: false,
                error: 'No users found, enter another user id'
            }
        case GET_USER + LOADED:
            return {
                ...state,
                loading: false,
            }

        default:
            return state
    }
}