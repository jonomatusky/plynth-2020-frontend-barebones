import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Grid } from '@material-ui/core'

import PageTitle from 'components/PageTitle'
import PieceList from './components/PieceList'
import LoadingSpinner from 'components/LoadingSpinner'
import ActionButton from 'components/ActionButton'
import FilterButtons from 'components/FilterButtons'

import { useSAPiecesStore } from 'hooks/store/use-sa-pieces-store'

const title = 'Pieces'

const filterButtons = [
  {
    label: 'Active',
    filterLabel: 'ACTIVE',
  },
  { label: 'All', filterLabel: 'ALL' },
  { label: 'Removed', filterLabel: 'REMOVED' },
]

const SAViewPieces = () => {
  const {
    getPiecesByFilter,
    fetchPieces,
    status,
    setFilter,
    filter,
  } = useSAPiecesStore()
  const pieces = getPiecesByFilter()
  const history = useHistory()

  const handleClick = () => {
    history.push('/admin/create/style')
  }

  useEffect(() => {
    const fetch = async () => {
      await fetchPieces()
    }
    if (status === 'idle') {
      fetch()
    }
  }, [fetchPieces, status])

  return (
    <Container maxWidth="sm">
      <PageTitle title={title} />
      <Grid container direction="column" alignItems="stretch" spacing={2}>
        <Grid item xs={12}>
          <ActionButton
            onClick={handleClick}
            label="Create New Piece +"
          ></ActionButton>
        </Grid>
        <Grid item>
          <FilterButtons
            items={filterButtons}
            currentFilter={filter}
            filterFunction={setFilter}
          />
        </Grid>
        {!pieces && <LoadingSpinner asOverlay />}
        {pieces && (
          <Grid item>
            <PieceList items={pieces} />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default SAViewPieces
