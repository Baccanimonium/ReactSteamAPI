import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {H3} from "../../UI/headers"
import {FlexedDiv} from "../../UI/grids"
import {EmptyBatton} from "../../UI/buttons"
import { CSSTransition } from 'react-transition-group'
import Loader from '../../../helpers/Loader'
import {ErrorsBar} from "../../UI/headers"


class FetchingUserForm extends Component {
    state = {
        userID: '',
        showFetchingForm: true,
        showButton: false,
        loaded:false
    }
    // show form on mount
    componentDidMount(){
        this.setState({
            showFetchingForm:true
        })
    }
    static getDerivedStateFromProps(nextProps, prevState){
        // if new user has been loaded
        if(nextProps.userloaded && !nextProps.loading && !prevState.loaded){
            //hide form
            return{
                showFetchingForm:false,
                loaded:true
            }
        }
        return null
    }

    validateUserForm=()=>{
        return this.state.userID.length >6
    }

    handleFetchUser=()=>{
        // validate min Input length
        if (!this.validateUserForm()) return
        this.props.getUser(this.state.userID)
    }
    handleUserInput (type,e){
        const {value} = e.target
        this.setState({
                [type]: value
            })
    }

    // re open form
    handleOpenForm =()=>{
        this.setState({
            showButton: false
        })
    }

    render() {

        return (
            <FetchingUserFormWrapper>
                {/*loader while loading*/}
                <Loader show={this.props.loading}/>

                {/*fetchin user form start*/}
                <CSSTransition
                    classNames="fetchingForm"
                    timeout={500}
                    in={this.state.showFetchingForm}
                    onExited={() => {
                        this.setState({
                            showButton: true
                        })
                    }}
                    unmountOnExit
                >
                    <div className={`user-form ${!this.props.userloaded ?`border`:'' }`}>


                        <H3Yellow>Drone deployed. Enter User ID Soldier</H3Yellow>
                        <CSSTransition
                            classNames="fade"
                            timeout={500}
                            in={this.props.errors !== null && !this.props.userloaded}
                            appear
                            unmountOnExit
                        >
                            <ErrorsBar><span>Opps something gone wrong:</span><div>{this.props.errors}</div></ErrorsBar>
                        </CSSTransition>
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
                                 onClick={this.handleFetchUser}
                            >
                                Track him
                            </button>
                        </FlexedDiv>

                    </div>
                </CSSTransition>
                {/*fetching user form end*/}
                {/*button for reopen form*/}
                <CSSTransition
                    classNames="fade"
                    timeout={300}
                    in={!this.state.showFetchingForm && this.state.showButton}
                     onExited={() => {
                         this.setState({
                             showFetchingForm: true
                         })
                     }}

                    unmountOnExit
                >
                    <EmptyBatton onClick={this.handleOpenForm}>Find new user</EmptyBatton>
                </CSSTransition>
                {/*end button*/}
            </FetchingUserFormWrapper>
        )
    }
}

export default FetchingUserForm

FetchingUserForm.propTypes = {
    error:PropTypes.string,
    loading:PropTypes.bool,
    userloaded:PropTypes.bool,
    getUser:PropTypes.func
}
const FetchingUserFormWrapper = styled.div`
  min-height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
`

const UserForm =styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: black;
    padding: 33px 50px 50px;
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

