import {GET_USER_GAME_ACHIEVEMENTS,START,SUCCESS,FAIL} from "../helpers/constants"


const defaultAchievements = {
    loading: false,
    achievements: []

}


export default (state = defaultAchievements, action) => {
    const payload = action.payload
    switch (action.type) {
        case GET_USER_GAME_ACHIEVEMENTS + START:
            return {
                ...state,
                loading: true
            }

        case GET_USER_GAME_ACHIEVEMENTS + SUCCESS:
            return {
                ...state,
                achievements: state.achievements.concat(action.playerstats.achievements),
                loading: false,
                error: null
            }
        case GET_USER_GAME_ACHIEVEMENTS + FAIL:
            console.log('fail ach')
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state
    }
}