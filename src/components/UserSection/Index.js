import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getUser} from "../../actionCreaters/user"
import FetchingUserForm from './FetchingUserForm'

class UserSection extends Component {


    handleButtonClick = () => {
        const {dispatchGetUser} =this.props
        dispatchGetUser()
    }

    render() {
        // console.log(this.props.user)
        return (
            <FetchingUserForm/>

        )
    }
}

function mapStateToProps(state) {
    return{
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetUser: () => dispatch(getUser())
})



export default connect(mapStateToProps, mapDispatchToProps)(UserSection)


UserSection.propTypes = {}