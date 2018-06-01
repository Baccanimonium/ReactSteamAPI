import React, { Component } from 'react';
import User from './UserSection/Index'
import Header from './Header'
import {Router, Route, NavLink, Switch} from 'react-router-dom'
import history from '../history'
import styled from 'styled-components'
import background from '../public/img/counter-strike-global-offensive-uhd-4k-wallpaper.jpg'
import Footer from './Footer'

class App extends Component {
  render() {
    return (
        <Router history = {history}>
            <AppWrapper>
                <Header/>
                    <ContentWrapper>
                        <User/>
                    </ContentWrapper>
                <Footer/>
            </AppWrapper>
        </Router>

    )
  }
}
const ContentWrapper =styled.div`
    display: flex;
    width: 980px;
    align-self:center;
    justify-content: center;
     
`
const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: url(${background}) no-repeat center;
    background-size: 100%;
    color: #fff;
    font-size: 14px; 
`

export default App
