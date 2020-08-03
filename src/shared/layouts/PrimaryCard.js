import React from 'react'

import { Typography, Box, Grid, Button } from '@material-ui/core'
import styled from 'styled-components'
import theme from '../../theme'

const PieceContainer = styled(Grid)``

const PieceBox = styled(Grid)`
  border: 1px solid ${theme.palette.secondary.main};
  background: ${theme.palette.background.paper};
`

const BarRow = styled(Grid)`
  background: ${theme.palette.secondary.main};
  padding-left: 10px;
  padding-right: 10px;
  color: ${theme.palette.background.paper};
`

const BarTitle = styled(Grid)`
  font-weight: bold;
  min-height: 1.5rem;
`

const BottomRow = styled(Grid)`
  border-top: 1px solid ${theme.palette.secondary.main};
  color: ${theme.palette.secondary.main};
`

const BarAction = styled(Grid)``

const PrimaryCard = ({
  title,
  topAction,
  topLabel,
  bottomAction,
  bottomLabel,
  children,
}) => {
  return (
    <PieceContainer container>
      <PieceBox container direction="column">
        <BarRow container justify="space-between">
          <BarTitle>
            <Typography color="inherit">{title || ''}</Typography>
          </BarTitle>
          {!!topAction && (
            <Grid>
              <Button color="inherit" onClick={topAction}>
                {topLabel}
              </Button>
            </Grid>
          )}
        </BarRow>
        {children}
        <Box height="2rem"></Box>
        {!!bottomAction && (
          <BottomRow container justify="center">
            <Grid>
              <Button color="inherit" onClick={bottomAction}>
                {bottomLabel}
              </Button>
            </Grid>
          </BottomRow>
        )}
      </PieceBox>
    </PieceContainer>
  )
}

export default PrimaryCard
