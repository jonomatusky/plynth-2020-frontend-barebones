import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'
import { Container, Grid, Box, Button, Menu, MenuItem } from '@material-ui/core'

import PageTitle from '../../shared/components/UIElements/PageTitle'
import PieceList from '../components/PieceList'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ActionButton from '../../shared/components/UIElements/ActionButton'
import SettingsIcon from '@material-ui/icons/Settings'

const { REACT_APP_BACKEND_URL } = process.env

const title = 'My Pieces'

const ViewPieces = () => {
  const [loadedPieces, setLoadedPieces] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/pieces`
        )
        setLoadedPieces(responseData.pieces)
      } catch (err) {}
    }
    fetchPieces()
  }, [sendRequest])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <PageTitle title={title}>
          <Button onClick={handleClick} endIcon={<SettingsIcon />}>
            Settings
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to={'/users'}>
              Users
            </MenuItem>
            <MenuItem component={Link} to={'/logout'}>
              Logout
            </MenuItem>
          </Menu>
        </PageTitle>
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && loadedPieces && (
          <Grid container direction="column" alignItems="stretch" spacing={2}>
            <Grid item xs={12}>
              {/* <Button
              variant="contained"
              color="primary"
              component={NavLink}
              to={'/create'}
              disableElevation={true}
              fullWidth={true}
            >
              Create New Piece +
            </Button> */}
              <ActionButton
                component={Link}
                to={'/create'}
                label="Create New Piece +"
              ></ActionButton>
            </Grid>
            <Grid item>
              <PieceList items={loadedPieces} />
            </Grid>
          </Grid>
        )}
        <Box height="4rem"></Box>
      </Container>
    </React.Fragment>
  )
}

export default ViewPieces
