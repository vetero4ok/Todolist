
import {Dispatch} from 'redux';
import {CommonResponseType} from '../Api/Api';
import {appSetError, AppSetErrorAT, appSetStatus, AppSetStatusAT} from '../App/App-reducer';


export const handleServerAppError = (dispatch: Dispatch<ErrorActionType>, message: string) => {
    dispatch(appSetError(message))
    dispatch(appSetStatus('failed'))
}
export const handleServerNetworkError = <T>(dispatch: Dispatch<ErrorActionType>, data:CommonResponseType<T>) => {
    if (data.messages.length) {
        dispatch(appSetError(data.messages[0]))
    } else {
        dispatch(appSetError('Some error occurred'))
    }
    dispatch(appSetStatus('failed'))
}
type ErrorActionType =
    | AppSetStatusAT
    | AppSetErrorAT