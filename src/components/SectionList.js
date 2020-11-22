import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { FieldArray } from 'formik'

import SectionListItem from './SectionListItem'

const SectionList = ({ sections, setFieldValue }) => {
  return (
    <FieldArray name="sections">
      {({ remove, push, move }) => (
        <Grid container direction="column" spacing={2}>
          {(sections || []).map((section, index) => (
            <SectionListItem
              key={index}
              sections={sections}
              index={index}
              remove={remove}
              move={move}
              push={push}
              setFieldValue={setFieldValue}
            />
          ))}
          <Grid item>
            <Grid container justify="center">
              <Button
                onClick={() =>
                  push({
                    title: '',
                    text: '',
                    links: [],
                    linkListIsSecondary: false,
                    users: [],
                  })
                }
                color="secondary"
                size="large"
              >
                <b>+ Add Section</b>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </FieldArray>
  )
}

export default SectionList
