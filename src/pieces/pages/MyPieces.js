import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { useApiClient } from '../../shared/hooks/api-hook'
import { Container, Grid, Box, Button, Menu, MenuItem } from '@material-ui/core'
import { AuthContext } from '../../shared/context/auth-context'

import PageTitle from '../../shared/components/UIElements/PageTitle'
import PieceList from '../components/PieceList'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ActionButton from '../../shared/components/UIElements/ActionButton'
import SettingsIcon from '@material-ui/icons/Settings'

const { REACT_APP_BACKEND_URL } = process.env

const title = 'My Pieces'

const MyPieces = () => {
  const [loadedPieces, setLoadedPieces] = useState()
  const { isLoading, error, sendRequest, clearError } = useApiClient()
  const [anchorEl, setAnchorEl] = useState(null)
  const auth = useContext(AuthContext)
  let token = auth.token

  useEffect(() => {
    console.log('useEffect')
    const fetchPieces = async () => {
      try {
        const responseData = await sendRequest(`/users/me/pieces`)
        console.log('setting pieces')
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
            <MenuItem component={Link} to={'/admin/logout'}>
              Logout
            </MenuItem>
          </Menu>
        </PageTitle>
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          <Grid item xs={12}>
            <ActionButton
              component={Link}
              to={'/admin/create'}
              label="Create New Piece +"
            ></ActionButton>
          </Grid>
          {isLoading && <LoadingSpinner asOverlay />}
          {!isLoading && loadedPieces && (
            <Grid item>
              <PieceList items={loadedPieces} />
            </Grid>
          )}
        </Grid>
        <Box height="4rem"></Box>
      </Container>
    </React.Fragment>
  )
}

export default MyPieces
