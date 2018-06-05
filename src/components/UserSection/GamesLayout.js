import React, {Component} from 'react'
import {GridDiv} from "../UI/grids"
import GameLayout from './GameLayout'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import ModalAchievements from './ModalAchievements'

class GamesLayout extends Component {
    state = {
        modalOpen: false
    }
    handleToggleModalWindow (gameID){
        if(gameID>0){localStorage.setItem('gameID', `${gameID}`)}
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }))
    }
    render() {
        const rows = this.props.gamesData.reduce((acc, el, i) => {
            if (i % 20 === 0) acc.push([])
            acc[acc.length - 1].push(el)
            return acc
        }, [])
        //init pagination
        const items = []
        for (let i = 1; i <= Math.floor((this.props.gamesData.length) / 20) + 1; i++) {
            items.push(<PaginationBackGround key={i}>
                    <StyledPaginationLink to={`/case_studies/`} activeClassName="current">
                        {i}
                    </StyledPaginationLink>
                </PaginationBackGround>
            )
        }
        return (
            <GridDiv>
                {rows[0].map((row, index) => (
                    <GameLayout
                        key={index}
                        data={row}
                        PopUpModalWindow={(e) => this.handleToggleModalWindow(e)}
                    />
                ))}
                <PaginationRow>{items}</PaginationRow>
                {this.state.modalOpen? <ModalAchievements PopUpModalWindow={(e) => this.handleToggleModalWindow(e)}/>:''}
            </GridDiv>
        )
    }
}


export default GamesLayout

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