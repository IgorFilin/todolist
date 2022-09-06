import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {addTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, deleteTodolistAC} from "./state/TodolistReducer";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "./state/store";
import {AppBarComponent} from "./AppBar";

export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {
    console.log('render AppWithRedux')
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootReducerType, Array<TodolistsType>>(state => state.todolists)

    const changeFilter = useCallback((isDoneStatus: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterTodolistAC(isDoneStatus, todolistId))
    }, [dispatch])

    const deleleTodolist = useCallback((idTodolist: string) => {
        dispatch(deleteTodolistAC(idTodolist))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)

    }, [dispatch])

    const changeTitleTodolist = useCallback((title: string, idtodolist: string) => {
        dispatch(changeTitleTodolistAC(title, idtodolist))
    }, [dispatch])

    const mappingTodolists = todolists.map(t => {
        return (<Grid key={t.id} item>
            <Paper style={{padding: '5px 10px 10px 10px'}}>
                <Todolist deleleTodolist={deleleTodolist}
                          todolistId={t.id}
                          title={t.title}
                          changeFilter={changeFilter}
                          filter={t.filter}
                          changeTitleTodolist={changeTitleTodolist}
                />
            </Paper>
        </Grid>)
    })

    return (<div className="App">
        <AppBarComponent/>
        <Container fixed>
            <Grid container style={{paddingTop: '20px', paddingBottom: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {mappingTodolists}
            </Grid>
        </Container>

    </div>)


}


export default AppWithRedux;
