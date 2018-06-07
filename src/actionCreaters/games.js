import {START,GET_USER_OWN_GAMES,CLEAR_ERRORS_USER_OWN_GAMES} from "../helpers/constants"

export const getUserOwnGames =(userID) =>({
    type: GET_USER_OWN_GAMES + START,
    payload:userID
})
export const clearErrorsUserOwnGames =() =>({
    type: CLEAR_ERRORS_USER_OWN_GAMES
})