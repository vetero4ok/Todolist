import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ed866548-b66a-44f9-8f52-2b761c116c4c'
    }
})

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type CommonResponseType<T = {}> = {
    data: T
    messages: []
    fieldsErrors: []
    resultCode: number

}

export const todolistAPi = {
    getTodolist() {
        return instance.get<Array<TodoType>>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{item:TodoType}>>(`todo-lists`, {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(title: string, id: string) {
        return instance.put<CommonResponseType>(`todo-lists/${id}`, {title})
    }

}