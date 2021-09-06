import React from 'react';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistLists} from '../features/TodolistList/TodolistLists';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './Strore';
import {RequestStatusType} from './App-reducer';
import {ErrorSnackbar} from '../Componets/ErrorSnackbar';

export function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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
                    <Button
                        color={'inherit'}
                        variant={'outlined'}
                    >Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
                <TodolistLists/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}


