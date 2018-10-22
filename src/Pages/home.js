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

import Post from './post'

import * as constants from '../includes/constants'
import '../includes/styles.css'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      totalPosts: null,
      page: 1,
      post: null,
      rowsPerPage: 10,
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

  handleChangePage = (e, page) => {
    e.preventDefault()
    
    let url = constants.SERVER_URL 
    let rowsPerPage = this.state.rowsPerPage

    this.setState({
      isLoading: true,
      page: ++page
    })

    axios
      .get(url + 'wp-json/wp/v2/posts?page=' + page + '&per_page=' + rowsPerPage)
      .then(res => {
        this.setState({
          posts: res.data,
          isLoading: false
        })
      })
      .catch(error => console.log(error))
  }

  handleChangeRowsPerPage = (e) => {
    e.preventDefault()

    let url = constants.SERVER_URL 
    let page = this.state.page
    let rowsPerPage = e.target.value

    this.setState({
      isLoading: true,
      rowsPerPage: rowsPerPage
    })

    axios
      .get(url + 'wp-json/wp/v2/posts?page=' + page + '&per_page=' + rowsPerPage)
      .then(res => {
        this.setState({
          posts: res.data,
          isLoading: false
        })
      })
      .catch(error => console.log(error))
  }

  handlePost = (e,post) => {

    console.log(post)
    this.setState({post: post})
  }

  render(props) {
    const classes = {props}

    if ( this.state.isLoading ) {
      return <p>Cargando...</p>
    }

    if (this.state.post) {
      return <Post data={this.state.post} />
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
              <TableRow hover={true} key={post.id} onClick={e => this.handlePost(e, post)}>
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
          rowsPerPage={this.state.rowsPerPage}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          labelRowsPerPage={'Elementos por página'}
        />
      </Fragment>
    );
  }
}

export default Home;
