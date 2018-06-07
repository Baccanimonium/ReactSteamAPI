import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {GridDiv} from "../../UI/grids"
import GameLayout from './GameLayout'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import ModalAchievements from '../Achievements/ModalAchievements'
import Select from 'react-select'
import {FILTER_STATE_NAME_ZA,FILTER_STATE_NAME_AZ,FILTER_STATE_GAME_PLAY_TIME_MINMAX,FILTER_STATE_GAME_PLAY_TIME_MAXMIN} from "../../../helpers/constants"
import {setFilterState} from "../../../actionCreaters/filter";
import { CSSTransition } from 'react-transition-group'

class GamesLayout extends Component {
    state = {
        modalOpen: false,
        selectedOption: '',
        currentFilter: '',
        sortedGames:[],
        chunkedGames:[],
        maxPaginationNumber:''
    }
    static getDerivedStateFromProps(nextProps, prevState){

        // init chunked array, pagination length
        if (nextProps.gamesData !== prevState.sortedGames){
            const rows = nextProps.gamesData.reduce((acc, el, i) => {
                if (i % 20 === 0) acc.push([])
                acc[acc.length - 1].push(el)
                return acc
            }, [])
            return{
                sortedGames: nextProps.gamesData,
                chunkedGames: rows,
                maxPaginationNumber:(rows.length)
            }
        }
        // check switch sort state
        if(nextProps.filterState.filterState !== prevState.currentFilter){
            // flitred from current filter function from state
            nextProps.filterState.filterFunction(prevState.sortedGames)
            // chunk array for pagination
            const rows = prevState.sortedGames.reduce((acc, el, i) => {
                if (i % 20 === 0) acc.push([])
                acc[acc.length - 1].push(el)
                return acc
            }, [])
            return{
                currentFilter: nextProps.filterState.filterState,
                chunkedGames:rows
            }
        }

        return null
    }
    // scroll to top if switch location
    componentDidUpdate(prevProps) {
        if (this.props.page !== prevProps.page) {
            window.scrollTo(0, 150)
        }
    }
    // open modal window with acievements. save selected gameID to local Storage
    handleToggleModalWindow (gameID){
        if(gameID>0){localStorage.setItem('gameID', `${gameID}`)}
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }))
    }
    // switch sort mode, dispatch action to store
    handleChange(selectedOption){
        this.setState({ selectedOption })
        this.props.dispatchSetFilterState(selectedOption.value)
    }
    render() {
        const {maxPaginationNumber} = this.state
        const {page}=this.props
        return (
            // initial animation
            <CSSTransition
                classNames="fade"
                timeout={500}
                appear
                in={this.state.chunkedGames.length>0}
                unmountOnExit
            >

                    <GridDiv>
                        {/*switch sort state stuff start*/}
                        <Select
                            searchable={false}
                            clearable={false}
                            autosize={false}
                            onChange={(e) =>this.handleChange(e)}
                            value={this.state.selectedOption}
                            options={[
                                { value: FILTER_STATE_NAME_ZA, label: 'Filter Games from Z to A' },
                                { value: FILTER_STATE_NAME_AZ, label: 'Filter Games from A to Z' },
                                { value: FILTER_STATE_GAME_PLAY_TIME_MINMAX, label: 'Filter Games from Min time played to Max' },
                                { value: FILTER_STATE_GAME_PLAY_TIME_MAXMIN, label: 'Filter Games from Max time played to Min '}]}
                        />
                        {/*switch sort state stuff end*/}

                        {/*start games items section*/}
                        {this.state.chunkedGames[page-1].map((row, index) => (
                            <GameLayout
                                key={index}
                                data={row}
                                PopUpModalWindow={(e) => this.handleToggleModalWindow(e)}
                            />
                        ))}
                        {/*end games items section*/}

                        {/*start pagination stuff*/}
                        <PaginationRow>
                            {
                                page > 1
                                    ?
                                    <PaginationBackGround >
                                        <StyledPaginationLink to={`/${localStorage.getItem(`userID`)}/own-games/1`} activeClassName="current">
                                            1
                                        </StyledPaginationLink>
                                    </PaginationBackGround>
                                    : ''
                            }
                            {
                                page-2 >1
                                    ?
                                    <PaginationBackGround >
                                        <StyledPaginationLink to={`/${localStorage.getItem(`userID`)}/own-games/${page-2}`} activeClassName="current">
                                            {page-2}
                                        </StyledPaginationLink>
                                    </PaginationBackGround>
                                    : ''
                            }
                            {
                                page-1 > 1
                                    ?
                                    <PaginationBackGround >
                                        <StyledPaginationLink to={`/${localStorage.getItem(`userID`)}/own-games/${page-1}`} activeClassName="current">
                                            {page-1}
                                        </StyledPaginationLink>
                                    </PaginationBackGround>
                                :''
                            }
                            <PaginationBackGround >
                                <StyledPaginationLink to={`/${localStorage.getItem(`userID`)}/own-games/${page}`} activeClassName="current">
                                    {page}
                                </StyledPaginationLink>
                            </PaginationBackGround>
                            {
                                parseInt(page)+1 < maxPaginationNumber
                                ?
                                    <PaginationBackGround >
                                        <StyledPaginationLink to={`/${localStorage.getItem(`userID`)}/own-games/${parseInt(page)+1}`} activeClassName="current">
                                            {parseInt(page)+1}
                                        </StyledPaginationLink>
                                    </PaginationBackGround>
                                : ''
                            }
                            {
                                parseInt(page)+2 <maxPaginationNumber
                                ?
                                    <PaginationBackGround >
                                        <StyledPaginationLink to={`/${localStorage.getItem(`userID`)}/own-games/${parseInt(page)+2}`} activeClassName="current">
                                            {parseInt(page)+2}
                                        </StyledPaginationLink>
                                    </PaginationBackGround>
                                : ''
                            }
                            {
                                page <maxPaginationNumber
                                ?
                                    <PaginationBackGround >
                                        <StyledPaginationLink to={`/${localStorage.getItem(`userID`)}/own-games/${maxPaginationNumber}`} activeClassName="current">
                                            {maxPaginationNumber}
                                        </StyledPaginationLink>
                                    </PaginationBackGround>
                                : ''
                            }
                        </PaginationRow>

                        {/*end pagination stuff*/}

                        {/*modal window with animation start. animation here only for exiting*/}
                        <CSSTransition
                            classNames="flip"
                            timeout={300}
                            enter={false}
                            in={this.state.modalOpen}
                            unmountOnExit
                        >
                                  <ModalAchievements open={this.state.modalOpen} PopUpModalWindow={(e) => this.handleToggleModalWindow(e)}/>
                        </CSSTransition>
                        {/*modal window with animation end*/}
                    </GridDiv>

            </CSSTransition>
        )
    }
}

function mapStateToProps(state) {
    return{

        filterState: state.filter
    }
}
const mapDispatchToProps = dispatch => ({
    dispatchSetFilterState: (filterState) => dispatch(setFilterState(filterState)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GamesLayout)

GamesLayout.propTypes = {
    dispatchSetFilterState: PropTypes.func,
    gamesData:PropTypes.array,
    page:PropTypes.string,
    filterState:PropTypes.object
}

const PaginationRow = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  display: flex;
  justify-content: center;
`
const PaginationBackGround = styled.div`
            margin: 0 12px 0 0;
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            border: 2px solid transparent;
            font-size: 20px;
            border-radius:100%;
`
const StyledPaginationLink =styled(NavLink)`
  text-decoration: none;
  color: #acacac;
`