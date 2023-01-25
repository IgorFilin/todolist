import {Dispatch} from "redux";
import {authApi} from "../api/auth-api";
import {FormDataType} from "../components/Login/Login";
import {clearAppStateAC, setAppErrorAC, setAppStatusAC, setInitializedAppErrorAC} from "./AppReducer";
import {
    handleServerAppError,
    handleServerAppErrorSaga, handleServerAppErrorSagaAC,
    handleServerNetworkError,
    handleServerNetworkErrorSaga
} from "../utils/error-utils";
import axios from "axios";
import { call, put } from 'redux-saga/effects'

export type AppReducerActionsType = setLoginACType | setCaptchaACType
export type initialStateType = {
    isLoggedIn: boolean
    captcha: string,
}
export type setLoginACType = ReturnType<typeof setLoginAC>
export type setCaptchaACType = ReturnType<typeof setCaptchaAC>


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

export function* InitializedAppSagaWorker ():any  {
    const response = yield call(authApi.authMe)
    try {
        if (response.data.resultCode === 0) {
           yield put(setLoginAC(true))
            yield put(setInitializedAppErrorAC(true))
        } else {
            handleServerAppErrorSaga(response.data)
            yield put(setInitializedAppErrorAC(true))
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkErrorSaga(error)
            put(setInitializedAppErrorAC(true))
        }

    }

}

export const InitializedAppSagaWorkerAC = () => ({type:'INITIALIZED_APP'})


export function* loginSagaWorker  (action:any):any {
    try {
        yield put(setAppStatusAC('loading'))
        const response = yield call(authApi.logIn,action.formData)
        if (response.data.resultCode === 0) {
            yield put(setAppStatusAC('succeeded'))
            yield put(setLoginAC(true))
            yield put(setCaptchaAC(''))
        } else if (response.data.resultCode === 10) {
            debugger
            yield put (handleServerAppErrorSagaAC(response.data))
            const result = yield call(authApi.getCaptcha)
            yield put(setCaptchaAC(result.data.url))
            yield put(setLoginAC(false))
            yield put(setAppStatusAC('failed'))
        } else {
            yield put (handleServerAppErrorSagaAC(response.data))
            yield put(setLoginAC(false))
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkErrorSaga(error)
        }
    } finally {
        yield put(setAppStatusAC('idle'))
    }
}

export const loginSagaWorkerAC = (formData: FormDataType) => ({type:'LOGIN',formData})

export const logOutTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await authApi.logOut()
        if (response.data.resultCode === 0) {
            dispatch(setLoginAC(false))
            dispatch(clearAppStateAC())
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }

    }
}



