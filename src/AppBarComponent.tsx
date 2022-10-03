import React from "react";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootReducerType} from "./state/store";
import {logOutTC} from "./state/AuthReducer";

export type AppBarComponentTypeProps = {}


export const AppBarComponent = React.memo((props: AppBarComponentTypeProps) => {

    const isLoggedIn = useSelector<AppRootReducerType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch<AppDispatch>()

    const onClickHandlerLogOut = () => {
        dispatch(logOutTC())
    }

    return <AppBar position="static">
        <Toolbar style={{justifyContent: "space-between"}}>
            <IconButton edge="start" color="secondary" aria-label="menu">
                    <Menu/>
                </IconButton>
            <Typography variant="h5">
                Todolists
            </Typography>
            {isLoggedIn ? <Button onClick={onClickHandlerLogOut} color="inherit" variant={"outlined"}>Logout</Button>:<br/>}
        </Toolbar>
    </AppBar>
})