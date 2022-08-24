import React from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    deleteTodolistAC
} from "./state/TodolistReducer";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "./state/store";

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

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootReducerType, Array<TodolistsType>>(state => state.todolists)

    const changeFilter = (isDoneStatus: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterTodolistAC(isDoneStatus, todolistId))
    }

    const deleleTodolist = (idTodolist: string) => {
        dispatch(deleteTodolistAC(idTodolist))
    }

    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)

    }

    const changeTitleTodolist = (title: string, idtodolist: string) => {
        dispatch(changeTitleTodolistAC(title, idtodolist))
    }

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
        <AppBar position="static">
            <Toolbar style={{justifyContent: "space-between"}}>
                <IconButton edge="start" color="secondary" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h5">
                    Todolists
                </Typography>
                <Button color="inherit" variant={"outlined"}>Logout</Button>
            </Toolbar>
        </AppBar>
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
