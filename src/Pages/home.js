import React, { Component } from 'react';



import { 
  createMuiTheme,
  MuiThemeProvider,
  Typography 
} from '@material-ui/core'

import * as constants from '../includes/constants'

const theme = createMuiTheme ({
  typography: {
      useNextVariants: true,
  }
})

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      isLoading: true
    } 
  }


  componentWillMount(){

    fetch(url, {
      method: "GET",
      headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          username: username,
          password: password
      })
  })
  .then((response) => response.json())
  .then((responseJson) => {
      let token = responseJson.token
      //let status = responseJson.data.status
      //console.log(token)
      this.setState({
          token: token,
          //status: status
      })
      if ( undefined !== token ){
          this.props.handler(token)
      }


    axios
      .get( 'https://www.carasycaretas.com.uy/wp-json/wp/v2/posts' )
      .then(res => {
        this.setState({ 
          posts: res.data,
          isLoading: false 
        });
      })
      .catch(error => console.log(error));
  }

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
