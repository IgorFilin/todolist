import {applyMiddleware, combineReducers, createStore} from "redux";
import {ActionCreatorsTodolistsType, TodolistReducer} from "./TodolistReducer";
import {ActionCreatorsTasksType, TasksReducer} from "./TasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
    todolists: TodolistReducer,
    tasks: TasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


export type AppRootReducerType = ReturnType<typeof rootReducer>

export type DomainActionsCreatorsType = ActionCreatorsTodolistsType | ActionCreatorsTasksType

export type AppDispatch = ThunkDispatch<AppRootReducerType,unknown,DomainActionsCreatorsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,AppRootReducerType,unknown,DomainActionsCreatorsType>

// @ts-ignore
window.store = store

