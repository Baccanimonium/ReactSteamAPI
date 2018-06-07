import {GET_USER, START} from "../helpers/constants"


export const getUser =(userID) =>({
            type: GET_USER + START,
            payload:userID
         })
