import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {H3} from "../UI/headers"

class FetchingUserForm extends Component {
    state = {
        userID: ''
    }
    handleUserInput= (type, e)=>{
        const {value} = e.target
        this.setState({
                [type]: value
            })
    }
    render() {
        return (
            <UserForm>
                <H3Yellow>Drone deployed. Enter User ID Soldier</H3Yellow>
                <div>
                    <Input
                        placeholder="Enter User Id"
                        type="text"
                        value={this.state.userID}
                    />
                    <YellowButton onClick={this.handleButtonClick}>
                        Hound him
                    </YellowButton>
                </div>
            </UserForm>
        )
    }
}

export default FetchingUserForm

const UserForm =styled.form`
    margin-top: 180px;
    margin-bottom: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: black;
    border: 1px solid rgb(225, 159, 11,0.6);
    padding: 33px 50px 50px;
    box-shadow: 3px 7px 59px -30px #e19f0b;
`
const Input = styled.input`
  opacity: 0.1;
  border-radius: 50px 0 0 50px;
  border-color: transparent;
`
const YellowButton = styled.button`
    border-radius: 0 50px 50px 0;
    border-color: transparent;
    cursor: pointer;
    background-color: rgb(225, 159, 11,0.6);
    :hover{
    box-shadow: 2px 3px 12px -3px rgba(225,159,11,0.6);
    }
    
`
const H3Yellow = H3.extend`
    color:#e19f0b;
`
FetchingUserForm.propTypes = {}