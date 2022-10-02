import {Dispatch} from "redux";
import {authApi} from "../api/auth-api";

export type AppReducerActionsType = setAuthMeACType
export type initialStateType = any
export type setAuthMeACType = ReturnType<typeof setAuthMeAC>

const initialState = {
    isAuth: false
}
export const AuthReducer = (state: initialStateType = initialState, action: AppReducerActionsType): initialStateType => {
    switch (action.type) {
        case "SET-AUTH-ME": {
            return {...state, isAuth: action.value}
        }
        default: {
            return state
        }
    }
};

export const setAuthMeAC = (value: boolean) => {
    return {type: 'SET-AUTH-ME', value} as const
}

export const isAuthTC = () => (dispatch: Dispatch) => {
    authApi.authMe()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthMeAC(true))
            } else {
                dispatch(setAuthMeAC(false))
            }
        })
}



