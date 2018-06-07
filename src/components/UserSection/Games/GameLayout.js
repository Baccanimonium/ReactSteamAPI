import React from 'react'
import PropTypes from 'prop-types'
import {FlexedDiv,ContactItem, ContactItemBlock} from "../../UI/grids"
import {TitleItem} from "../../UI/headers"
import {MiniButton} from "../../UI/buttons"

const GameLayout = (data) => {
    const {name,appid,playtime_forever,img_logo_url}=data.data
    return (
        <CentredFlexedDiv>
            <TitleItem>Data of game: {appid} ID</TitleItem>
            <div>
                <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${img_logo_url}.jpg`} alt=""/>
            </div>
            <ContactItemBlockMrTop>
                <ContactItem ><span className="name">game name:</span><span> {name}</span></ContactItem>
                <ContactItem ><span className="name">hours played:</span><span> {playtime_forever}</span></ContactItem>
                <MiniButton onClick={(e) => data.PopUpModalWindow(appid,e)}>Get achiviments</MiniButton>
            </ContactItemBlockMrTop>
        </CentredFlexedDiv>
    )
}

export default GameLayout

const CentredFlexedDiv = FlexedDiv.extend`
  flex-direction: column;
  align-items: center;
`
const ContactItemBlockMrTop = ContactItemBlock.extend`
  margin: 15px 0;
`

GameLayout.propTypes = {
    PopUpModalWindow: PropTypes.func,
    data:PropTypes.object
}