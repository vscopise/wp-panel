import React, { Component } from 'react';



import { 
  createMuiTheme,
  List,
  ListItem,
  ListItemText,
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

    let url = constants.SERVER_URL + 'wp-json/wp/v2/posts'

    this.setState({title: url})

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        posts: responseJson
      })
    })    
  }

  render() {
    return (
      


      <MuiThemeProvider theme={theme}>
        <List component="nav">
          {this.state.posts.map((post) => 
            <ListItem
              button
              
            >
              <ListItemText primary={post.title.rendered} />

            </ListItem>
          )}
        </List>
      </MuiThemeProvider>
    );
  }
}

export default Home;
