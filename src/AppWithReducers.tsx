import React, {useReducer} from 'react';


import {v1} from 'uuid';

import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    todoListsReducer,
    ChangeTodoListFilterAC,
    RemoveTodoListAC,
    ChangeTodoListTitleAC,
    AddTodoListAC
} from './State/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './State/tasks-reducer';
import App from './App';
import Todolist from './Todolist';
import {AddItemForm} from './AddItemForm/AddItemForm';

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


function AppWithReducer() {
    //BLL: Business Logic Layer

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchToTodoList] = useReducer(todoListsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'Bred', isDone: true},
            {id: v1(), title: 'meat', isDone: false},

        ]
    })


    function removeTask(taskId: string, todoListsID: string) {
        dispatchToTasks(removeTaskAC(taskId, todoListsID))
    }

    function addTask(title: string, todoListsID: string) {
        dispatchToTasks(addTaskAC(title, todoListsID))
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListsID: string) {
        dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListsID))
    }

    function changeTaskTitle(taskID: string, title: string, todoListsID: string) {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListsID))
    }

    function removeTodoList(todoListsID: string) {
        let action = RemoveTodoListAC(todoListsID)
        dispatchToTasks(action)
        dispatchToTodoList(action)
    }

    function addTodoList(title: string,) {
        let action = AddTodoListAC(title)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }

    function changeTodoListFilter(filter: FilterValuesType, todoListsID: string) {
        let action = ChangeTodoListFilterAC(todoListsID, filter)
        dispatchToTodoList(action)
    }

    function changeTodoListTitle(title: string, todoListsID: string) {
        dispatchToTodoList(ChangeTodoListTitleAC(todoListsID, title))
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

export default App;
