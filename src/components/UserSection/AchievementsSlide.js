import React from 'react';
import styled from 'styled-components'
import {ContactItem} from "../UI/grids"
import {TitleItem} from "../UI/headers"
import {formatDate} from "../../helpers/formatDate"
const AchievementsSlide = ({data}) => {
    const AchievedStatus = styled.span`
    color:${data.achieved? `green`: `red`};
    `
    const unlockDate=formatDate(data.unlocktime)
    return (
        <AchievementContainer>
            <AchievementItemBlock>
                <TextAlignTitleText>{data.name}</TextAlignTitleText>
                <ContactItem >
                    <span className="name">status:</span><AchievedStatus> {data.achieved >0? `Achieved`: `Non yet Achieved`}</AchievedStatus>
                </ContactItem>
                <ContactItem >
                    <span className="name">description:</span><span> {data.description}</span>
                </ContactItem>
                {
                    data.achieved >0?
                        <ContactItem >
                            <span className="name">unlocked at:</span><span> {unlockDate}</span>
                        </ContactItem>
                    :   ''
                }
            </AchievementItemBlock>
        </AchievementContainer>

    )
}

export default AchievementsSlide

const AchievementContainer =styled.div`
  display: flex;
  margin: 10px;
`
const AchievementItemBlock= styled.div`
  width: 280px;
  height: auto;
  
`
const TextAlignTitleText =TitleItem.extend`
  text-align: center;
`
