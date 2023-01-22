import {applyMiddleware, combineReducers} from "redux";
import {ActionCreatorsTodolistsType, TodolistReducer} from "./TodolistReducer";
import {ActionCreatorsTasksType, fetchTasksSagaWorker, TasksReducer} from "./TasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {  takeEvery } from 'redux-saga/effects'
import { legacy_createStore as createStore} from 'redux'
import {AppReducer} from "./AppReducer";
import {AuthReducer} from "./AuthReducer";
import createSagaMiddleware from 'redux-saga'

//rootReducer
const rootReducer = combineReducers({
    todolists: TodolistReducer,
    tasks: TasksReducer,
    app:AppReducer,
    auth:AuthReducer,
})

//saga and store
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(thunk,sagaMiddleware))

sagaMiddleware.run(rootWatcher)

function* rootWatcher () {
    // yield takeEvery("ACTIVATOR-ACTION-TYPE", fetchTasksSagaWorker)
}


//types
export type AppRootReducerType = ReturnType<typeof rootReducer>

export type DomainActionsCreatorsType = ActionCreatorsTodolistsType | ActionCreatorsTasksType

export type AppDispatch = ThunkDispatch<AppRootReducerType,unknown,DomainActionsCreatorsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,AppRootReducerType,unknown,DomainActionsCreatorsType>

// @ts-ignore
window.store = store

