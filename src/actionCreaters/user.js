import {GET_USER,GET_USER_OWN_GAMES, START} from "../helpers/constants"


// export function getUser(){
//     return (dispatch, getState) => {
//         const {user} = getState()
//         if (user.loading) return
//         //
//         dispatch({
//             type: GET_USER + START,
//         })
//     }
// }
export const getUser =() =>({
            type: GET_USER + START,
         })
export const getUserOwnGames =() =>({
            type: GET_USER_OWN_GAMES + START,
         })