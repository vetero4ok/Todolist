import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../../../../Componets/EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import React, {ChangeEvent, useCallback} from 'react';
import {TaskStatuses, TaskType} from '../../../../Api/Api';


type TaskPropsType = {
    todoListsID: string
    task: TaskType
    removeTask: (taskId: string, todoListsID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todoListsID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListsID: string) => void
}

export const Task = React.memo(({task, todoListsID, changeTaskTitle, ...props}: TaskPropsType) => {
    //console.log('Task')
    const removeTask = () =>
        props.removeTask(task.id, todoListsID)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, todoListsID)
    const changeTaskTitleCallback = useCallback((title: string) =>
        changeTaskTitle(task.id, title, todoListsID), [changeTaskTitle, task.id, todoListsID])
    let taskClass = task.status === TaskStatuses.Completed ? 'is-Done' : ''
    return (
        <li key={task.id}>
               <span className={taskClass}>
                <Checkbox
                    size={'small'}
                    color={'primary'}
                    checked={task.status === TaskStatuses.Completed}
                    onChange={changeTaskStatus}
                    disabled = {task.entityTaskStatus === 'loading'}
                />
                 <EditableSpan
                     title={task.title}
                     changeTitle={changeTaskTitleCallback}
                     //disabled = {task.entityTaskStatus === 'loading'}

                 />

               </span>
            <IconButton aria-label="delete" onClick={removeTask}
                        disabled = {task.entityTaskStatus === 'loading'}
            >
                <Delete/>
            </IconButton>
        </li>
    );

})