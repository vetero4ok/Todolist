import {v1} from 'uuid';
import {TodolistType} from '../Api/Api';


export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListsID: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListsID: string

}
type changeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoListsID: string
    filter: FilterValuesType

}
type changeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListsID: string
    title: string
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


export type ActionType = RemoveTodoListAT | AddTodoListAT | changeTodoListFilterAT | changeTodoListTitleAT

const initialState: Array<TodolistDomainType> = []

export const todoListsReducer = (todoLists = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListsID)
        case 'ADD-TODOLIST':
            const newTodoListID = action.todoListsID
            const newTodoList: TodolistDomainType = {
                id: newTodoListID,
                title: action.title,
                addedDate: 'string',
                order: 0,
                filter: 'all',
            }
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.todoListsID ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListsID ? {...tl, title: action.title} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoListsID: string): RemoveTodoListAT => {
    return ({
        type: 'REMOVE-TODOLIST',
        todoListsID
    });

}
export const AddTodoListAC = (title: string): AddTodoListAT => {
    return ({
        type: 'ADD-TODOLIST',
        title,
        todoListsID: v1()

    });
}
export const ChangeTodoListFilterAC = (todoListsID: string, filter: FilterValuesType): changeTodoListFilterAT => {
    return ({
        type: 'CHANGE-TODOLIST-FILTER',
        todoListsID,
        filter
    });

}
export const ChangeTodoListTitleAC = (todoListsID: string, title: string): changeTodoListTitleAT => {
    return ({
        type: 'CHANGE-TODOLIST-TITLE',
        todoListsID,
        title
    });
}