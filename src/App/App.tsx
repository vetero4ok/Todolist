import React, {useEffect} from 'react';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistLists} from '../features/TodolistList/TodolistLists';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './Strore';
import {initializeAppTC, RequestStatusType} from './App-reducer';
import {ErrorSnackbar} from '../Componets/ErrorSnackbar/ErrorSnackbar';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {Error404} from '../Componets/Error404/Error404';
import {logoutTC} from '../features/Login/authReducer';

export function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
       // debugger
        dispatch(initializeAppTC())
    },[])
    if (!isInitialized) {
       // debugger
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    const onClickHandler = () => {
       // debugger
        dispatch(logoutTC())
    }
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    {isLoggedIn ?
                    <Button onClick={onClickHandler} color={'inherit'} variant={'outlined'}>Log out</Button>
                    : <div> </div>
                    }
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistLists/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'}
                           render={() => <Error404/>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}


