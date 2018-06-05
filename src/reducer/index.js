import {combineReducers} from 'redux'
import user from './user'
import achievements from './achievements'

export default combineReducers({
    user,achievements
})