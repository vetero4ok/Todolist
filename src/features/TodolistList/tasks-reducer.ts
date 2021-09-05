import {TaskPriorities, TaskStatuses, TaskType, todolistAPi, UpdateTaskModelType,} from '../../Api/Api';
import {AppThunk} from '../../App/Strore';
import {Dispatch} from 'redux';
import {AddTodoListAT, RemoveTodolistAT, SetTodolistsAT} from './todolist-reducer';
import {appSetStatus, AppSetStatusAC} from '../../App/App-reducer';

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
            dispatch(addTaskAC(res.data.data.item))
            dispatch(appSetStatus('succeeded'))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(appSetStatus('loading'))
    todolistAPi.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(appSetStatus('succeeded'))
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
        dispatch(appSetStatus('loading'))
        todolistAPi.updateTask(todolistId, taskId, payload)
            .then(res => {
                dispatch(updateTaskAC(taskId, payload, todolistId))
                dispatch(appSetStatus('succeeded'))
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

export type TasksActionType =
    | RemoveTaskAT
    | AddTaskAT
    | AddTodoListAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | SetTasksAT
    | UpdateTaskAT
    | AppSetStatusAC


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type UpdateTaskAT = ReturnType<typeof updateTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type SetTasksAT = ReturnType<typeof setTasksAC>