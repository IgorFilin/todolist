import {combineReducers, createStore} from "redux";
import {TodolistReducer} from "./reducers/TodolistReducer";
import {TasksReducer} from "./reducers/TasksReducer";

const rootReducer = combineReducers({
    todolists: TodolistReducer,
    tasks: TasksReducer
})

export const store = createStore(rootReducer)


export type AppRootReducerType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store

