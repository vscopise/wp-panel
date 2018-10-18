import React, { Component } from 'react';
import { 
  AppBar, 
  createMuiTheme,
  Toolbar, 
  MuiThemeProvider,
  Typography 
} from '@material-ui/core'

import Login from './Pages/login'
import Home from './Pages/home'

const theme = createMuiTheme ({
  typography: {
      useNextVariants: true,
  }
})

class App extends Component {
  state = {
    connected: false,
    username: '',
    password: ''
  }

  handleConnected = (token) => {
    this.setState({ 
      connected: true,
      token: token 
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Typography variant='h6' color='inherit'>
              Panel de Administración
            </Typography>
          </Toolbar>
        </AppBar>
        {this.state.connected && <Home />}
        {!this.state.connected && <Login handler={this.handleConnected} />}
      </MuiThemeProvider>
    );
  }
}

export default App;
