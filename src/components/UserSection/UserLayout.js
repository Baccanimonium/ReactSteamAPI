import React from 'react';
import {FlexedDiv,ContactItem, ContactItemBlock} from "../UI/grids"
import styled from 'styled-components'
import {MiniButton} from "../UI/buttons"
import {TitleItem} from "../UI/headers"


const UserLayout = (data) => {
    const {avatarfull,steamid,personaname,personastate,timecreated,gameextrainfo,loccityid,loccountrycode}=data.userData
    return (
        <FlexedDiv>
            <div><img src={avatarfull} alt=""/></div>
            <ContactItemBlock>
                <TitleItem>Data of account: {steamid} ID   </TitleItem>
                <ContactItem ><span className="name">name:</span><span>{personaname}</span></ContactItem>
                <ContactItem ><span className="name">account created:</span><span>{timecreated}</span></ContactItem>
                <ContactItem ><span className="name">location:{loccountrycode}</span> <span>{loccityid}</span></ContactItem>
                <MiniButton onClick={data.getUserOwnGames}>Get more user info</MiniButton>
            </ContactItemBlock>
        </FlexedDiv>
    )
}

export default UserLayout



