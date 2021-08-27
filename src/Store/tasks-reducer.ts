import {AddTodoListAT, RemoveTodoListAT} from './todolist-reducer';
import {v1} from 'uuid';
import {TaskStatuses, TaskType,} from '../Api/Api';

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListsID: string
}
type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todoListsID: string
}
type changeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    status: TaskStatuses
    todoListsID: string

}
type changeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    title: string
    todoListsID: string
}
export type TasksActionType = RemoveTaskAT
    | AddTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

//const initialState = {}
//type InitialStateType = typeof initialState

export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            // let todoListTasks = state[action.todoListsID]
            // todoListTasks = todoListTasks.filter(t => t.id !== action.taskId)
            return {
                ...state,
                [action.todoListsID]: state[action.todoListsID].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                description: '',
                todoListId: action.todoListsID,
                order: 0,
                status: TaskStatuses.New,
                priority: 0,
                startDate: '',
                deadline: 'string',
                addedDate: ''
            }
            return {
                ...state,
                [action.todoListsID]: [newTask, ...state[action.todoListsID]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListsID]: state[action.todoListsID]
                    .map(t => t.id === action.taskID ? {...t, status: action.status} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListsID]: state[action.todoListsID]
                    .map(t => t.id === action.taskID ? {...t, title: action.title} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoListsID]: []
            }
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.todoListsID]
            return newState
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todoListsID: string): RemoveTaskAT => {
    return ({
        type: 'REMOVE-TASK',
        taskId: taskId,
        todoListsID: todoListsID

    });

}
export const addTaskAC = (title: string, todoListsID: string): AddTaskAT => {
    return ({
        type: 'ADD-TASK',
        title: title,
        todoListsID: todoListsID
    });
}
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListsID: string): changeTaskStatusAT => {
    return ({
        type: 'CHANGE-TASK-STATUS',
        taskID,
        status,
        todoListsID
    });
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListsID: string): changeTaskTitleAT => {
    return ({
        type: 'CHANGE-TASK-TITLE',
        taskID,
        title,
        todoListsID
    });
}
