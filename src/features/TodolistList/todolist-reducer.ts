import {todolistAPi, TodolistType} from '../../Api/Api';
import {AppThunk} from '../../App/Strore';
import {Dispatch} from 'redux';

const initialState: Array<TodolistDomainType> = []

export const todoListsReducer = (state = initialState, action: TodolistActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListsID)
        case 'ADD-TODOLIST':
            const newTodoList: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodoList, ...state]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoListsID ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListsID ? {...tl, title: action.title} : tl)
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
                return {...tl, filter: 'all'}
            })
        }
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



export const fetchTodolistsTC = (): AppThunk => (dispatch: Dispatch) => {
    todolistAPi.getTodolist()
        .then((res) => {
            dispatch(setTodolists(res.data))
        })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch: Dispatch) => {
    todolistAPi.createTodolist(title)
        .then(res => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch: Dispatch) => {
    todolistAPi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodoListAC(todolistId))
        })
}
export const changeTodolistTitleTC = (title: string, todolistId: string): AppThunk => (dispatch: Dispatch) => {
    todolistAPi.updateTodolist(title, todolistId)
        .then((res) => {

            dispatch(changeTodoListTitleAC(todolistId, title))
        })
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type TodolistActionType =
    | RemoveTodolistAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT
    | SetTodolistsAT
type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodoListAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type SetTodolistsAT = ReturnType<typeof setTodolists>