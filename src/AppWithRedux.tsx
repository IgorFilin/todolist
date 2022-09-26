import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {
    changeFilterTodolistAC, createTodolistsThunkCreator,
    deleteTodolistAC, deleteTodolistsThunkCreator, fetchTodolistsThunkCreator, FilterValuesType,
    TodolistDomainType, updateTodolistsThunkCreator
} from "./state/TodolistReducer";
import {Container, Grid, LinearProgress, Paper, Snackbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootReducerType} from "./state/store";
import {AppBarComponent} from "./AppBarComponent";
import {RequestStatusType} from "./state/AppReducer";
import CustomizedSnackbars from "./ErrorSnackbar/ErrorSnackbar";





function AppWithRedux() {

    const dispatch = useDispatch<AppDispatch>()
    const todolists = useSelector<AppRootReducerType, Array<TodolistDomainType>>(state => state.todolists)
    const status = useSelector<AppRootReducerType, RequestStatusType>(state => state.app.status)


    useEffect(() => {
        dispatch(fetchTodolistsThunkCreator())
    } ,[])

    const changeFilter = useCallback((status: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterTodolistAC(status, todolistId))
    }, [dispatch])

    const deleteTodolist = useCallback((idTodolist: string) => {
        dispatch(deleteTodolistsThunkCreator(idTodolist))
    }, [dispatch])

    const createTodolist = useCallback((title: string) => {
        dispatch(createTodolistsThunkCreator(title))

    }, [dispatch])

    const changeTitleTodolist = useCallback((title: string, todolistId: string) => {
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
                          entityStatus={t.entityStatus}
                />
            </Paper>
        </Grid>)
    })

    return (<div className="App">
        <AppBarComponent/>
        {status === 'loading' && <LinearProgress style={{position:'absolute',width:'100%',height:'5px'}} color={"secondary"}/>}
        <Container fixed>
            <Grid container style={{paddingTop: '20px', paddingBottom: '20px'}}>
                <AddItemForm disable={false} addItem={createTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {mappingTodolists}
            </Grid>
        </Container>
        <CustomizedSnackbars/>
    </div>)


}


export default AppWithRedux;
