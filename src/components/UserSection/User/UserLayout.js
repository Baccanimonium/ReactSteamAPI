import React from 'react';
import {FlexedDiv,ContactItem, ContactItemBlock} from "../../UI/grids"
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {MiniButton} from "../../UI/buttons"
import {TitleItem} from "../../UI/headers"
import {formatDate} from '../../../helpers/formatDate'
// import PropTypes from 'prop-types'

const UserLayout = (data) => {
    const {avatarfull,steamid,personaname,personastate,timecreated,loccityid,loccountrycode}=data.userData
    // img with border. color depends of user status online
    const BorderedImg = styled.img`
    ${personastate>0? `border: 3px solid green;`:`border: 3px solid red;`}
`
    const readableData=timecreated >0 ?formatDate(timecreated):''
    return (
        <FlexedDiv>
            <div><BorderedImg src={avatarfull} alt=""/></div>
            <ContactItemBlock>
                <TitleItem>Data of account: {steamid} ID   </TitleItem>
                <ContactItem ><span className="name">name:</span><span>{personaname}</span></ContactItem>
                <ContactItem ><span className="name">account created:</span><span>{readableData}</span></ContactItem>
                <ContactItem ><span className="name">location:{loccountrycode}</span> <span>{loccityid}</span></ContactItem>
                <StyledNavLink  to={`/${steamid}/own-games`}>
                    <MiniButton >
                        Get more user info
                    </MiniButton>
                </StyledNavLink>
            </ContactItemBlock>
        </FlexedDiv>
    )
}

export default UserLayout

// UserLayout.propTypes = {
//     userData: PropTypes.object
// }

const StyledNavLink=styled(NavLink)`
    text-align: center;
`