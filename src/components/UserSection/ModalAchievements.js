import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {getUserGameAchievements} from "../../actionCreaters/achievements"
import AchievementsSlide from './AchievementsSlide'
import Carousel from '../decorators/Carousel'
import {ModalTitle} from "../UI/headers"
import GameLayout from './GameLayout'

class ModalAchievements extends Component {

    componentWillMount() {
        this.props.dispatchGetUserGameAchievements()
    }

    render() {
        const game=localStorage.getItem('gameID')
        const currentGame=this.props.user.games.find(item=>item.appid == game)
        // console.log(caseItem)
        const {achievements}=this.props.achievements
        const { nextSlide, prevSlide} =this.props
        const transitionStyle = {
            transition: this.props.noTransition ?'0s':'transform 1s ease',
            transform: `translateX(calc(-${this.props.position}px*${300}))`
        }
        return (
                <ModalWrapper>
                    <BGModal/>
                    <ModalBlock>
                        <ModalHeader>
                            <ModalTitle>Unlocked Achievements!</ModalTitle>
                            <ModalClose onClick={(e) => this.props.PopUpModalWindow(e)}>х</ModalClose>
                        </ModalHeader>
                        <div className="modal-body">
                            <SliderContainer>
                                {achievements.length?
                                <SliderWrapper style={transitionStyle}>
                                    {achievements.map((child, index) => (
                                            <AchievementsSlide key={ index } data={child}/>
                                    ))}
                                    {achievements.map((child, index) => (
                                            <AchievementsSlide key={ index } data={child}/>
                                    ))}

                                </SliderWrapper>:''}
                                <ArrowWrapper>
                                    <SvgArrowLeft onClick={(e) => prevSlide(achievements.length,e)}>
                                        <use xlinkHref="#arrow-left" ></use>
                                    </SvgArrowLeft>
                                    <SvgArrowRight onClick={(e) => nextSlide(achievements.length,e)}>
                                        <use xlinkHref="#arrow-right" ></use>
                                    </SvgArrowRight>
                                </ArrowWrapper>

                            </SliderContainer>
                        </div>
                    </ModalBlock>
                </ModalWrapper>
        )
    }
}

function mapStateToProps(state) {
    return{
        achievements: state.achievements,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetUserGameAchievements: () => dispatch(getUserGameAchievements())
})

export default connect(mapStateToProps, mapDispatchToProps)(Carousel(ModalAchievements))
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
ModalAchievements.propTypes = {}