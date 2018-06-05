import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {SUCCESS,START,FAIL,GET_USER,GET_USER_OWN_GAMES} from "../helpers/constants"

// watcher saga: watches for actions dispatched to the store, starts watcherUserSaga saga
export function* watcherUserSaga() {
    yield takeLatest(GET_USER+START, userSaga);
    yield takeLatest(GET_USER_OWN_GAMES+START, userOwnGamesSaga);
}

// function that makes the api request and returns a Promise for response
function fetchUser() {
    return axios({
        method: "get",
        url: '/get_user'
    }).then(response => response.data);

}
function fetchUserOwnGames() {
    return axios({
        method: "get",
        url: '/get_player_owned_games'
    }).then(response => response.data);

}

// worker saga: makes the api call when watcher saga sees the action
function* userSaga() {
    const { response, error } = yield call(fetchUser)

    if (response){
        const data = response.players
        yield put({ type: GET_USER+SUCCESS, data })
    }
    else
        yield put({ type: GET_USER+FAIL, error })
    // try {
    //     const response = yield call(fetchUser);
    //     console.log(response)
    //     const data = response.data;
    //     // dispatch a success action to the store with the new user
    //     yield put({ type: GET_USER+SUCCESS, data });
    //
    // } catch (error) {
    //     // dispatch a failure action to the store with the error
    //     yield put({ type: GET_USER+FAIL, error });
    // }
}
function* userOwnGamesSaga() {
    const { response, error } = yield call(fetchUserOwnGames)
    if (response){
        yield put({ type: GET_USER_OWN_GAMES+SUCCESS, response })
    }
    else
        yield put({ type: GET_USER_OWN_GAMES+FAIL, error })
}