import React, {useReducer} from 'react';
import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    FilterValuesType,
    RemoveTodoListAC, TodolistDomainType,
    todoListsReducer
} from './Store/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './Store/tasks-reducer';
import App from './App';
import Todolist from './Componets/Todolist/Todolist';
import {AddItemForm} from './Componets/AddItemForm/AddItemForm';
import {TaskStatuses} from './Api/Api';


function AppWithReducer() {
    //BLL: Business Logic Layer

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchToTodoList] = useReducer(todoListsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: 'string',
            order: 0},
        {id: todoListID_2, title: 'What to buy', filter: 'all',addedDate: 'string',
            order: 0}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML', description: '', todoListId: 'todoListID_1',
                order: 0, status: TaskStatuses.Completed, priority: 0,
                startDate: '', deadline:'', addedDate: ''},
            {id: v1(), title: 'CSS', description: '', todoListId: 'todoListID_1',
                order: 0, status: TaskStatuses.Completed, priority: 0,
                startDate: '', deadline:'', addedDate: ''},
            {id: v1(), title: 'Redux', description: '', todoListId: 'todoListID_1',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline:'', addedDate: ''},
            {id: v1(), title: 'React', description: '', todoListId: 'todoListID_1',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline:'', addedDate: ''},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'milk', description: '', todoListId: 'todoListID_2',
                order: 0, status: TaskStatuses.Completed, priority: 0,
                startDate: '', deadline:'', addedDate: ''},
            {id: v1(), title: 'Bred', description: '', todoListId: 'todoListID_2',
                order: 0, status: TaskStatuses.Completed, priority: 0,
                startDate: '', deadline:'', addedDate: ''},
            {id: v1(), title: 'meat', description: '', todoListId: 'todoListID_2',
                order: 0, status: TaskStatuses.New, priority: 0,
                startDate: '', deadline:'', addedDate: ''},

        ]
    })


    function removeTask(taskId: string, todoListsID: string) {
        dispatchToTasks(removeTaskAC(taskId, todoListsID))
    }

    function addTask(title: string, todoListsID: string) {
        dispatchToTasks(addTaskAC(title, todoListsID))
    }

    function changeTaskStatus(taskID: string, status : TaskStatuses, todoListsID: string) {
        dispatchToTasks(changeTaskStatusAC(taskID, status, todoListsID))
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
