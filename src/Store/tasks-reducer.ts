import {AddTodoListAT, RemoveTodoListAT, SetTodolistsAT} from './todolist-reducer';
import {TaskStatuses, TaskType, todolistAPi,} from '../Api/Api';
import {AppThunk} from './Strore';
import {Dispatch} from 'redux';


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
    | SetTodolistsAT
    | SetTasksAT


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

//const initialState = {}
//type InitialStateType = typeof initialState

export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListsID]: state[action.todoListsID].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask: TaskType = action.task
            return {
                ...state,
                [action.task.todoListId]: [newTask, ...state[action.task.todoListId]]
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
                [action.todolist.id]: []
            }
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.todoListsID]
            return newState
        case 'SET-TODOLISTS': {
            let stateCopy = {...state}
            action.todolists.forEach(tl => {
                return stateCopy[tl.id] = [];
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = action.task
            return stateCopy
        }
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todoListsID: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId: taskId,
        todoListsID: todoListsID
    } as const
}
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const
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
const setTasksAC = (task: Array<TaskType>, todolistId: string) => {
    return {
        type: 'SET-TASKS',
        task,
        todolistId,
    } as const
}
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>
export const setTasksTC = (todolistId: string): AppThunk => (dispatch: Dispatch) => {
    todolistAPi.getTasks(todolistId)
        .then(res => {
            console.log(res.data)
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch: Dispatch) => {
    todolistAPi.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch: Dispatch) => {
    todolistAPi.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
        })

}