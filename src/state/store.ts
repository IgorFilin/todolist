import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ActionCreatorsTodolistsType, fetchTodolistsSagaWorker, TodolistReducer} from "./TodolistReducer";
import {ActionCreatorsTasksType, TasksReducer, tasksWatcher} from "./TasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppReducer} from "./AppReducer";
import {AuthReducer, authWatcher} from "./AuthReducer";
import createSagaMiddleware from 'redux-saga'
import {errorUtilsWatcher} from "../utils/error-utils";
import {takeEvery, all} from 'redux-saga/effects'

//rootReducer
const rootReducer = combineReducers({
    todolists: TodolistReducer,
    tasks: TasksReducer,
    app: AppReducer,
    auth: AuthReducer,
})

//saga and store
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware))


function* rootWatcher() {
    yield all([
         authWatcher(),
         takeEvery('TODOLISTS/FETCH_TODOLISTS',fetchTodolistsSagaWorker),
         tasksWatcher(),
         errorUtilsWatcher()
    ])

}

sagaMiddleware.run(rootWatcher)

//types
export type AppRootReducerType = ReturnType<typeof rootReducer>

export type DomainActionsCreatorsType = ActionCreatorsTodolistsType | ActionCreatorsTasksType

export type AppDispatch = ThunkDispatch<AppRootReducerType, unknown, DomainActionsCreatorsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootReducerType, unknown, DomainActionsCreatorsType>

// @ts-ignore
window.store = store

