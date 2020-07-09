import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#C01575' },
    secondary: { main: '#FFD5E2' },
    background: {
      default: '#212421',
      paper: '#292D29',
    },
  },
  typography: {
    fontFamily: ['Degular', 'sans-serif'].join(','),
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
