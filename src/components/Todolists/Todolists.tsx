import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, AppRootReducerType} from '../../state/store'
import {
    changeFilterTodolistAC, createTodolistSagaWorkerAC,
    deleteTodolistsThunkCreator,
    fetchTodolistsSagaWorkerAC,
    FilterValuesType,
    TodolistDomainType, updateTodolistsSagaWorkerAC
} from "../../state/TodolistReducer";
import {TasksStateType} from "../../state/TasksReducer";
import {Navigate} from "react-router-dom";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";


export const Todolists = () => {
    const todolists = useSelector<AppRootReducerType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootReducerType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootReducerType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch<any>(fetchTodolistsSagaWorkerAC())

    }, [])


    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeFilterTodolistAC( value,todolistId)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        const thunk = deleteTodolistsThunkCreator(id)
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch<any>(updateTodolistsSagaWorkerAC(title,id))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch<any>(createTodolistSagaWorkerAC(title))
    }, [dispatch])

    if (!isLoggedIn) {
       return <Navigate to='login'/>
    }
    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist} disable={false}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                title={tl.title}
                                todolistId={tl.id}
                                changeFilter={changeFilter}
                                entityStatus={tl.entityTodolistStatus}
                                changeTitleTodolist={changeTodolistTitle}
                                deleteTodolist={removeTodolist}
                                filter={tl.filter}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
