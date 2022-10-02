import {applyMiddleware, combineReducers} from "redux";
import {ActionCreatorsTodolistsType, TodolistReducer} from "./TodolistReducer";
import {ActionCreatorsTasksType, TasksReducer} from "./TasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import { legacy_createStore as createStore} from 'redux'
import {AppReducer} from "./AppReducer";
import {AuthReducer} from "./AuthReducer";

const rootReducer = combineReducers({
    todolists: TodolistReducer,
    tasks: TasksReducer,
    app:AppReducer,
    auth:AuthReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


export type AppRootReducerType = ReturnType<typeof rootReducer>

export type DomainActionsCreatorsType = ActionCreatorsTodolistsType | ActionCreatorsTasksType

export type AppDispatch = ThunkDispatch<AppRootReducerType,unknown,DomainActionsCreatorsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,AppRootReducerType,unknown,DomainActionsCreatorsType>

// @ts-ignore
window.store = store

