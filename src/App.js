import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import Login from './Pages/login'
import Home from './Pages/home'


class App extends Component {
  state = {
    connected: false,
    username: '',
    password: ''
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Fragment>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Typography variant='h6' color='inherit'>
              Panel de Administración
            </Typography>
          </Toolbar>
        </AppBar>
        {this.state.connected && <Home />}
        {!this.state.connectd && <Login />}
      </Fragment>
    );
  }
}

export default App;
