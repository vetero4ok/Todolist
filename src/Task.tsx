import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from './App';


type TaskPropsType = {
    todoListsID: string
    task: TaskType
    removeTask: (taskId: string, todoListsID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListsID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListsID: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task')
    const removeTask = () =>
        props.removeTask(props.task.id, props.todoListsID)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListsID)
    const changeTaskTitle = useCallback((title: string) =>
        props.changeTaskTitle(props.task.id, title, props.todoListsID),[])
    let taskClass = props.task.isDone ? 'is-Done' : ''
    return (
        <li key={props.task.id}>
               <span className={taskClass}>
                <Checkbox
                    size={'small'}
                    color={'primary'}
                    checked={props.task.isDone}
                    onChange={changeTaskStatus}
                />
                 <EditableSpan
                     title={props.task.title}
                     changeTitle={changeTaskTitle}

                 />

               </span>
            <IconButton aria-label="delete" onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    );

})