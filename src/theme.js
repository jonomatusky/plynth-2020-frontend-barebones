import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#CD0A64' },
    secondary: { main: '#FFD5E2' },
    error: { main: '#FF9516' },
    background: {
      default: '#000000',
      card: '#212421',
      input: '#151715',
      paper: '#373634',
    },
  },
  typography: {
    fontFamily: ['Degular', 'sans-serif'].join(','),
    h5: {
      lineHeight: '1.5rem',
    },
    h6: {
      lineHeight: '1.25rem',
    },
  },
  // overrides: {
  //   MuiBottomNavigation: {
  //     root: {
  //       backgroundColor: 'black',
  //     },
  //   },
  //   MuiBottomNavigationAction: {
  //     root: {
  //       color: 'white',
  //     },
  //   },
  // },
})

export default theme
