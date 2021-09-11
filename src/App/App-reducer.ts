import {AppThunk} from './Strore';
import {authAPI} from '../Api/Api';
import {setIsLoggedInAC, SetIsLoggedInAT} from '../features/Login/authReducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZE':
            return {...state, isInitialized: action.isInitialize}
        default:
            return state
    }
}
//AC
export const appSetStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const appSetError = (error: string | null) => ({type: 'APP/SET-ERROR', error}) as const
export const setIsInitialize = (isInitialize: boolean) => ({type: 'APP/SET-IS-INITIALIZE', isInitialize} as const)
//TC
export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))
            }
        })
        .finally(()=>{
            dispatch(setIsInitialize(true))
        })
}
//AT
export type AppSetErrorAT = ReturnType<typeof appSetError>
export type  AppSetStatusAT = ReturnType<typeof appSetStatus>
export type AppSetIsInitializeAT = ReturnType<typeof setIsInitialize>
export type AppActionsType =
    | AppSetStatusAT
    | AppSetErrorAT
    | AppSetIsInitializeAT
    | SetIsLoggedInAT
