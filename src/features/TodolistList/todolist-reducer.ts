import {todolistAPi, TodolistType} from '../../Api/Api';
import {AppThunk} from '../../App/Store';
import {Dispatch} from 'redux';
import {AppSetErrorAT, appSetStatus, AppSetStatusAT, RequestStatusType} from '../../App/App-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../Utils/error-utils.tserror-utils';
import {AxiosError} from 'axios';
import {setTasksTC} from './tasks-reducer';
import {ClearDataAfterLogoutAppAT} from '../Login/authReducer';

const initialState: Array<TodolistDomainType> = []

export const todoListsReducer = (state = initialState, action: TodolistActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListsID)
        case 'ADD-TODOLIST':
            const newTodoList: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
            return [newTodoList, ...state]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoListsID ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListsID ? {...tl, title: action.title} : tl)
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
                return {...tl, filter: 'all', entityStatus: 'idle'}
            })
        }
        case 'SET-ENTITY-STATUS':
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.entityStatus} : tl)
        case 'LOGIN/CLEAR-DATA':
            return []
        default:
            return state
    }
}

export const removeTodoListAC = (todoListsID: string) => ({type: 'REMOVE-TODOLIST', todoListsID} as const)
export const addTodoListAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist,} as const)
export const changeTodoListFilterAC = (todoListsID: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', todoListsID, filter} as const)
export const changeTodoListTitleAC = (todoListsID: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todoListsID, title} as const)
const setTodolists = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
const setEntityStatus = (entityStatus: RequestStatusType, todolistId: string) =>
    ({type: 'SET-ENTITY-STATUS', entityStatus, todolistId}) as const

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(appSetStatus('loading'))
    todolistAPi.getTodolist()
        .then((res) => {
            dispatch(setTodolists(res.data))
            dispatch(appSetStatus('succeeded'))
            return res.data
        })
        .then((res) => {
            res.forEach(todo => {
                dispatch(setTasksTC(todo.id))
            })
        })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(appSetStatus('loading'))
    todolistAPi.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(appSetStatus('succeeded'))
            } else {
                handleServerNetworkError<{}>(dispatch, res.data)
            }

        })
        .catch((err: AxiosError) => {
            handleServerAppError(dispatch, err.message)
        })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(appSetStatus('loading'))
    dispatch(setEntityStatus('loading', todolistId))
    todolistAPi.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(todolistId))
                dispatch(appSetStatus('succeeded'))
            } else {
                handleServerNetworkError<{}>(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerAppError(dispatch, err.message)
        })
}
export const changeTodolistTitleTC = (title: string, todolistId: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(appSetStatus('loading'))
    todolistAPi.updateTodolist(title, todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todolistId, title))
                dispatch(appSetStatus('succeeded'))
            } else {
                handleServerNetworkError<{}>(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerAppError(dispatch, err.message)
        })

}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

type  SetEntityStatusAT = ReturnType<typeof setEntityStatus>
type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodoListAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type SetTodolistsAT = ReturnType<typeof setTodolists>

export type TodolistActionType =
    | RemoveTodolistAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT
    | SetTodolistsAT
    | AppSetStatusAT
    | AppSetErrorAT
    | SetEntityStatusAT
    | ClearDataAfterLogoutAppAT