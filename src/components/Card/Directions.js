import React from 'react'
import styled from 'styled-components/macro'

export const Directions = ({ directions }) => {
  return (
    <DirectionsComponent>
      <StyledH3>Directions</StyledH3>
      <p>{directions}</p>
    </DirectionsComponent>
  )
}

const DirectionsComponent = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #31556D;
  padding: 0px 10px 10px 20px;
  background-color: #fffbfa;
  margin: -1px 10px 0 10px;
  border-right: 2px solid #FECAC1;
  border-left: 2px solid #FECAC1;
`

const StyledH3 = styled.h3`
  margin-top: 0;
`