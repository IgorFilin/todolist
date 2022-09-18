import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {addTodolistAC, changeFilterTodolistAC, changeTitleTodolistAC, deleteTodolistAC} from "./state/TodolistReducer";
import {Container, Grid, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "./state/store";
import {AppBarComponent} from "./AppBarComponent";
import {TasksType} from "./api/tasks-api";
import {TodolistsType} from "./api/todolists-api";

export type FilterValuesType = 'All' | 'Active' | 'Completed'


export type TasksStateType = {
    [key: string]: Array<TasksType>
}
export type TodolistDomainType = TodolistsType & {
    filter:FilterValuesType
}
function AppWithRedux() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootReducerType, Array<TodolistDomainType>>(state => state.todolists)

    const changeFilter = useCallback((status: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterTodolistAC(status, todolistId))
    }, [dispatch])

    const deleteTodolist = useCallback((idTodolist: string) => {
        dispatch(deleteTodolistAC(idTodolist))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)

    }, [dispatch])

    const changeTitleTodolist = useCallback((title: string, idTodolist: string) => {
        dispatch(changeTitleTodolistAC(title, idTodolist))
    }, [dispatch])

    const mappingTodolists = todolists.map(t => {
        return (<Grid key={t.id} item>
            <Paper style={{padding: '5px 10px 10px 10px'}}>
                <Todolist deleteTodolist={deleteTodolist}
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
