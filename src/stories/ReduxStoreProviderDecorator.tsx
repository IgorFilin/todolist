import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, legacy_createStore} from 'redux'
import {TasksReducer} from '../state/TasksReducer'
import {TodolistReducer} from '../state/TodolistReducer'
import {v1} from 'uuid'
import {AppRootReducerType} from '../state/store'

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists: TodolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootReducerType);

export const ReduxStoreProviderDecorator = (storyFn: ()=>JSX.Element) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)