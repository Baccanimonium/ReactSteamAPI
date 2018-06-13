import { takeLatest, call, put,select,cancel } from "redux-saga/effects";
import axios from "axios";
import {SUCCESS,START,FAIL,LOADED,GET_USER_OWN_GAMES} from "../helpers/constants"
import {getGames} from "./selectors"

// watcher saga: watches for actions dispatched to the store, starts watcherUserSaga saga
export function* watcherGamesSaga() {
    yield takeLatest(GET_USER_OWN_GAMES+START, userOwnGamesSaga);
}
// function that makes the api request and returns a Promise for response
// required 1 params user id
function fetchUserOwnGames(userId) {
    return axios({
        method: "get",
        url: `/api/get_player_owned_games/${userId}`
    }).then(response => response.data);

}
// userOwnGamesSaga saga: makes the api call when watcher saga sees the action
function* userOwnGamesSaga(action) {
    const {payload}=action
    //We get the state to check whether we already have the desired collection
    const games = yield select(getGames)
    //filter by user id
    if(games.gamesList.find(item=>item.steamid == payload) !==undefined) {
        //interrupt action if true
        yield put({ type: GET_USER_OWN_GAMES+LOADED  })
        yield cancel()
    }
    //dispatch req, receive player games collection
    const { response, error } = yield call(fetchUserOwnGames,payload)
    if (response !==undefined){
        // add user id to collection
        response.steamid=payload
        yield put({ type: GET_USER_OWN_GAMES+SUCCESS, response })
    }
    else
    // if response undefined  dispatch  errors
        yield put({ type: GET_USER_OWN_GAMES+FAIL, error })

}