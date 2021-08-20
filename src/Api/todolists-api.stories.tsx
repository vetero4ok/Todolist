import React, {useEffect, useState} from 'react'
import {todolistAPi} from './Api';

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

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'React Info'
        todolistAPi.createTodolist(title)
            .then((res) => {
                    setState(res.data.data.item)
                    console.log(res.data.data.item)
                }
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = '0391d3b5-8ea2-4048-a6da-2d1777bf39d0'
        todolistAPi.deleteTodolist(id)
            .then((res)=>{
                setState(res.data.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'Fray'
        let id =  'd18fe959-8339-4b43-bb00-0d4949a434a2'
        todolistAPi.updateTodolist(title, id)
            .then((res)=>
                setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
