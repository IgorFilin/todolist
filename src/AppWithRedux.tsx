import React, {useEffect} from 'react';
import './App.css';
import {Todolists} from "./.././src/components/Todolists/Todolists";
import {CircularProgress, Container, LinearProgress} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootReducerType} from "./state/store";
import {AppBarComponent} from "./AppBarComponent";
import {RequestStatusType} from "./state/AppReducer";
import CustomizedSnackbars from "./components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import {InitializedAppTC} from "./state/AuthReducer";


function AppWithRedux() {
    const status = useSelector<AppRootReducerType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch<AppDispatch>()
    const isInitialized = useSelector<AppRootReducerType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootReducerType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(InitializedAppTC())
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
                    <Route path='/404' element={<h1 style={{display:'flex',justifyContent:'center',paddingTop:'100px',color:'red'}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
            <CustomizedSnackbars/>
        </div>)


}


export default AppWithRedux;
