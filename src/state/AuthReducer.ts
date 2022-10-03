import {Dispatch} from "redux";
import {authApi} from "../api/auth-api";
import {FormDataType} from "../components/Login/Login";
import {setAppStatusAC, setInitializedAppErrorAC} from "./AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type AppReducerActionsType =  setLoginACType | logOutACType
export type initialStateType = {
    isLoggedIn:boolean
}
export type setLoginACType = ReturnType<typeof setLoginAC>
export type logOutACType = ReturnType<typeof logOutAC>

const initialState:initialStateType = {
    isLoggedIn: false
}
export const AuthReducer = (state: initialStateType = initialState, action: AppReducerActionsType): initialStateType => {
    switch (action.type) {
        case 'AUTH/SET-LOGIN': {
            return {...state, isLoggedIn: action.login}
        }
        default: {
            return state
        }
    }
};


export const setLoginAC = (login: boolean) => {
    return {type: 'AUTH/SET-LOGIN', login} as const
}
export const logOutAC = (isLoggedValue:boolean) => {
    return {type: 'AUTH/LOG-OUT', isLoggedValue} as const
}

export const isAuthTC = () => (dispatch: Dispatch) => {
    authApi.authMe()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setLoginAC(false))
                dispatch(setInitializedAppErrorAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const loginTC = (formData: FormDataType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authApi.logIn(formData)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(setLoginAC(true))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(setAppStatusAC('failed'))
                    dispatch(setLoginAC(false))
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })

    }
}
export const logOutTC = () => (dispatch: Dispatch) => {
    authApi.logOut()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(logOutAC(true))
                dispatch(setInitializedAppErrorAC(true))
            } else {
                dispatch(logOutAC(false))
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}



