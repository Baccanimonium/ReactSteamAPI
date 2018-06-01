import React from 'react'
import styled from 'styled-components'


const Footer = () => {

    return (
        <FooterWrapper>raz-dva all rights reserved© 2018</FooterWrapper>
    )
}
const FooterWrapper =styled.footer`
    display: flex;
    background: rgba(0,0,0,0.6);
    opacity: 0.8;
    justify-content:center;
    align-items: center;
    border-top: 1px groove #e19f0b;
    height: 50px;
    box-shadow: 0 3px 38px -13px #e19f0b;
`
export default Footer