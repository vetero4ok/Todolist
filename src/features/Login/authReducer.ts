import {AppThunk} from '../../App/Store';
import {appSetError, AppSetErrorAT, appSetStatus, AppSetStatusAT} from '../../App/App-reducer';
import {authAPI, LoginParamsType} from '../../Api/Api';
import {AxiosError} from 'axios';
import {handleServerAppError} from '../../Utils/error-utils.tserror-utils';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const)
export const clearDataAfterLogoutAppAC = () => ({type: 'LOGIN/CLEAR-DATA'} as const)

// thunks
export const loginTC = (payload: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(appSetStatus('loading'))
 //   debugger
    authAPI.login(payload)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(appSetStatus('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(appSetError(res.data.messages[0]))
                    dispatch(appSetStatus('failed'))
                }
            }
        })
        .catch((err: AxiosError) => {
            handleServerAppError(dispatch, err.message)
        })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(appSetStatus('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(appSetStatus('succeeded'))
                dispatch(clearDataAfterLogoutAppAC())
            } else {
                if (res.data.messages.length) {
                    dispatch(appSetError(res.data.messages[0]))
                    dispatch(appSetStatus('failed'))
                }
            }
        })
        .catch((err: AxiosError) => {
            handleServerAppError(dispatch, err.message)
        })
}

// types
export type SetIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>
export type ClearDataAfterLogoutAppAT = ReturnType<typeof clearDataAfterLogoutAppAC>
export type AuthActionsType =
    | SetIsLoggedInAT
    | AppSetStatusAT
    | AppSetErrorAT
    | ClearDataAfterLogoutAppAT
