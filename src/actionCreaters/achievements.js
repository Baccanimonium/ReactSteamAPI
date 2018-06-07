import {GET_USER_GAME_ACHIEVEMENTS, START} from "../helpers/constants"



export const getUserGameAchievements =(userID) =>({
    type: GET_USER_GAME_ACHIEVEMENTS + START,
    payload:userID
})
