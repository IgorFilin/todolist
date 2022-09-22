import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {
    changeFilterTodolistAC, createTodolistsThunkCreator,
    deleteTodolistAC, deleteTodolistsThunkCreator, fetchTodolistsThunkCreator, FilterValuesType,
    TodolistDomainType, updateTodolistsThunkCreator
} from "./state/TodolistReducer";
import {Container, Grid, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootReducerType} from "./state/store";
import {AppBarComponent} from "./AppBarComponent";





function AppWithRedux() {
    const dispatch = useDispatch<AppDispatch>()
    const todolists = useSelector<AppRootReducerType, Array<TodolistDomainType>>(state => state.todolists)


    useEffect(() => {
        dispatch(fetchTodolistsThunkCreator())
    } ,[])

    const changeFilter = useCallback((status: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterTodolistAC(status, todolistId))
    }, [dispatch])

    const deleteTodolist = useCallback((idTodolist: string) => {
        // @ts-ignore
        dispatch(deleteTodolistsThunkCreator(idTodolist))
    }, [dispatch])

    const createTodolist = useCallback((title: string) => {
        // @ts-ignore
        dispatch(createTodolistsThunkCreator(title))

    }, [dispatch])

    const changeTitleTodolist = useCallback((title: string, todolistId: string) => {
        // @ts-ignore
        dispatch(updateTodolistsThunkCreator(todolistId,title))
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
                <AddItemForm addItem={createTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {mappingTodolists}
            </Grid>
        </Container>

    </div>)


}


export default AppWithRedux;
