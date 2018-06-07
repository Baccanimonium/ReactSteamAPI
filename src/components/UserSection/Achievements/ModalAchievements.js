import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {getUserGameAchievements} from "../../../actionCreaters/achievements"
import AchievementsSlide from './AchievementsSlide'
import Carousel from '../../decorators/Carousel'
import {ModalTitle} from "../../UI/headers"
import Loader from '../../../helpers/Loader'
import { CSSTransition } from 'react-transition-group'
import { withRouter } from 'react-router'
import {ErrorsBar} from "../../UI/headers"

// TODO need code spliting to decorators separate logic and simplify react transition animation

class ModalAchievements extends Component {
    state = {
        sortedAchievements: '',
        currentGameId:'',
        achievementsLength:''
    }
    // load achievement data depends on route param userId
    componentDidMount() {
        const {userId}=this.props.match.params
        this.props.dispatchGetUserGameAchievements(userId)
    }
    static getDerivedStateFromProps(nextProps, prevState){
        // check for matches in state
        if(nextProps.achievements.achievements.find(item=>item.gameId === localStorage.getItem('gameID')) !== undefined){
            // filter collection by user id
            const sortedUserArray=nextProps.achievements.achievements.filter(item=>item.steamID === nextProps.match.params.userId)
            // filter collection by app id
            const sortedGameArray=sortedUserArray.find(item=>item.gameId === localStorage.getItem('gameID'))
            // check the collection to prevent rare bugs
            if (sortedGameArray===undefined){
                return null
            }
            // sorting collection unlocked/locked achievements
            sortedGameArray.achievements.sort(function (a,b) {
                if (a.achieved < b.achieved) {
                    return 1;
                }
                if (a.achieved > b.achieved) {
                    return -1;
                }
                return 0;
            })
            return{
                sortedAchievements:sortedGameArray.achievements,
                achievementsLength:sortedGameArray.achievements.length,
                currentGameId:sortedGameArray.gameId
            }
        }
        return null
    }
    render() {
        const {sortedAchievements,achievementsLength} = this.state
        // prevSlide nextSlide respond for button and slide index
        const { nextSlide, prevSlide,PopUpModalWindow} =this.props
        // transtion style respond for translateX attribute on slides
        const transitionStyle = {
            transition: this.props.noTransition ?'0s':'transform 1s ease',
            transform: `translateX(calc(-${this.props.position}px*${300}))`
        }

        // render stuff show loader while required array collection not fetched or erros appear
        if(this.state.currentGameId !== localStorage.getItem('gameID') && this.props.achievements.error === null)
            return (
                <Loader show={this.state.currentGameId !== localStorage.getItem('gameID') && this.props.achievements.error === null}/>
            )
        //separated initial animation for elements
        return (
            <CSSTransition
                classNames="flip"
                timeout={300}
                appear
                in={this.props.open }
                unmountOnExit
            >
                <ModalWrapper>
                    <BGModal/>
                    <ModalBlock>
                        <ModalHeader>
                            <ModalTitle>Achievements!</ModalTitle>
                            <ModalClose onClick={(e) => PopUpModalWindow(e)}>х</ModalClose>
                        </ModalHeader>
                        {/*render slider if errors=null*/}
                        {
                            this.props.achievements.error === null ?
                                <div className="modal-body">
                                    <SliderContainer>
                                        <SliderWrapper style={transitionStyle}>
                                            {sortedAchievements.map((child, index) => (
                                                    <AchievementsSlide key={ index } data={child}/>
                                            ))}
                                            {sortedAchievements.map((child, index) => (
                                                    <AchievementsSlide key={ index } data={child}/>
                                            ))}
                                        </SliderWrapper>
                                        <ArrowWrapper>
                                            <SvgArrowLeft onClick={(e) => prevSlide(achievementsLength,e)}>
                                                <use xlinkHref="#arrow-left" ></use>
                                            </SvgArrowLeft>
                                            <SvgArrowRight onClick={(e) => nextSlide(achievementsLength,e)}>
                                                <use xlinkHref="#arrow-right" ></use>
                                            </SvgArrowRight>
                                        </ArrowWrapper>

                                    </SliderContainer>
                                </div>
                                :
                                // render errors
                                <ErrorsBar><span>Opps something gone wrong:</span><div>{this.props.achievements.error}</div></ErrorsBar>
                        }
                    </ModalBlock>
                </ModalWrapper>
            </CSSTransition>
        )
    }
}

function mapStateToProps(state) {
    return{
        achievements: state.achievements
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetUserGameAchievements: (userId) => dispatch(getUserGameAchievements(userId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Carousel(ModalAchievements)))

ModalAchievements.propTypes = {
    dispatchGetUserGameAchievements: PropTypes.func,
    PopUpModalWindow: PropTypes.func,
    prevSlide: PropTypes.func,
    nextSlide: PropTypes.func,
    achievements:PropTypes.object,
    match:PropTypes.object,
    filterState:PropTypes.object
}


const ModalWrapper = styled.div`
    display: inherit;
    position: fixed;
    top: 0;
    left: 0;    
    right: 0;    
    bottom: 0;    
    margin: 100px auto 0;    
    z-index: 500;    
    align-items: center;
`
const SliderContainer=styled.div`
  overflow: hidden;
`
const SliderWrapper = styled.div`
    transition: transform 1s ease 0s;
    display: flex;
`

const BGModal= styled.div`
    z-index: 10;
    top: 0;
    left: 0;    
    right: 0;    
    bottom: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.2);
`
const ModalBlock =styled.div`
    position: relative;
    left: 0;
    right: 0;
    top: 18px;
    bottom: 0;
    z-index: 15;
    border: 1px solid #e19f0b;
    padding: 10px;
    background: #000000;
    box-shadow: 3px 7px 59px -30px #e19f0b;
    max-width: 900px;
    width: 100%;
    margin:0 auto;
`
const ModalHeader = styled.div`
    position: relative;
    margin-bottom: 25px;
`
const ModalClose = styled.div`
    position: absolute;
    right: 2px;
    top: -47px;
    font-size: 20px;
    color: #e19f0b;
    cursor: pointer;
`
const SvgArrow = styled.svg`
    cursor: pointer;
    width: 64px;
    height: 64px;
    display: block;
    z-index: 10;
    transition: all .2s ease-in;
    fill: #fff;
    stroke: inherit;
    padding: 5px;
`
const ArrowWrapper =styled.div`
  display: flex;
  justify-content: center;
`
const SvgArrowLeft = SvgArrow.extend`
  left:42%;
  :hover{
    fill:#e19f0b;
    margin-right: 2px;
  }
`
const SvgArrowRight = SvgArrow.extend`
  right:42%;
  :hover{
    fill:#e19f0b;
    margin-left: 2px;
  }
`
