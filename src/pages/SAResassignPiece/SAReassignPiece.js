import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import * as Yup from 'yup'

import { Grid, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { useSAUsersStore } from 'hooks/store/use-sa-users-store'
import { useAlertStore } from 'hooks/store/use-alert-store'
import FormLayout from 'layouts/FormLayout'
import { fetchPieces } from 'redux/piecesSlice'
import { useSAPiecesStore } from 'hooks/store/use-sa-pieces-store'

import { yupResolver } from '@hookform/resolvers/yup'

import UserAutocomplete from 'components/UserAutocomplete'
import ActionButton from 'components/ActionButton'

const SAReassignPiece = () => {
  const history = useHistory()
  const { fetchUserList, userListStatus, users } = useSAUsersStore()
  const {
    pieceStatus,
    fetchPiece,
    piece,
    updatePiece,
    updateStatus,
  } = useSAPiecesStore()

  const { setMessage } = useAlertStore()
  const { pieceId } = useParams()

  useEffect(() => {
    if (pieceStatus === 'idle') {
      fetchPiece(pieceId)
    }
  })

  useEffect(() => {
    if (userListStatus === 'idle') {
      fetchUserList()
    }
  }, [fetchUserList, userListStatus])

  const defaultValues = {
    owner: null,
  }

  const validationSchema = Yup.object({
    owner: Yup.object().required('Required'),
  })

  const { register, handleSubmit, errors, control, watch } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues,
    shouldUnregister: false,
  })
  // console.log(errors)

  const onSubmit = async values => {
    console.log(values)

    try {
      await updatePiece({ id: pieceId, ...values })
      setMessage({ message: 'The piece has been reassigned.' })
      history.push(`/superadmin/pieces/${pieceId}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <FormLayout
      title="Change Username"
      message={
        <>Enter the username of the new peice owner to reassign this piece.</>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              render={props => (
                <Autocomplete
                  id={'owner'}
                  options={users}
                  getOptionLabel={option => option.username}
                  getOptionSelected={(option, value) => option.id === value.id}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Username"
                      variant="outlined"
                      error={Boolean(errors.owner)}
                      helperText={errors.owner && 'Required'}
                    />
                  )}
                  renderOption={option => option.username}
                  onChange={(_, data) => props.onChange(data)}
                />
              )}
              name={'owner'}
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <ActionButton
              type="submit"
              label={'Reassign'}
              loading={updateStatus === 'loading' || pieceStatus === 'loading'}
            />
          </Grid>
        </Grid>
      </form>
    </FormLayout>
  )
}

export default SAReassignPiece
