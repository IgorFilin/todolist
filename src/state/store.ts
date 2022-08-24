import {combineReducers, createStore} from "redux";
import {TodolistReducer} from "./TodolistReducer";
import {TasksReducer} from "./TasksReducer";

const rootReducer = combineReducers({
    todolists: TodolistReducer,
    tasks: TasksReducer
})

export const store = createStore(rootReducer)


export type AppRootReducerType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store

