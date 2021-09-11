import {TasksActionType, tasksReducer} from '../features/TodolistList/tasks-reducer';
import {TodolistActionType, todoListsReducer} from '../features/TodolistList/todolist-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {AppActionsType, appReducer} from './App-reducer';
import {AuthActionsType, authReducer} from '../features/Login/authReducer';
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkRootActionType =
    | TasksActionType
    | TodolistActionType
    | AppActionsType
    | AuthActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppThunkRootActionType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;