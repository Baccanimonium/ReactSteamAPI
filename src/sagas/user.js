import { takeLatest, call, put,select,cancel } from "redux-saga/effects";
import axios from "axios";
import {SUCCESS,START,FAIL,LOADED,GET_USER} from "../helpers/constants"
import {getUser} from "./selectors"

// watcher saga: watches for actions dispatched to the store, starts watcherUserSaga saga
export function* watcherUserSaga() {
    yield takeLatest(GET_USER+START, userSaga);
}

// function that makes the api request and returns a Promise for response
// required 1 params user id
function fetchUser(userId) {
    return axios({
        method: "get",
        url: `/api/get_user/${userId}`
    }).then(response => response.data);

}


// userSaga saga: makes the api call when watcher saga sees the action
function* userSaga(action) {
    //We get the state to check whether we already have the desired collection
    const user = yield select(getUser)
    //filter by user id
    if(user.users.find(item=>item.steamid == action.payload) !==undefined) {
        //interrupt action if true
        yield put({ type: GET_USER+LOADED  })
        yield cancel()
    }
    //dispatch req, receive player games collection
    const { response} = yield call(fetchUser,action.payload)

    if (response.players.length>0){
        // destructuring response
        const data = response.players
        yield put({ type: GET_USER+SUCCESS, data })
    }
    else
    // if response undefined  dispatch  errors
        yield put({ type: GET_USER+FAIL  })

}
