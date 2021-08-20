import React, { useCallback} from 'react';
import {FilterValuesType, TaskType} from '../../App';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from '../Task/Task';


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
    const {
        todoListsID,
        title,
        tasks,
        filter,
        removeTask,
        addTask,
        changeTaskTitle,
        changeTodoListFilter,
        changeTodoListTitle,
        changeTaskStatus,
        removeTodoList
    } = props;


    //console.log('todolist')
    let taskForTodoList = tasks
    if (filter === 'active') {
        taskForTodoList = taskForTodoList.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        taskForTodoList = taskForTodoList.filter(t => t.isDone)
    }
    const removeTaskCallback = useCallback((taskId: string, todoListsID: string) =>
        removeTask(taskId, todoListsID), [removeTask])
    const changeTaskStatusCallback = useCallback((taskId: string, isDone: boolean, todoListsID: string) =>
        changeTaskStatus(taskId, isDone, todoListsID), [changeTaskStatus])
    const changeTaskTitleCallback = useCallback((taskId: string, title: string, todoListsID: string) =>
        changeTaskTitle(taskId, title, todoListsID), [changeTaskTitle])
    const taskJSXElement = taskForTodoList.map(t => {
        return (
            <Task
                key={t.id}
                todoListsID={todoListsID}
                task={t}
                removeTask={removeTaskCallback}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback}
            />
        )
    })
    const changeTodoListTitleCallback = useCallback((title: string) =>
        changeTodoListTitle(title, todoListsID), [changeTodoListTitle,todoListsID])
    const addTaskCallback = useCallback((title: string) =>
        addTask(title, todoListsID), [addTask,todoListsID])
    const removeTodolist = useCallback(() =>
        removeTodoList(todoListsID), [removeTodoList,todoListsID])
    const onClickSetAllFilter = useCallback(() =>
        changeTodoListFilter('all', todoListsID), [changeTodoListFilter,todoListsID])
    const onClickSetActiveFilter = useCallback(() =>
        changeTodoListFilter('active', todoListsID), [changeTodoListFilter,todoListsID])
    const onClickSetCompletedFilter = useCallback(() =>
        changeTodoListFilter('completed', todoListsID), [changeTodoListFilter,todoListsID])

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodoListTitleCallback}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallback}/>
            <ul style={{listStyle: 'none', padding: '0px'}}>
                {taskJSXElement}
            </ul>
            <div>
                <Button
                    style={{marginLeft: '2px'}}
                    size={'small'}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    color={filter === 'all' ? 'primary' : 'secondary'}
                    // className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onClickSetAllFilter}>All
                </Button>
                <Button
                    style={{marginLeft: '2px'}}
                    size={'small'}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    color={filter === 'active' ? 'primary' : 'secondary'}
                    // className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onClickSetActiveFilter}>Active
                </Button>
                <Button
                    style={{marginLeft: '2px'}}
                    size={'small'}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    color={filter === 'completed' ? 'primary' : 'secondary'}
                    // className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onClickSetCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    );
})

export default Todolist;
