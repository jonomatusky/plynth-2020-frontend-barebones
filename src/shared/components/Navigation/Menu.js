import React from 'react'
import { Link } from 'react-router-dom'

import { Dialog, Button } from '@material-ui/core'

import styled from 'styled-components'
import theme from '../../../theme'

const MenuContainer = styled.div`
  background: ${theme.palette.background.default}
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 2rem;
`

const MenuRow = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${theme.palette.text};
  text-align: center;
`

const Menu = props => {
  return (
    <Dialog open={true}>
      <MenuContainer>
        <MenuRow>
          <Button onClick={props.onClose}>
            <p>Close X</p>
          </Button>
        </MenuRow>
        {props.items.map(item => {
          return (
            <MenuRow>
              <Button component={Link} to={item.link}>
                <p>{item.label}</p>
              </Button>
            </MenuRow>
          )
        })}
      </MenuContainer>
    </Dialog>
  )
}

export default Menu
