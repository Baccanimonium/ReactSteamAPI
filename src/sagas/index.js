import { all } from 'redux-saga/effects'
import {watcherUserSaga} from "./user"
import {watcherAchievementsSaga} from "./achievements"
import {watcherGamesSaga} from "./games"


export default function* rootSaga() {
    yield all([
        watcherUserSaga(),watcherAchievementsSaga(),watcherGamesSaga()
    ])
}