import { all } from 'redux-saga/effects'
import {watcherUserSaga} from "./user"
import {watcherAchievementsSaga} from "./achievements"


export default function* rootSaga() {
    yield all([
        watcherUserSaga(),watcherAchievementsSaga()
    ])
}