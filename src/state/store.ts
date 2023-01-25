import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ActionCreatorsTodolistsType, TodolistReducer} from "./TodolistReducer";
import {ActionCreatorsTasksType, fetchTasksSagaWorker, TasksReducer} from "./TasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppReducer} from "./AppReducer";
import {AuthReducer, InitializedAppSagaWorker, loginSagaWorker} from "./AuthReducer";
import createSagaMiddleware from 'redux-saga'
import { takeEvery } from 'redux-saga/effects'
import {handleServerAppErrorSaga} from "../utils/error-utils";

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
    yield takeEvery('INITIALIZED_APP',InitializedAppSagaWorker)
    yield takeEvery('FETCH_TASKS',fetchTasksSagaWorker)
    yield takeEvery('LOGIN',loginSagaWorker)
    yield takeEvery('HANDLE_SERVER_APP',handleServerAppErrorSaga)
}


//types
export type AppRootReducerType = ReturnType<typeof rootReducer>

export type DomainActionsCreatorsType = ActionCreatorsTodolistsType | ActionCreatorsTasksType

export type AppDispatch = ThunkDispatch<AppRootReducerType,unknown,DomainActionsCreatorsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,AppRootReducerType,unknown,DomainActionsCreatorsType>

// @ts-ignore
window.store = store

