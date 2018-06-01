import {GET_USER,START,SUCCESS,FAIL} from "../helpers/constants"


const defaultUsers = {
    loading: false,
    users: []
}


export default (state = defaultUsers, action) => {
    const payload = action.payload
    switch (action.type) {
        case GET_USER + START:
            return {
                ...state,
                loading: true
            }

        case GET_USER + SUCCESS:
            console.log('success user')
            return {
                ...state,
                users: state.users.concat(action.data),
                loading: false,
                error: null
            }
        case GET_USER + FAIL:
            console.log('fail user')
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state
    }
}