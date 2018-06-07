import {FILTER_STATE_GAME_PLAY_TIME_MAXMIN,FILTER_STATE_GAME_PLAY_TIME_MINMAX,FILTER_STATE_NAME_AZ,FILTER_STATE_NAME_ZA} from "../helpers/constants"


const defaultFilter = {
    filterState: '',
    filterFunction: ''

}


export default (state = defaultFilter, action) => {

    switch (action.type) {
        case FILTER_STATE_NAME_AZ:
            return {
                ...state,
                filterState: action.type,
                filterFunction: function (arr) {
                    arr.sort(function (a,b) {

                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        // a должно быть равным b
                        return 0;
                    })
                }
            }
        case FILTER_STATE_NAME_ZA:
            return {
                ...state,
                filterState: action.type,
                filterFunction: function (arr) {
                    arr.sort(function (a,b) {

                        if (a.name < b.name) {
                            return 1;
                        }
                        if (a.name > b.name) {
                            return -1;
                        }
                        // a должно быть равным b
                        return 0;
                    })
                }
            }
        case FILTER_STATE_GAME_PLAY_TIME_MAXMIN:
            return {
                ...state,
                filterState: action.type,
                filterFunction:function (arr) {
                    arr.sort(function (a,b) {

                        if (a.playtime_forever < b.playtime_forever) {
                            return 1;
                        }
                        if (a.playtime_forever > b.playtime_forever) {
                            return -1;
                        }
                        // a должно быть равным b
                        return 0;
                    })
                }
            }
        case FILTER_STATE_GAME_PLAY_TIME_MINMAX:
            return {
                ...state,
                filterState: action.type,
                filterFunction:function (arr) {
                    arr.sort(function (a,b) {

                        if (a.playtime_forever > b.playtime_forever) {
                            return 1;
                        }
                        if (a.playtime_forever < b.playtime_forever) {
                            return -1;
                        }
                        // a должно быть равным b
                        return 0;
                    })
                }
            }



        default:
            return state
    }
}