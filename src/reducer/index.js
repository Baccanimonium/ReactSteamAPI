import {combineReducers} from 'redux'
import user from './user'
import achievements from './achievements'
import filter from './filter'
import games from './games'


export default combineReducers({
    user,achievements,filter,games
})