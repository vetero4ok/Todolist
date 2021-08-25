import React, {useState} from 'react';
import './App.css';
import Todolist from './Componets/Todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './Componets/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {FilterValuesType, TodolistDomainType} from './Store/todolist-reducer';
import {TasksStateType} from './Store/tasks-reducer';
import {TaskStatuses, TaskType} from './Api/Api';


function App() {
    //BLL: Business Logic Layer

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<TodolistDomainType[]>([
                {
                    id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: 'string',
                    order: 0
                },
                {
                    id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: 'string',
            order: 0
        }
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {
                id: v1(), title: 'HTML', description: '', todoListId: 'todoListID_1',
                order: 0, status: TaskStatuses.Completed, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },
            {
                id: v1(), title: 'CSS', description: '', todoListId: 'todoListID_1',
                order: 0, status: TaskStatuses.Completed, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },
            {
                id: v1(), title: 'Redux', description: '', todoListId: 'todoListID_1',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },
            {
                id: v1(), title: 'React', description: '', todoListId: 'todoListID_1',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },
        ],
        [todoListID_2]: [
            {
                id: v1(), title: 'milk', description: '', todoListId: 'todoListID_2',
                order: 0, status: TaskStatuses.Completed, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },
            {
                id: v1(), title: 'Bred', description: '', todoListId: 'todoListID_2',
                order: 0, status: TaskStatuses.Completed, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },
            {
                id: v1(), title: 'meat', description: '', todoListId: 'todoListID_2',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline: '', addedDate: ''
            },

        ]
    })


    function removeTask(taskId: string, todoListsID: string) {
        tasks[todoListsID] = tasks[todoListsID].filter(t => t.id !== taskId)
        setTasks({...tasks})

    }

    function addTask(title: string, todoListsID: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            description: '', todoListId: 'todoListID_1',
            order: 0, status: TaskStatuses.New, priority: 0,
            startDate: '', deadline: '', addedDate: ''
        }
        const copyTasks = {...tasks}
        copyTasks[todoListsID] = [newTask, ...tasks[todoListsID]]
        setTasks(copyTasks)
        // setTasks({...tasks, [todoListsID] : [newTask, ...tasks[todoListsID]]})

    }

    function changeTaskStatus(taskID: string, status: TaskStatuses, todoListsID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListsID] = tasks[todoListsID].map(t => t.id === taskID ? {...t, status: status} : t)
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
        const newTodoList: TodolistDomainType = {
            id: newTodoListID,
            title,
            filter: 'all',
            addedDate: 'string',
            order: 0
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTodoListFilter(filter: FilterValuesType, todoListsID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListsID ? {...tl, filter: filter} : tl))
    }

    function changeTodoListTitle(title: string, todoListsID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListsID ? {...tl, title} : tl))
    }


//UI: User Interface
    function getFilteredTask(tl: TodolistDomainType) {
        switch (tl.filter) {
            case 'active':
                return tasks[tl.id].filter(t => t.status === TaskStatuses.New)//t.isDone === false
            case 'completed':
                return tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)//t.isDone === true
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
