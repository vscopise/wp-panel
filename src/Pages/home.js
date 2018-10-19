import React, { Component } from 'react';

import { 
  Checkbox,
  createMuiTheme,
  List,
  ListItem,
  ListItemText,
  MuiThemeProvider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography 
} from '@material-ui/core'

import * as constants from '../includes/constants'

const styles = theme => ({
    table: {
      minWidth: 700
    },
    td_id: {
      minWidth:'10%'
    },
    td_tit: {
      minWidth:'20%'
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

  onSelectAllClick = () => {}

  render(props) {
    const classes = {props}

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell numeric>Id</TableCell>
            <TableCell className={classes.td_tit}>Título</TableCell>
            <TableCell padding={'dense'}>Categorías</TableCell>
            <TableCell padding={'dense'}>Etiquetas</TableCell>
            <TableCell padding={'dense'}>Fecha</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.posts.map((post) => 
            <TableRow hover={true} style={{ height: 48 }}>
              <TableCell numeric>{post.id}</TableCell>
              <TableCell padding={'dense'}>{post.title.rendered}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{post.date}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}

export default Home;
