import React, {useEffect, useState} from 'react'
import {todolistAPi} from './Api';
import {Button, Input} from '@material-ui/core';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // debugger
        todolistAPi.getTodolist()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <>
        <div> {JSON.stringify(state)}</div>

    </>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('')
    const createTodolist = () => {

        todolistAPi.createTodolist(title)
            .then((res) => {

                    if (res.data.messages.length !== 0) {
                        setState(res.data.messages)
                        // console.log(res.data.data.item)
                    } else setState(res.data.data.item)

                }
            )
    }
    return <>
        <Input
            autoFocus
            placeholder={'title for todolist'}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Button
            color={'primary'}
            variant={'contained'}
            value={state}
            onClick={createTodolist}>
            Get Todolist
        </Button>
        <br/>
        <br/>
        <div> {JSON.stringify(state)}</div>
    </>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState<any>('')


    const deleteTodolist = () => {
        todolistAPi.deleteTodolist(todoID)
            .then((res) => {
                setState(`${JSON.stringify(res.data.data)} - todolist deleted`)
            })
    }

    return <>
        <Input
            autoFocus
            placeholder={'title for todolist'}
            value={todoID}
            onChange={(e) => setTodoID(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Button
            color={'primary'}
            variant={'contained'}
            value={state}
            onClick={deleteTodolist}>
            Delete Todolist
        </Button>
        <br/>
        <br/>
        <div> {JSON.stringify(state)}</div>
    </>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState<any>('')
    const [title, setTitle] = useState<any>('')

    const updatedTodolistTitle = ()=> {
        todolistAPi.updateTodolist(title, todoID)
            .then((res) =>
                setState(`${JSON.stringify(res.data.data)} - todolist id '${todoID}' updated`))
    }

    return <>
        <Input
            autoFocus
            placeholder={'title for todolist'}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Input
            autoFocus
            placeholder={'Id for todolist'}
            value={todoID}
            onChange={(e) => setTodoID(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Button
            color={'primary'}
            variant={'contained'}
            value={state}
            onClick={updatedTodolistTitle}>
            Delete Todolist
        </Button>
        <br/>
        <br/>
        <div> {JSON.stringify(state)}</div>
    </>
}
