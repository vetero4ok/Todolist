import {TaskStatuses, TaskType, todolistAPi, UpdateTaskModelType,} from '../../Api/Api';
import {AppThunk} from '../../App/Strore';
import {Dispatch} from 'redux';
import {AddTodoListAT, RemoveTodolistAT, SetTodolistsAT} from './todolist-reducer';

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
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todoListsID]: state[action.todoListsID]
                    .map(t => t.id === action.taskID ? {...t, status: action.status} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todoListsID]: state[action.todoListsID]
                    .map(t => t.id === action.taskID ? {...t, title: action.title} : t)
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
        default:
            return state
    }
}
// Action Creator
export const removeTaskAC = (taskId: string, todoListsID: string) =>
    ({type: 'REMOVE-TASK', taskId: taskId, todoListsID: todoListsID} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListsID: string) =>
    ({type: 'CHANGE-TASK-STATUS', taskID, status, todoListsID} as const)
export const changeTaskTitleAC = (taskID: string, title: string, todoListsID: string) =>
    ({type: 'CHANGE-TASK-TITLE', taskID, title, todoListsID} as const)
const setTasksAC = (task: Array<TaskType>, todolistId: string) => ({type: 'SET-TASKS',task,todolistId,} as const)

// Thunk Creator
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
export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunk => (dispatch: Dispatch, getState) => {
    let task = getState().tasks[todolistId].filter(t => t.id === taskId)[0]
    if (task) {
        const payload: UpdateTaskModelType = {
            title,
            status: task.status,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            startDate: task.startDate
        }
        todolistAPi.updateTask(todolistId, taskId, payload)
            .then(res => {
                dispatch(changeTaskTitleAC(taskId, title, todolistId))
            })
    }
}
export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses): AppThunk => (dispatch: Dispatch, getState) => {
    let task = getState().tasks[todolistId].filter(t => t.id === taskId)[0]
    if (task) {
        const payload: UpdateTaskModelType = {
            title: task.title,
            status,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            startDate: task.startDate
        }
        todolistAPi.updateTask(todolistId, taskId, payload)
            .then(res => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
            })
    }
}
export type TasksActionType =
    | RemoveTaskAT
    | AddTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | AddTodoListAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | SetTasksAT


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>