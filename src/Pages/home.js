import React, { Component } from 'react';

import { 
  createMuiTheme,
  MuiThemeProvider,
  Typography 
} from '@material-ui/core'

const theme = createMuiTheme ({
  typography: {
      useNextVariants: true,
  }
})

class Home extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Typography variant='h6' color='inherit'>
              Home
        </Typography>
      </MuiThemeProvider>
    );
  }
}

export default Home;
