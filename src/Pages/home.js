import React, { Component } from 'react';

import { 
  Checkbox,
  createMuiTheme,
  List,
  ListItem,
  ListItemText,
  MuiThemeProvider,
  Paper,
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

const styles = {
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    td_id: {
      width: '10%',
    },
    td_tit: {
      width: '30%',
    }
}

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      categories: [],
      tags: [],
      isLoading: true
    } 
    const categories = this.state.categories
  }



  componentDidMount(){

    let url = constants.SERVER_URL 

    this.setState({title: url})

    fetch(url + 'wp-json/wp/v2/posts')
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        posts: response
      })
    })
    
    fetch(url + 'wp-json/wp/v2/categories')
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        categories: response
      })
    })

    fetch(url + 'wp-json/wp/v2/tags')
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        tags: response
      })
    })

  }

  onSelectAllClick = () => {}

  render(props) {
    const classes = {props}

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell numeric style={styles.td_id}>Id</TableCell>
            <TableCell style={styles.td_tit}>Título</TableCell>
            <TableCell padding={'dense'}>Categorías</TableCell>
            <TableCell padding={'dense'}>Etiquetas</TableCell>
            <TableCell padding={'dense'}>Fecha</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.posts.map((post) => 
            <TableRow hover={true}>
              <TableCell numeric padding={'dense'}>
                {post.id}
              </TableCell>
              <TableCell padding={'dense'}>
                {post.title.rendered}
              </TableCell>
              <TableCell padding={'dense'}>
                {post.categories.map((cat) => 
                  <span key={this.state.categories[cat-1].id}>
                      {this.state.categories[cat-1].name}, 
                  </span>
                )}
              </TableCell>
              <TableCell padding={'dense'}>
               {post.tags.map((tag) => 
                  <span>
                      {tag}, 
                  </span>
                )}

              </TableCell>
              <TableCell padding={'dense'}>{post.date}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}

export default Home;
