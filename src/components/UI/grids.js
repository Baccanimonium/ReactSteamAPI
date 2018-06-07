import styled from 'styled-components'

export const FlexedDiv = styled.div`
    display: flex;
    background: #000000;
    padding: 10px;
`
export const GridDiv = styled.div`
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  min-width:950px;
`
export const ContactItemBlock = styled.div`
  display:flex;
  flex-direction: column;
  color: #ffffff;
  font-size: 13px;
  margin-left: 18px;
`
export const ContactItem = styled.div`
        span.name  {
          font-size: 14px;
          color: #898989;
          padding-left: 3px;
        }
`