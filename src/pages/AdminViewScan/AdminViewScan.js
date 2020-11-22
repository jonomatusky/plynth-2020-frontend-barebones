import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Grid, Box } from '@material-ui/core'

import {
  PieceBox,
  BarRow,
  ImageBox,
  CardRow,
  PieceTitle,
  DescriptionText,
} from 'components/CardSections'
import styled from 'styled-components'

import { useApiClient } from 'hooks/api-hook'

import Background from 'layouts/Background'

const ScanImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const ViewScan = () => {
  const { sendRequest } = useApiClient()
  const [scan, setScan] = useState(null)
  const scanId = useParams().scanId

  const history = useHistory()

  useEffect(() => {
    const fetchScan = async () => {
      try {
        const responseData = await sendRequest({ url: `/scans/${scanId}` })
        console.log(responseData)
        setScan(responseData.scan)
      } catch (err) {}
    }
    fetchScan()
  }, [scanId, sendRequest])

  const handleClose = event => {
    history.goBack()
  }

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs">
        <Grid container justify="flex-start" direction="column" spacing={2}>
          <Box height="4vh"></Box>
          {scan && (
            <PieceBox container direction="column">
              <BarRow onClick={handleClose} buttonLabel="Close X" />
              <CardRow container direction="column">
                <Box padding="0.5rem">
                  <Grid item>
                    {scan.piece ? (
                      <PieceTitle variant="h5">{scan.pieceTitle}</PieceTitle>
                    ) : (
                      <PieceTitle variant="h5">No Match</PieceTitle>
                    )}
                  </Grid>
                  <Grid item>
                    <DescriptionText>
                      picked up by
                      {scan.owner ? scan.owner.displayName : 'Anonymous'}
                    </DescriptionText>
                  </Grid>
                  <Grid item>
                    <DescriptionText>
                      on {new Date(scan.createdAt).toLocaleString()}
                    </DescriptionText>
                  </Grid>
                </Box>
              </CardRow>
              <CardRow container>
                <Grid item>
                  <ImageBox item>
                    <ScanImage src={scan.imageLink} alt="Preview" />
                  </ImageBox>
                </Grid>
              </CardRow>
            </PieceBox>
          )}
          <Box height="10vh"></Box>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default ViewScan
