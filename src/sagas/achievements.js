import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {SUCCESS,START,FAIL,GET_USER_GAME_ACHIEVEMENTS} from "../helpers/constants"

// watcher saga: watches for actions dispatched to the store, starts watcherUserSaga saga
export function* watcherAchievementsSaga() {
    yield takeLatest(GET_USER_GAME_ACHIEVEMENTS+START, achievementsSaga);
}

// function that makes the api request and returns a Promise for response
function fetchUserGameAchievements() {
    return axios({
        method: "get",
        url: '/get_player_game_achievements'
    }).then(response => response.data);

}

// worker saga: makes the api call when watcher saga sees the action
function* achievementsSaga() {
    const { playerstats, error } = yield call(fetchUserGameAchievements)

    if (playerstats){
        yield put({ type: GET_USER_GAME_ACHIEVEMENTS+SUCCESS, playerstats })
    }
    else
        yield put({ type: GET_USER_GAME_ACHIEVEMENTS+FAIL, error })
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
