import {setAppErrorAC, setAppErrorACType, setAppStatusAC, setAppStatusACType} from '../state/AppReducer'
import {Dispatch} from 'redux'
import {ResponseType} from '../api/todolists-api'
import {put, takeEvery} from 'redux-saga/effects'

//Watcher
export function* errorUtilsWatcher() {
    yield takeEvery('ERROR_UTILS/HANDLE_SERVER_APP', handleServerAppErrorSaga)
    yield takeEvery('ERROR_UTILS/HANDLE_NETWORK_APP', handleServerNetworkErrorSaga)
}

//AC
export const handleServerAppErrorSagaAC = (data: any) => {
    return {type: 'ERROR_UTILS/HANDLE_SERVER_APP', data}
}

export const handleServerNetworkErrorSagaAC = (error: any) => {
    return {type: 'ERROR_UTILS/HANDLE_NETWORK_APP', error}
}


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


// saga function
function* handleServerAppErrorSaga(action: any) {
    debugger
    if (action.data.messages.length) {
        yield put(setAppErrorAC(action.data.messages[0]))
    } else {
        yield put(setAppErrorAC('Some error occurred'))
    }
    yield put(setAppStatusAC('failed'))
}


function* handleServerNetworkErrorSaga(action: any) {
    yield put(setAppErrorAC(action.error.message)) // сетаем в AppReducer тест ошибки при реджекте запроса
    yield put(setAppStatusAC('failed')) // меняет статус приложения, полоска загрузки показывается при статусе loading
}

