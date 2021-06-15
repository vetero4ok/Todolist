import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';


type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListsID: string
}
type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string

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
export type ActionType = RemoveTodoListAT | AddTodoListAT | changeTodoListFilterAT | changeTodoListTitleAT
export const todoListsReducer = (todoLists: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListsID)
        case 'ADD-TODOLIST':
            const newTodoListID = v1()
            const newTodoList: TodolistType = {
                id: newTodoListID,
                title: action.title,
                filter: 'all'
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
export const AddTodoListAC = (title:string):AddTodoListAT => {
    return ({
        type: 'ADD-TODOLIST',
        title
    });
}
export const ChangeTodoListFilterAC = (todoListsID:string,filter: FilterValuesType):changeTodoListFilterAT=>{
    return ({
        type: 'CHANGE-TODOLIST-FILTER',
        todoListsID,
        filter
    });

}
export const ChangeTodoListTitleAC = (todoListsID: string,title: string):changeTodoListTitleAT=>{
    return ({
        type: 'CHANGE-TODOLIST-TITLE',
        todoListsID,
        title
    });
}