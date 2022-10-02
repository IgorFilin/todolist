import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {TasksReducer} from '../state/TasksReducer'
import {TodolistReducer} from '../state/TodolistReducer'
import {v1} from 'uuid'
import {AppRootReducerType} from '../state/store'
import {TaskStatuses, TodoTaskPriorities} from "../api/tasks-api";
import thunk from "redux-thunk";
import {AuthReducer} from "../state/AuthReducer";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists: TodolistReducer,
    auth:AuthReducer
})

const initialGlobalState:AppRootReducerType = {
    todolists: [
        {id:'todolistId1', title:'What to learn', addedDate:'', order:0,filter: "All", entityTodolistStatus:'idle'},
        {id: "todolistId2", title: "What to buy",addedDate:'', order:0, filter: "All",entityTodolistStatus:'idle'}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", description: '', todoListId: '', order: 0, status: TaskStatuses.New, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '',completed:false,entityTaskStatus:'idle'},
            {id: v1(), title: "HTML&CSS", description: '', todoListId: '', order: 0, status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '',completed:false,entityTaskStatus:'idle'}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", description: '', todoListId: '', order: 0, status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '',completed:false,entityTaskStatus:'idle'},
            {id: v1(), title: "React Book", description: '', todoListId: '', order: 0, status: TaskStatuses.New, priority: TodoTaskPriorities.Low, startDate: '', deadline: '', addedDate: '',completed:false,entityTaskStatus:'idle'}
        ]
    },
    app:{
        status:'idle',
        error:null
    },
    auth:{
        isAuth:true
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootReducerType,applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)