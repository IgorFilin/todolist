import React from "react";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type AppBarComponentTypeProps = {}


export const AppBarComponent = React.memo((props: AppBarComponentTypeProps) => {
    return <AppBar position="static">
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
})