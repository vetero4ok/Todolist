export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
export const appSetStatus = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const appSetError = (error: string | null) => ({type: 'APP/SET-ERROR', error}) as const
export type AppSetErrorAT = ReturnType<typeof appSetError>
export type  AppSetStatusAT = ReturnType<typeof appSetStatus>
export type AppActionsType =
    | AppSetStatusAT
    | AppSetErrorAT
