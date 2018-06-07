import {GET_USER_OWN_GAMES,CLEAR_ERRORS_USER_OWN_GAMES,START,SUCCESS,FAIL,LOADED} from "../helpers/constants"


const defaultGames = {
    loading: false,
    gamesList:[],
    error:null
}


export default (state = defaultGames, action) => {
    switch (action.type) {
        case GET_USER_OWN_GAMES + START:
            return {
                ...state,
                loading: true,
                error:null
            }

        case GET_USER_OWN_GAMES + SUCCESS:
            return {
                ...state,
                gamesList: state.gamesList.concat(action.response),
                loading: false,
                error: null
            }
        case GET_USER_OWN_GAMES + FAIL:
            return {
                ...state,
                loading: false,
                error: 'The requested user was not found, enter another user id'
            }
        case GET_USER_OWN_GAMES + LOADED:
        case CLEAR_ERRORS_USER_OWN_GAMES:
            return {
                ...state,
                loading: false,
                error:null
            }

        default:
            return state
    }
}