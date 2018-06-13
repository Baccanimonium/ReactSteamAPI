import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getUser} from "../../../actionCreaters/user"
import FetchingUserForm from './FetchingUserForm'
import UserLayout from './UserLayout'
import { CSSTransition } from 'react-transition-group'


class UserSection extends Component {
    state = {
        currentUserData: false
    }
    static getDerivedStateFromProps(nextProps, prevState){
        // check for matches in state
        const currentUser=nextProps.user.users.find(item=>item.steamid === localStorage.getItem('userID'))
        if(currentUser){
            return{
                currentUserData:currentUser
            }
        }

        return null
    }
    getUserClick = (userId) => {
        localStorage.setItem('userID', userId)
        const {dispatchGetUser} =this.props
        dispatchGetUser(userId)

    }


    render() {
        return (
            <div className={`main-content-block ${this.state.currentUserData? 'active':''}`} >

                {/*fetching user form start*/}

                <FetchingUserForm
                    getUser={this.getUserClick}
                    loading={this.props.user.loading}
                    // handling redirect error
                    errors={this.props.location.state !== undefined?this.props.location.state.error : this.props.user.error}
                    userloaded={this.state.currentUserData}
                />
                {/*fetching user form end*/}

                {/*user data*/}
                <CSSTransition
                    classNames="fade"
                    timeout={500}
                    in={this.state.currentUserData.steamid === localStorage.getItem('userID')}

                    appear
                    exit={false}
                    unmountOnExit
                >
                    <UserLayout  userData={this.state.currentUserData} />
                </CSSTransition>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetUser: (userId) => dispatch(getUser(userId))

})

export default connect(mapStateToProps, mapDispatchToProps)(UserSection)



UserSection.propTypes = {
    dispatchGetUser: PropTypes.func,
    user:PropTypes.object
}