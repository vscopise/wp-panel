import React, { Component } from 'react';
import { 
    Avatar,
    Button,
    CssBaseline,
    Checkbox,
    createMuiTheme,
    FormControl,
    FormControlLabel,
    Input,
    InputLabel,
    MuiThemeProvider,
    Paper,
    TextField,
    Typography,
    withStyles 
} from '@material-ui/core'
import LockIcon from '@material-ui/icons/LockOutlined'

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    },
})

const theme = createMuiTheme ({
    typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true
    }
})

const SERVER_URL = 'http://wp.pixie.com.uy/'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    
    }
    validateForm = () => {
        return this.state.username.length > 0 &&
        this.state.password.length > 0
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('login')
        let url = SERVER_URL + 'wp-json/'
        let username = this.state.username
        let password = this.state.password

        console.log('username - ' + username)
        console.log('password - ' + password)



        fetch(url, {
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body:JSON.stringify({
                username: username,
                password: password
            })
        }).then(function(response){
            console.log(response.json())
            return response.json();
        }).then(function(user){
            console.log(user.token);
        });
    }
    
    render() {
        const { classes } = this.props
        return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Iniciar sesión
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin='normal' required fullWidth>
                            <InputLabel htmlFor='username'>
                                Nombre de usuario o dirección de correo
                            </InputLabel>
                            <Input 
                                id='username'
                                autoComplete='username'
                                autoFocus
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </FormControl>
                        <FormControl margin='normal' required fullWidth>
                            <InputLabel htmlFor='password'>
                                Contraseña
                            </InputLabel>
                            <Input 
                                id='password'
                                type='password'
                                autoComplete='current-password'
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </FormControl>
                        <FormControlLabel 
                            control={<Checkbox value='remember' control='primary' />}
                            label='Recuérdame'
                        />
                        <Button 
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            disabled={!this.validateForm}
                        >
                            Acceder 
                        </Button>
                    </form>
                </Paper>
            </main>
        </MuiThemeProvider>
        );  
    }
}

export default withStyles(styles)(Login)
