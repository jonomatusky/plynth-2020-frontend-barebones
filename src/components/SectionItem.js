import React from 'react'

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'

const SectionItem = section => {
  return (
    <Accordion>
      <AccordionSummary></AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>
  )
}

export default SectionItem
