import React, {useCallback} from 'react';
import {AddItemForm} from '../../../Componets/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../Componets/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../Api/Api';
import {FilterValuesType, TodolistDomainType} from '../todolist-reducer';


type PropsTodoListType = {
    todoListsID: string
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListsID: string) => void
    addTask: (title: string, todoListsID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListsID: string) => void
    changeTodoListFilter: (filterValue: FilterValuesType, todoListsID: string) => void
    changeTodoListTitle: (title: string, todoListsID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todoListsID: string) => void
    removeTodoList: (todoListsID: string) => void
};


export const Todolist = React.memo((props: PropsTodoListType) => {
    const {
        todoListsID,
        todolist,
        tasks,
        removeTask,
        addTask,
        changeTaskTitle,
        changeTodoListFilter,
        changeTodoListTitle,
        changeTaskStatus,
        removeTodoList
    } = props;
    //const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(setTasksTC(todoListsID))
    // }, [])

    let taskForTodoList = tasks
    if (todolist.filter === 'active') {
        taskForTodoList = taskForTodoList.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        taskForTodoList = taskForTodoList.filter(t => t.status === TaskStatuses.Completed)
    }

    const removeTaskCallback = useCallback((taskId: string, todoListsID: string) =>
        removeTask(taskId, todoListsID), [removeTask])
    const changeTaskStatusCallback = useCallback((taskId: string, status: TaskStatuses, todoListsID: string) =>
        changeTaskStatus(taskId, status, todoListsID), [changeTaskStatus])
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
        changeTodoListTitle(title, todoListsID), [changeTodoListTitle, todoListsID])
    const addTaskCallback = useCallback((title: string) =>
        addTask(title, todoListsID), [addTask, todoListsID])
    const removeTodolist = useCallback(() =>
        removeTodoList(todoListsID), [removeTodoList, todoListsID])
    const onClickSetAllFilter = useCallback(() =>
        changeTodoListFilter('all', todoListsID), [changeTodoListFilter, todoListsID])
    const onClickSetActiveFilter = useCallback(() =>
        changeTodoListFilter('active', todoListsID), [changeTodoListFilter, todoListsID])
    const onClickSetCompletedFilter = useCallback(() =>
        changeTodoListFilter('completed', todoListsID), [changeTodoListFilter, todoListsID])

    return (
        <div>
            <h3>
                <EditableSpan title={todolist.title} changeTitle={changeTodoListTitleCallback}/>
                <IconButton aria-label="delete" onClick={removeTodolist}
                            disabled = {todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTaskCallback}
                disabled = {todolist.entityStatus === 'loading'}
            />
            <ul style={{listStyle: 'none', padding: '0px'}}>
                {taskJSXElement}
            </ul>
            <div>
                <Button
                    style={{marginLeft: '2px'}}
                    size={'small'}
                    variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
                    color={todolist.filter === 'all' ? 'primary' : 'secondary'}
                    // className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onClickSetAllFilter}>All
                </Button>
                <Button
                    style={{marginLeft: '2px'}}
                    size={'small'}
                    variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
                    color={todolist.filter === 'active' ? 'primary' : 'secondary'}
                    // className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onClickSetActiveFilter}>Active
                </Button>
                <Button
                    style={{marginLeft: '2px'}}
                    size={'small'}
                    variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
                    color={todolist.filter === 'completed' ? 'primary' : 'secondary'}
                    // className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onClickSetCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    );
})

export default Todolist;
