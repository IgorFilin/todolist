import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducerType} from "../../state/store";
import {errorValueType, setAppErrorAC} from "../../state/AppReducer";


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars() {
    const errorMessage = useSelector<AppRootReducerType,errorValueType>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppErrorAC(null))
    };

    return (
        <div >
            <Snackbar open={errorMessage !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}