import {setAppErrorAC, setAppErrorACType, setAppStatusAC, setAppStatusACType} from '../state/AppReducer'
import {Dispatch} from 'redux'
import {ResponseType} from '../api/todolists-api'

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message)) // сетаем в AppReducer тест ошибки при реджекте запроса
    dispatch(setAppStatusAC('failed')) // меняет статус приложения, полоска загрузки показывается при статусе loading
}

type ErrorUtilsDispatchType = Dispatch<setAppStatusACType | setAppErrorACType>
