import React, {useCallback, useEffect} from 'react';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import Todolist from './Componets/Todolist/Todolist';
import {AddItemForm} from './Componets/AddItemForm/AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './Store/Strore';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from './Store/tasks-reducer';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, fetchTodolistsTC,
    FilterValuesType,
    RemoveTodoListAC,
    TodolistDomainType
} from './Store/todolist-reducer';
import {TaskStatuses, TaskType} from './Api/Api';

export function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchTodolistsTC())
    },[])

    const removeTask = useCallback((taskId: string, todoListsID: string) => {
        dispatch(removeTaskAC(taskId, todoListsID))
    }, [dispatch])
    const addTask = useCallback((title: string, todoListsID: string) => {
        dispatch(addTaskAC(title, todoListsID))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todoListsID: string) => {
        dispatch(changeTaskStatusAC(taskID, status, todoListsID))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskID: string, title: string, todoListsID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListsID))
    }, [dispatch])
    const removeTodoList = useCallback((todoListsID: string) => {
        let action = RemoveTodoListAC(todoListsID)
        dispatch(action)

    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)

    }, [dispatch])
    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListsID: string) => {
        let action = ChangeTodoListFilterAC(todoListsID, filter)
        dispatch(action)
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListsID: string) => {
        dispatch(ChangeTodoListTitleAC(todoListsID, title))
    }, [dispatch])


//UI: User Interface

    const todoListComponents = todoLists.map(tl => {

        let arrayTasksTodolistID: Array<TaskType> = tasks[tl.id]
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: '20px'}}>
                    <Todolist
                        todoListsID={tl.id}
                        tasks={arrayTasksTodolistID}
                        title={tl.title}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>


        );
    })

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
                <Grid container style={{padding: '20px 0px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>


            </Container>

        </div>
    );
}


