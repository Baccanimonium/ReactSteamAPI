import {GET_USER_GAME_ACHIEVEMENTS,START,SUCCESS,FAIL,LOADED} from "../helpers/constants"


const defaultAchievements = {
    loading: false,
    achievements: [],
    error:null

}


export default (state = defaultAchievements, action) => {
    switch (action.type) {
        case GET_USER_GAME_ACHIEVEMENTS + START:
            return {
                ...state,
                loading: true,
                error: null
            }

        case GET_USER_GAME_ACHIEVEMENTS + SUCCESS:
            return {
                ...state,
                achievements: state.achievements.concat(action.playerstats),
                loading: false,
                error: null
            }
        case GET_USER_GAME_ACHIEVEMENTS + FAIL:
            return {
                ...state,
                loading: false,
                error: action.playerstats.error
            }
        case GET_USER_GAME_ACHIEVEMENTS + LOADED:
            return {
                ...state,
                loading: false,
                error:null
            }
        default:
            return state
    }
}