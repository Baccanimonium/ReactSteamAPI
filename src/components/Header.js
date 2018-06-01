import React from 'react'
import styled from 'styled-components'
import logo from '../public/img/2000px-Steam_icon_logo.svg.png'
import {H3} from "./UI/headers"

import {NavLink} from 'react-router-dom'
const Header = () => {

    return (

            <HeaderWrapper>
                <HeaderContentSpacer>
                    <LogoSpacer>
                        <H2>Powered by</H2>
                        <NavLink to="/">
                            <LogoImgSpacer src={logo}/>
                        </NavLink>
                    </LogoSpacer>
                    Retrieve data about the steam user of interest to you
                    in a convenient format!
                </HeaderContentSpacer>
            </HeaderWrapper>


    )
}
const HeaderWrapper =styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    background: rgba(0,0,0,0.6);
    justify-content:center;
    border-bottom: 1px groove #e19f0b;
    box-shadow: 3px 16px 52px -17px #e19f0b;
`
const HeaderContentSpacer = styled.div`
    width: 405px;
    color: rgb(225, 159, 11,1);
    font-size: 24px;
    padding-bottom: 25px;
`
const LogoSpacer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`
const H2= styled.h2`
    font-size: 30px;
    margin-bottom: 18px;
    color: #fff;
`
const LogoImgSpacer =styled.img`
    width: auto;
    height: 49px;
    margin-top: 10px;
`


export default Header
