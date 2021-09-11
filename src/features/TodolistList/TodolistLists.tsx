import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../App/Strore';
import {
    addTodolistTC,
    changeTodoListFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './todolist-reducer';
import {
    addTaskTC,
    updateTasksTC,
    removeTaskTC,
    TasksStateType
} from './tasks-reducer';
import React, {useCallback, useEffect} from 'react';
import {TaskStatuses, TaskType} from '../../Api/Api';
import {Grid, Paper} from '@material-ui/core';
import Todolist from './Todolist/Todolist';
import {AddItemForm} from '../../Componets/AddItemForm/AddItemForm';
import {Redirect} from 'react-router-dom';

export const TodolistLists = () => {
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
    //   debugger
        if (!isLoggedIn){
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback((taskId: string, todoListsID: string) => {
        dispatch(removeTaskTC(todoListsID, taskId))
    }, [dispatch])
    const addTask = useCallback((title: string, todoListsID: string) => {
        dispatch(addTaskTC(todoListsID, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todoListsID: string) => {
        dispatch(updateTasksTC(todoListsID, taskID, {status}))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskID: string, title: string, todoListsID: string) => {
        dispatch(updateTasksTC(todoListsID, taskID, {title}))
    }, [dispatch])
    const removeTodoList = useCallback((todoListsID: string) => {
        dispatch(removeTodolistTC(todoListsID))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListsID: string) => {
        let action = changeTodoListFilterAC(todoListsID, filter)
        dispatch(action)
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListsID: string) => {
        dispatch(changeTodolistTitleTC(title, todoListsID))
    }, [dispatch])

    if(!isLoggedIn){
       // debugger
        return <Redirect to={'/login'}/>
    }
//UI: User Interface

    const todoListComponents = todoLists.map(tl => {

        let arrayTasksTodolistID: Array<TaskType> = tasks[tl.id]
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: '20px'}}>
                    <Todolist
                        todoListsID={tl.id}
                        tasks={arrayTasksTodolistID}
                        todolist = {tl}
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
        <>
            <Grid container style={{padding: '20px 0px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={5}>
                {todoListComponents}
            </Grid>

        </>);
}