import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';


type PropsTodoListType = {
    todoListsID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListsID: string) => void
    addTask: (title: string, todoListsID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListsID: string) => void
    changeTodoListFilter: (filterValue: FilterValuesType, todoListsID: string) => void
    changeTodoListTitle: (title: string, todoListsID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListsID: string) => void
    removeTodoList: (todoListsID: string) => void
};


export const Todolist = React.memo((props: PropsTodoListType) => {
    console.log('todolist')
    let taskForTodoList = props.tasks
    if (props.filter === 'active'){
        taskForTodoList = taskForTodoList.filter(t=>!t.isDone)
    }
    if (props.filter === 'completed'){
        taskForTodoList = taskForTodoList.filter(t=>t.isDone)
    }

    const taskJSXElement = taskForTodoList.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoListsID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListsID)
        }
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListsID)
        let taskClass = t.isDone ? 'is-Done' : ''
        return (
            <li key={t.id}>
               <span className={taskClass}>
                <Checkbox
                    size={'small'}
                    color={'primary'}
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                 <EditableSpan
                     title={t.title}
                     changeTitle={changeTaskTitle}

                 />

               </span>
                <IconButton aria-label="delete" onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })
    const removeTodolist = () => props.removeTodoList(props.todoListsID)
    const onClickSetAllFilter = () => props.changeTodoListFilter('all', props.todoListsID)
    const onClickSetActiveFilter = () => props.changeTodoListFilter('active', props.todoListsID)
    const onClickSetCompletedFilter = () => props.changeTodoListFilter('completed', props.todoListsID)
    const addTask = (title: string) => props.addTask(title, props.todoListsID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListsID)



    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', padding: '0px'}}>
                {taskJSXElement}
            </ul>
            <div>
                <Button
                    style={{marginLeft: '2px'}}
                    size={'small'}
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    color={props.filter === 'all' ? 'primary' : 'secondary'}
                    // className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onClickSetAllFilter}>All
                </Button>
                <Button
                    style={{marginLeft: '2px'}}
                    size={'small'}
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    color={props.filter === 'active' ? 'primary' : 'secondary'}
                    // className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onClickSetActiveFilter}>Active
                </Button>
                <Button
                    style={{marginLeft: '2px'}}
                    size={'small'}
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    color={props.filter === 'completed' ? 'primary' : 'secondary'}
                    // className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onClickSetCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    );
})

export default Todolist;
