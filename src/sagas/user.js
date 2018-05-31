import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {SUCCESS,START,FAIL,GET_USER} from "../helpers/constants"

// watcher saga: watches for actions dispatched to the store, starts watcherUserSaga saga
export function* watcherUserSaga() {
    yield takeLatest(GET_USER+START, userSaga);
}

// function that makes the api request and returns a Promise for response
function fetchUser() {
    return axios({
        method: "get",
        url: "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=4AE5170C50784A3C5A53F3EB4B2F089C&steamids=76561197993800484"
    });
}

// worker saga: makes the api call when watcher saga sees the action
function* userSaga() {
    try {
        const response = yield call(fetchUser);
        const data = response.data;
        console.log(data)
        // dispatch a success action to the store with the new user
        yield put({ type: GET_USER+SUCCESS, data });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: GET_USER+FAIL, error });
    }
}