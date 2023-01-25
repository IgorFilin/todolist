import {authApi} from "../api/auth-api";
import {FormDataType} from "../components/Login/Login";
import {clearAppStateAC, setAppStatusAC, setInitializedAppErrorAC} from "./AppReducer";
import {
    handleServerAppErrorSagaAC,
    handleServerNetworkErrorSagaAC
} from "../utils/error-utils";
import axios from "axios";
import {call, put, takeEvery} from 'redux-saga/effects'

export type AppReducerActionsType = setLoginACType | setCaptchaACType
export type initialStateType = {
    isLoggedIn: boolean
    captcha: string,
}
export type setLoginACType = ReturnType<typeof setLoginAC>
export type setCaptchaACType = ReturnType<typeof setCaptchaAC>

export function* authSagaWatcher () {
    yield takeEvery('AUTH/LOGIN',loginSagaWorker)
    yield takeEvery('AUTH/LOGOUT',logOutSagaWorker)
    yield takeEvery('AUTH/INITIALIZED_APP',InitializedAppSagaWorker)
}


export const InitializedAppSagaWorkerAC = () => ({type: 'AUTH/INITIALIZED_APP'})
export const logOutSagaWorkerAC = () => ({type: 'AUTH/LOGOUT'})
export const loginSagaWorkerAC = (formData: FormDataType) => ({type: 'AUTH/LOGIN', formData})

const initialState: initialStateType = {
    isLoggedIn: false,// залогинен ли пользователь
    captcha: ''
}
export const AuthReducer = (state: initialStateType = initialState, action: AppReducerActionsType): initialStateType => {
    switch (action.type) {
        case 'AUTH/SET-LOGIN': {
            return {...state, isLoggedIn: action.login}
        }
        case 'AUTH/SET-CAPTCHA': {
            return {...state, captcha: action.url}
        }
        default: {
            return state
        }
    }
};


export const setLoginAC = (login: boolean) => {
    return {type: 'AUTH/SET-LOGIN', login} as const
}
export const setCaptchaAC = (url: string) => {
    return {type: 'AUTH/SET-CAPTCHA', url} as const
}

export function* InitializedAppSagaWorker(): any {
    const response = yield call(authApi.authMe)
    try {
        if (response.data.resultCode === 0) {
            yield put(setLoginAC(true))
            yield put(setInitializedAppErrorAC(true))
        } else {
            yield put(handleServerAppErrorSagaAC(response.data))
            yield put(setInitializedAppErrorAC(true))
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            yield put(handleServerNetworkErrorSagaAC(error))
            yield put(setInitializedAppErrorAC(true))
        }

    }

}



export function* loginSagaWorker(action: any): any {
    try {
        yield put(setAppStatusAC('loading'))
        const response = yield call(authApi.logIn, action.formData)
        if (response.data.resultCode === 0) {
            yield put(setAppStatusAC('succeeded'))
            yield put(setLoginAC(true))
            yield put(setCaptchaAC(''))
        } else if (response.data.resultCode === 10) {
            yield put(handleServerAppErrorSagaAC(response.data))
            const result = yield call(authApi.getCaptcha)
            yield put(setCaptchaAC(result.data.url))
            yield put(setLoginAC(false))
            yield put(setAppStatusAC('failed'))
        } else {
            debugger
            yield put(handleServerAppErrorSagaAC(response.data))
            yield put(setLoginAC(false))
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            yield put(handleServerNetworkErrorSagaAC(error))
        }
    } finally {
        yield put(setAppStatusAC('idle'))
    }
}



export function* logOutSagaWorker(): any {
    try {
        yield put(setAppStatusAC('loading'))
        const response = yield call(authApi.logOut)
        if (response.data.resultCode === 0) {
            yield put(setLoginAC(false))
            yield put(clearAppStateAC())
            yield put(setAppStatusAC('succeeded'))
        } else {
            yield put(handleServerAppErrorSagaAC(response.data))
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            yield put(handleServerNetworkErrorSagaAC(error))
        }

    }
}



