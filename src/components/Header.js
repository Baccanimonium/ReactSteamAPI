import React from 'react'
import styled from 'styled-components'
import {H2} from "./UI/headers"
import {NavLink} from 'react-router-dom'


const Header = () => {

    return (

            <HeaderWrapper>
                <HeaderContentSpacer>
                    <LogoSpacer>
                        <H2>Powered by</H2>
                        <NavLink to="/">
                            <LogoImgSpacer src="/server/dist/2000px-Steam_icon_logo.svg.png"/>
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
    font-size: 18px;
    padding-bottom: 25px;
`
const LogoSpacer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`
const LogoImgSpacer =styled.img`
    width: auto;
    height: 49px;
    margin-top: 10px;
`


export default Header
