import React, { Component, Fragment } from 'react';

import { 
  Checkbox,
  createMuiTheme,
  List,
  ListItem,
  ListItemText,
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
import axios from 'axios'

import * as constants from '../includes/constants'
import '../includes/styles.css'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      totalPosts: null,
      page: 1,
      isLoading: false
    } 
  }

  componentWillMount(){

    let url = constants.SERVER_URL 

    this.setState({title: url})

    /*fetch(url + 'wp-json/wp/v2/posts')
    .then((response) => {
      response.json()
      //console.log(response.headers)
    })
    .then((response) => {
      this.setState({
        posts: response,
        isLoading: false
      })
    })*/

    axios
      .get(url + 'wp-json/wp/v2/posts')
      .then(res => {
        this.setState({
          posts: res.data,
          totalPosts: res.headers['x-wp-total'],
          isLoading: false
        })
        console.log(res.headers)
      })
      .catch(error => console.log(error))

  }

  onSelectAllClick = () => {}

  render(props) {
    const classes = {props}

    if ( this.state.isLoading ) {
      return <p>Cargando...</p>
    }

    return (
      <Fragment>
        <Table className='post-table'>
          <TableHead className='header-table'>
            <TableRow>
              <TableCell className='check-column'>
                <Checkbox />
              </TableCell>
              <TableCell className='titulo'>Título</TableCell>
              <TableCell className='fecha'>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.posts.map((post) => 
              <TableRow hover={true} key={post.id}>
                <TableCell className='check-column'>
                  <Checkbox />
                </TableCell>
                <TableCell 
                  className='titulo' 
                  dangerouslySetInnerHTML={{__html: post.title.rendered}} 
                />
                <TableCell className='fecha'>
                  {post.date}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination 
          count={this.state.totalPosts}
          page={this.state.page-1}
          rowsPerPage={10}
        />
      </Fragment>
    );
  }
}

export default Home;
