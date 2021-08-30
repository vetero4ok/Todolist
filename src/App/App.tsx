import React from 'react';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistLists} from '../features/TodolistList/TodolistLists';

export function App() {
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
            <Container fixed>
                <TodolistLists/>
            </Container>

        </div>
    );
}


