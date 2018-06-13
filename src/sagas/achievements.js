import { takeLatest, call, put,select,cancel } from "redux-saga/effects"
import axios from "axios"
import {SUCCESS,START,FAIL,LOADED,GET_USER_GAME_ACHIEVEMENTS} from "../helpers/constants"
import {getAchievements} from "./selectors"
// watcher saga: watches for actions dispatched to the store, starts watcherUserSaga saga
export function* watcherAchievementsSaga() {
    yield takeLatest(GET_USER_GAME_ACHIEVEMENTS+START, achievementsSaga);
}

// function that makes the api request and returns a Promise for response
// required 2 params user id and app id
function fetchUserGameAchievements(userId) {
    return axios({
        method: "get",
        url: `/api/get_player_game_achievements/${userId}/${localStorage.getItem(`gameID`)}`
    }).then(response => response.data)

}

// achievementsSaga saga: makes the api call when watcher saga sees the action
function* achievementsSaga(action) {
    const {payload}=action
    //We get the state to check whether we already have the desired collection
    const achievements = yield select(getAchievements)
    //filter by user id
    const filteredUserArray=achievements.achievements.filter(item=>item.steamID === payload)
    // filter collection by app id
    if(filteredUserArray.find(item=>item.gameId === localStorage.getItem('gameID')) !==undefined ){
        //interrupt action if true
        yield put({ type: GET_USER_GAME_ACHIEVEMENTS+LOADED  })
        yield cancel()
    }
    //dispatch req, receive player stats achieved
    const { playerstats } = yield call(fetchUserGameAchievements,payload)
    if (playerstats.success === true){
        // add app id to collection
        playerstats.gameId=localStorage.getItem(`gameID`)
        yield put({ type: GET_USER_GAME_ACHIEVEMENTS+SUCCESS, playerstats })
    }
    else
        // if success fail dispatch playerstats with errors
        yield put({ type: GET_USER_GAME_ACHIEVEMENTS+FAIL, playerstats })
}
