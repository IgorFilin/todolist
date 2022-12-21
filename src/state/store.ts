import {ActionCreatorsTodolistsType, TodolistReducer} from "./TodolistReducer";
import {ActionCreatorsTasksType, TasksReducer} from "./TasksReducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import thunkMiddleware from 'redux-thunk'
import {AppReducer} from "./AppReducer";
import {AuthReducer} from "./AuthReducer";
import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    todolists: TodolistReducer,
    tasks: TasksReducer,
    app:AppReducer,
    auth:AuthReducer,
})


export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
})



export type AppRootReducerType = ReturnType<typeof rootReducer>

export type DomainActionsCreatorsType = ActionCreatorsTodolistsType | ActionCreatorsTasksType

export type AppDispatch = ThunkDispatch<AppRootReducerType,unknown,DomainActionsCreatorsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,AppRootReducerType,unknown,DomainActionsCreatorsType>

// @ts-ignore
window.store = store

