import {GET_USER,GET_USER_OWN_GAMES,START,SUCCESS,FAIL} from "../helpers/constants"


const defaultUsers = {
    loading: false,
    users: [],
    games:[]
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
        case GET_USER_OWN_GAMES + SUCCESS:
            return {
                ...state,
                loading: false,
                games: state.games.concat(action.response.games),
                gamesCount: action.response.game_count,
            }

        default:
            return state
    }
}