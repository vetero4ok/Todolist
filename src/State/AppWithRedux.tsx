import React from 'react';
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import Todolist from '../Todolist';
import {AddItemForm} from '../AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './Strore';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './tasks-reducer';
import {AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from './todolist-reducer';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function AppWithRedux() {
    //BLL: Business Logic Layer
    //
    // const todoListID_1 = v1()
    // const todoListID_2 = v1()
    // const [todoLists, dispatchToTodoList] = useReducer(todoListsReducer, [
    //     {id: todoListID_1, title: 'What to learn', filter: 'all'},
    //     {id: todoListID_2, title: 'What to buy', filter: 'all'}
    // ])
    // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todoListID_1]: [
    //         {id: v1(), title: 'HTML', isDone: true},
    //         {id: v1(), title: 'CSS', isDone: true},
    //         {id: v1(), title: 'Redux', isDone: false},
    //         {id: v1(), title: 'React', isDone: false},
    //     ],
    //     [todoListID_2]: [
    //         {id: v1(), title: 'milk', isDone: true},
    //         {id: v1(), title: 'Bred', isDone: true},
    //         {id: v1(), title: 'meat', isDone: false},
    //
    //     ]
    // })

    const todoLists = useSelector<AppRootStateType, TodolistType[]>(
        state => state.todoLists
    )
    const tasks = useSelector<AppRootStateType, TasksStateType>(
        state => state.tasks
    )
    const dispatch = useDispatch()

    function removeTask(taskId: string, todoListsID: string) {
        dispatch(removeTaskAC(taskId, todoListsID))
    }

    function addTask(title: string, todoListsID: string) {
        dispatch(addTaskAC(title, todoListsID))
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListsID: string) {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListsID))
    }

    function changeTaskTitle(taskID: string, title: string, todoListsID: string) {
        dispatch(changeTaskTitleAC(taskID, title, todoListsID))
    }

    function removeTodoList(todoListsID: string) {
        let action = RemoveTodoListAC(todoListsID)
        dispatch(action)

    }

    function addTodoList(title: string,) {
        let action = AddTodoListAC(title)
        dispatch(action)

    }

    function changeTodoListFilter(filter: FilterValuesType, todoListsID: string) {
        let action = ChangeTodoListFilterAC(todoListsID, filter)
        dispatch(action)
    }

    function changeTodoListTitle(title: string, todoListsID: string) {
        dispatch(ChangeTodoListTitleAC(todoListsID, title))
    }


//UI: User Interface
    function getFilteredTask(tl: TodolistType) {
        switch (tl.filter) {
            case 'active':
                return tasks[tl.id].filter(t => !t.isDone)//t.isDone === false
            case 'completed':
                return tasks[tl.id].filter(t => t.isDone)//t.isDone === true
            default:
                return tasks[tl.id]
        }

    }


    const todoListComponents = todoLists.map(tl => {
        const tasksForTodoList = getFilteredTask(tl)
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: '20px'}}>
                    <Todolist
                        todoListsID={tl.id}
                        tasks={tasksForTodoList}
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


