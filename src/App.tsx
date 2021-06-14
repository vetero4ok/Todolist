import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    //BLL: Business Logic Layer

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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


    function changeTodoListFilter(filter: FilterValuesType, todoListsID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListsID ? {...tl, filter: filter} : tl))
    }

    function changeTodoListTitle(title: string, todoListsID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListsID ? {...tl, title} : tl))
    }

    function removeTask(taskId: string, todoListsID: string) {
        tasks[todoListsID] = tasks[todoListsID].filter(t => t.id !== taskId)
        setTasks({...tasks})

    }

    function addTask(title: string, todoListsID: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        const copyTasks = {...tasks}
        copyTasks[todoListsID] = [newTask, ...tasks[todoListsID]]
        setTasks(copyTasks)
        // setTasks({...tasks, [todoListsID] : [newTask, ...tasks[todoListsID]]})

    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListsID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListsID] = tasks[todoListsID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(copyTasks)
    }

    function changeTaskTitle(taskID: string, title: string, todoListsID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListsID] = tasks[todoListsID].map(t => t.id === taskID ? {...t, title} : t)
        setTasks(copyTasks)
    }

    function removeTodoList(todoListsID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListsID))
        const copyTasks = {...tasks}
        delete copyTasks[todoListsID] //удалить таски
        setTasks(copyTasks)
    }

    function addTodoList(title: string,) {
        const newTodoListID = v1()
        const newTodoList: TodolistType = {
            id: newTodoListID,
            title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
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
                <Paper elevation={5} style={{padding:'20px'}}>
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
                <Grid container style={{padding:'20px 0px'}}>
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
