import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistReducer} from "./TodolistReducer";
import {TasksReducer} from "./TasksReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolists: TodolistReducer,
    tasks: TasksReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))


export type AppRootReducerType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store

