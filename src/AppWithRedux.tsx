import React from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {
    addNewTaskAC,
    changeStatusTaskAC,
    changeTitleTaskAC,
    deleteTaskAC, TasksReducer
} from "./reducers/TasksReducer";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    deleteTodolistAC,
    TodolistReducer
} from "./reducers/TodolistReducer";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "./store";

export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type arrTasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<arrTasksPropsType>
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootReducerType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootReducerType, Array<TodolistsType>>(state => state.todolists)


    const deleteTask = (id: string, idTodolist: string) => {
        dispatch(deleteTaskAC(id, idTodolist))
    }

    const changeFilter = (isDoneStatus: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterTodolistAC(isDoneStatus, todolistId))
    }

    const addNewTask = (titleTask: string, idTodolist: string) => {
        dispatch(addNewTaskAC(titleTask, idTodolist))
    }

    const changeStatusTask = (id: string, isDone: boolean, idTodolist: string) => {
        dispatch(changeStatusTaskAC(id, isDone, idTodolist))
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
    const changeTitleTask = (title: string, id: string, idTodolist: string) => {
        dispatch(changeTitleTaskAC(title, id, idTodolist))
    }
    const mappingTodolists = todolists.map(t => {
        let arrayTasks = tasks[t.id]
        return (<Grid key={t.id} item>
            <Paper style={{padding: '5px 10px 10px 10px'}}>
                <Todolist deleleTodolist={deleleTodolist}
                          todolistId={t.id}
                          title={t.title}
                          tasks={arrayTasks}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}
                          addNewTask={addNewTask}
                          addCheckedTask={changeStatusTask}
                          filter={t.filter}
                          changeTitleTodolist={changeTitleTodolist}
                          changeTitleTaks={changeTitleTask}
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
