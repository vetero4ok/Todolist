import {TaskPriorities, TaskStatuses, TaskType, todolistAPi, UpdateTaskModelType,} from '../../Api/Api';
import {AppThunk} from '../../App/Store';
import {Dispatch} from 'redux';
import {AddTodoListAT, RemoveTodolistAT, SetTodolistsAT} from './todolist-reducer';
import {appSetError, AppSetErrorAT, appSetStatus, AppSetStatusAT, RequestStatusType} from '../../App/App-reducer';
import {AxiosError} from 'axios';
import {handleServerAppError} from '../../Utils/error-utils.tserror-utils';
import {ClearDataAfterLogoutAppAT} from '../Login/authReducer';

const initialState: TasksStateType = {}

//const initialState = {}
//type InitialStateType = typeof initialState

export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListsID]: state[action.todoListsID].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            const newTask: TaskType = action.task
            return {...state, [action.task.todoListId]: [newTask, ...state[action.task.todoListId]]}
        case 'UPDATE-TASKS':
            return {
                ...state, [action.todoListsID]: state[action.todoListsID]
                    .map(t => t.id === action.taskID ? {...t, ...action.payload} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
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
        case 'UPDATE-TASK-ENTITY-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, entityTaskStatus: action.entityStatus} : t)
            }
        case 'LOGIN/CLEAR-DATA':
            return {}
        default:
            return state
    }
}
// Action Creator
export const removeTaskAC = (taskId: string, todoListsID: string) =>
    ({type: 'REMOVE-TASK', taskId: taskId, todoListsID: todoListsID} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskID: string, payload: UpdateTaskModelType, todoListsID: string) =>
    ({type: 'UPDATE-TASKS', taskID, payload, todoListsID} as const)
const setTasksAC = (task: Array<TaskType>, todolistId: string) => ({type: 'SET-TASKS', task, todolistId,} as const)
export const updateTaskEntityStatus = (entityStatus: RequestStatusType, todolistId: string, taskId: string) =>
    ({type: 'UPDATE-TASK-ENTITY-STATUS', entityStatus, todolistId, taskId} as const)


// Thunk Creator
export const setTasksTC = (todolistId: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(appSetStatus('loading'))
    todolistAPi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(appSetStatus('succeeded'))
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(appSetStatus('loading'))
    todolistAPi.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(appSetStatus('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(appSetError(res.data.messages[0]))
                    dispatch(appSetStatus('failed'))
                }
            }
        })
        .catch((err: AxiosError) => {
            handleServerAppError(dispatch, err.message)
        })

}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(appSetStatus('loading'))
    dispatch(updateTaskEntityStatus('loading', todolistId, taskId))
    todolistAPi.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(appSetStatus('succeeded'))
                dispatch(updateTaskEntityStatus('succeeded', todolistId, taskId))
            } else {
                if (res.data.messages.length) {
                    dispatch(appSetError(res.data.messages[0]))
                    dispatch(appSetStatus('failed'))
                    dispatch(updateTaskEntityStatus('failed', todolistId, taskId))
                }
            }
        })
        .catch((err: AxiosError) => {
            handleServerAppError(dispatch, err.message)
        })
}

export const updateTasksTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => (dispatch: Dispatch, getState) => {
    let task = getState().tasks[todolistId].filter(t => t.id === taskId)[0]
    if (task) {
        const payload: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            startDate: task.startDate,
            ...domainModel
        }
        dispatch(updateTaskEntityStatus('loading', todolistId, taskId))
        dispatch(appSetStatus('loading'))
        todolistAPi.updateTask(todolistId, taskId, payload)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, payload, todolistId))
                    dispatch(appSetStatus('succeeded'))
                    dispatch(updateTaskEntityStatus('succeeded', todolistId, taskId))
                } else {
                    if (res.data.messages.length) {
                        dispatch(appSetError(res.data.messages[0]))
                        dispatch(appSetStatus('failed'))
                        dispatch(updateTaskEntityStatus('failed', todolistId, taskId))
                    }
                }
            })
            .catch((err: AxiosError) => {
                handleServerAppError(dispatch, err.message)
            })
    }
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateTaskEntityStatus = ReturnType<typeof updateTaskEntityStatus>
export type UpdateTaskAT = ReturnType<typeof updateTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>


export type TasksActionType =
    | RemoveTaskAT
    | AddTaskAT
    | AddTodoListAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | SetTasksAT
    | UpdateTaskAT
    | AppSetStatusAT
    | AppSetErrorAT
    | UpdateTaskEntityStatus
    | ClearDataAfterLogoutAppAT