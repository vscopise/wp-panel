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


  componentDidMount(){
    if(this.props.token != '') {
      this.setState({title: 'title'})
    }

    /*let url = constants.SERVER_URL + 'wp-json/wp/v2/posts'

    fetch(url, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        posts: responseJson.data
      })
    })*/    
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Typography variant='h6' color='inherit'>
              {this.state.title}
        </Typography>
        {this.state.posts.map((post) => 
          <div>Post</div>
        )}
      </MuiThemeProvider>
    );
  }
}

export default Home;
