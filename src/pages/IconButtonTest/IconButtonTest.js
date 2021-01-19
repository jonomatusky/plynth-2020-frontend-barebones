import { IconLink } from 'components/IconLink'
import { Container, Grid } from '@material-ui/core'

const links = ['facebook.com', 'twitter.com', 'youtu.be']

const IconButtonTest = () => {
  return (
    <Container>
      <Grid container>
        {links.map((link, index) => {
          return (
            <Grid item key={index}>
              <IconLink link={link} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default IconButtonTest
