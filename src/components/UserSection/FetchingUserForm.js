import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {H3} from "../UI/headers"
import {FlexedDiv} from "../UI/grids"
import {NavLink} from 'react-router-dom'

import FormValidation from '../decorators/FormValidation'

class FetchingUserForm extends Component {
    state = {
        userID: ''
    }
    handleUserInput (type,e){
        const {value} = e.target
        this.setState({
                [type]: value
            })
    }
    validateUserForm=()=>{

       return this.state.userID.length >6
    }
    render() {
        return (
            <div className={`user-form animated ${this.props.userloaded? 'swingOutX inactive' : 'swingInX'}`}>


                <H3Yellow>Drone deployed. Enter User ID Soldier</H3Yellow>

                <FlexedDiv>
                    <Input
                        placeholder="Enter User Id"
                        type="text"
                        value={this.state.userID}
                        onChange={(e) => this.handleUserInput('userID',e)}
                    />
                    <button
                        className={`inactive-button ${this.validateUserForm()? `active`:''}`}
                        // disabled={this.validateUserForm()}
                         onClick={this.props.getUser}
                    >
                        Track him
                    </button>
                </FlexedDiv>
            </div>
        )
    }
}

export default FetchingUserForm


const UserForm =styled.form`
    margin-top: 30px;
    margin-bottom: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: black;
    border: 1px solid rgb(225, 159, 11,0.6);
    padding: 33px 50px 50px;
    box-shadow: 3px 7px 59px -30px #e19f0b;
`
const Input = styled.input`
  background-color: #191919;
  color: #fff;
  border-color: transparent;
  border-radius: 50px 0 0 50px;
  padding: 5px;
  padding-left: 10px;
`
const H3Yellow = H3.extend`
    color:#e19f0b;
`
FetchingUserForm.propTypes = {
    location:PropTypes.string
}