import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getUserOwnGames,clearErrorsUserOwnGames} from "../../../actionCreaters/games"
import {Redirect} from 'react-router-dom'
import GamesLayout from './GamesLayout'
import Loader from '../../../helpers/Loader'


class GamesSection extends Component {

    state = {
        currentGamesItem: '',
        loadedWithErrors: false,

    }
    static getDerivedStateFromProps(nextProps, prevState){
        // get current user id from route props
        const currentUser=nextProps.match.params.userId
        // check for matches in state
        let suitableUser=nextProps.games.gamesList.find(item=>item.steamid === currentUser)
        if(suitableUser){
            return{
                currentGamesItem:suitableUser
            }
        }

        if(nextProps.games.error !== null && !nextProps.games.loaded ){
            return{
                loadedWithErrors:true
            }
        }
        return null
    }
    componentDidMount(){
        const {userId}=this.props.match.params
        const {dispatchGetUserOwnGames} = this.props
        dispatchGetUserOwnGames(userId)
    }

    //clear errors to prevent double redirection
    componentWillUnmount(){
        if(this.state.loadedWithErrors){
            this.props.dispatchClearErrorsUserOwnGames()
        }
    }

    render() {
        // redirect  if don`t load games list
        if (this.state.loadedWithErrors) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: { error: this.props.games.error }
                }}
            />
        }
        // render preloader while loading games list
        if(this.state.currentGamesItem.steamid !== this.props.match.params.userId)
            return (
                <div className="games-section-wrapper">
                    <Loader show={this.props.games.loading}/>
                </div>
            )
        return (
            <div className="games-section-wrapper">
                <GamesLayout
                    gamesData={this.state.currentGamesItem.games}
                    page={this.props.match.params.page}
                />
            </div>
        )
    }
}


function mapStateToProps(state) {
    return{
        games: state.games
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetUserOwnGames: (userId) => dispatch(getUserOwnGames(userId)),
    dispatchClearErrorsUserOwnGames: () => dispatch(clearErrorsUserOwnGames())
})

export default connect(mapStateToProps, mapDispatchToProps)(GamesSection)


GamesSection.propTypes = {
    dispatchGetUserOwnGames: PropTypes.func,
    games:PropTypes.object,
    location:PropTypes.object,
    match:PropTypes.object
}