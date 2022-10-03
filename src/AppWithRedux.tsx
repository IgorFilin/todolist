import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolists} from "./components/Todolists/Todolists";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
    changeFilterTodolistAC,
    createTodolistsThunkCreator,
    deleteTodolistsThunkCreator,
    fetchTodolistsThunkCreator,
    FilterValuesType,
    TodolistDomainType,
    updateTodolistsThunkCreator
} from "./state/TodolistReducer";
import {CircularProgress, Container, Grid, LinearProgress, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootReducerType} from "./state/store";
import {AppBarComponent} from "./AppBarComponent";
import {RequestStatusType} from "./state/AppReducer";
import CustomizedSnackbars from "./components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import {isAuthTC} from "./state/AuthReducer";


function AppWithRedux() {
    const status = useSelector<AppRootReducerType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch<AppDispatch>()
    const isInitialized = useSelector<AppRootReducerType, boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(isAuthTC())
    }, [])

    if(!isInitialized){
        return <div style={{display:'flex',justifyContent:'center',paddingTop:'200px'}}><CircularProgress color="secondary" /></div>
    }

        return (<div className="App">
            <AppBarComponent/>
            {status === 'loading' &&
                <LinearProgress style={{position: 'absolute', width: '100%', height: '5px'}} color={"secondary"}/>
            }
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<Todolists/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
            <CustomizedSnackbars/>
        </div>)


}


export default AppWithRedux;
