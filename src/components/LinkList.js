import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { FieldArray } from 'formik'

import LinkListItem from './LinkListItem'

const LinksList = ({ links }) => {
  return (
    <FieldArray name="links">
      {({ remove, push, move }) => (
        <Grid container direction="column" spacing={2}>
          {(links || []).map((link, index) => (
            <LinkListItem
              key={index}
              links={links}
              index={index}
              remove={remove}
              move={move}
              push={push}
            />
          ))}
          <Grid item>
            <Grid container justify="center">
              <Button
                onClick={() => push({ name: '', url: '' })}
                color="secondary"
                size="large"
              >
                <b>+ Add A Link</b>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </FieldArray>
  )
}

export default LinksList
