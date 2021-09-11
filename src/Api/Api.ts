import axios from 'axios';
import { RequestStatusType } from '../App/App-reducer';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ed866548-b66a-44f9-8f52-2b761c116c4c'
    }
})


export const todolistAPi = {
    getTodolist() {
        return instance.get<Array<TodolistType>>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistType }>>(`todo-lists`, {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(title: string, id: string) {
        return instance.put<CommonResponseType>(`todo-lists/${id}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, payload: UpdateTaskModelType) {
        return instance.put<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, payload)
    },
}
export const authAPI = {
    login(payload:LoginParamsType) {
        return instance.post<CommonResponseType<{userId:string}>>(`auth/login`,payload)
    },
    logout() {
        return instance.delete<CommonResponseType>(`auth/login`)
    },
    me(){
        return instance.get<CommonResponseType<MeResponseType>>(`auth/me`)
    }
}
export type MeResponseType = {
    id: number
    email: string
    login: string
}
export type LoginParamsType = {
    email:string
    password:string
    rememberMe:boolean
    captcha?:string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate:  string
    deadline:  string
    addedDate: string
    entityTaskStatus:RequestStatusType
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type CommonResponseType<T = {}> = {
    data: T
    messages: Array<string>
    fieldsErrors: []
    resultCode: number

}
export type GetTasksResponse = {
    error:string | null
    totalCount:number
    items:Array<TaskType>
}