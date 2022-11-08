import {Dispatch} from "redux";
import {authApi} from "../api/auth-api";
import {FormDataType} from "../components/Login/Login";
import {clearAppStateAC, setAppStatusAC, setInitializedAppErrorAC} from "./AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import axios from "axios";

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


export const InitializedAppTC = () => async (dispatch: Dispatch) => {
    const response = await authApi.authMe()
    try {
        if (response.data.resultCode === 0) {
            dispatch(setLoginAC(true))
            dispatch(setInitializedAppErrorAC(true))
        } else {
            handleServerAppError(response.data, dispatch)
            dispatch(setInitializedAppErrorAC(true))
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
            dispatch(setInitializedAppErrorAC(true))
        }

    }

}

export const loginTC = (formData: FormDataType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await authApi.logIn(formData)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setLoginAC(true))
            dispatch(setCaptchaAC(''))
        } else if (response.data.resultCode === 10) {
            handleServerAppError(response.data, dispatch)
            const result = await authApi.getCaptcha()
            dispatch(setCaptchaAC(result.data.url))
            dispatch(setLoginAC(false))
            dispatch(setAppStatusAC('failed'))
        } else {
            handleServerAppError(response.data, dispatch)
            dispatch(setLoginAC(false))
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, dispatch)
        }
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

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



