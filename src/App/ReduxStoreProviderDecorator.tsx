import {AppRootStateType,} from './Store';
import {Provider} from 'react-redux';
import React from 'react';
import {v1} from 'uuid';
import {tasksReducer} from '../features/TodolistList/tasks-reducer';
import {todoListsReducer} from '../features/TodolistList/todolist-reducer';
import {combineReducers, createStore} from 'redux';
import {TaskPriorities, TaskStatuses} from '../Api/Api';
import {appReducer} from './App-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app:appReducer,
})

const initialGlobalState: AppRootStateType = {
    app:{
        status:'idle',
        error: null,
        isInitialized:false,
    },
    auth:{
        isLoggedIn: false,
    },
    todoLists: [
        {
            id: 'todolistId1', title: 'What to learn', filter: 'all',entityStatus:'idle', addedDate: 'string',
            order: 0
        },
        {
            id: 'todolistId2', title: 'What to buy', filter: 'all',entityStatus:'idle', addedDate: 'string',
            order: 0
        }
    ],

    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML', description: '', todoListId: 'todolistId1',
                order: 0, status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', addedDate: '', entityTaskStatus:'idle'
            },
            {
                id: v1(), title: 'CSS', description: '', todoListId: 'todolistId1',
                order: 0, status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', addedDate: '', entityTaskStatus:'idle'
            },
            {
                id: v1(), title: 'Redux', description: '', todoListId: 'todolistId1',
                order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', addedDate: '', entityTaskStatus:'idle'
            },
            {
                id: v1(), title: 'React', description: '', todoListId: 'todolistId1',
                order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', addedDate: '', entityTaskStatus:'idle'
            },
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'milk', description: '', todoListId: 'todolistId2',
                order: 0, status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', addedDate: '', entityTaskStatus:'idle'
            },
            {
                id: v1(), title: 'Bred', description: '', todoListId: 'todolistId2',
                order: 0, status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', addedDate: '', entityTaskStatus:'idle'
            },
            {
                id: v1(), title: 'meat', description: '', todoListId: 'todolistId2',
                order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', addedDate: '', entityTaskStatus:'idle'
            },
        ]
    }
};
export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}> {storyFn()} </Provider>

}


