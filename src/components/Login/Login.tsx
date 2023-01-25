import React from 'react';
import {useFormik} from "formik";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {loginSagaWorkerAC} from "../../state/AuthReducer";
import {AppRootReducerType} from "../../state/store";
import {RequestStatusType} from "../../state/AppReducer";
import {Navigate} from "react-router-dom";


export type FormDataType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: string
}

const Login = () => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootReducerType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootReducerType, boolean>(state => state.auth.isLoggedIn)
    const captcha = useSelector<AppRootReducerType, string>(state => state.auth.captcha)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ''
        },
        validate: values => {
            let errors: FormDataType = {}
            if (values.email === '') {
                errors.email = 'Email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password.length < 3) {
                errors.password = 'Incorrect password'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginSagaWorkerAC(values));
            formik.resetForm()
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <>
            {!(status === 'loading') &&
                <Grid container style={{paddingTop: '100px'}} justifyContent={'center'}>
                    <Grid item>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl>
                                <FormLabel>
                                    <p>To log in get registered
                                        <a href={'https://social-network.samuraijs.com/'}
                                           target={'_blank'}> here
                                        </a>
                                    </p>
                                    <p>or use common test account credentials:</p>
                                    <p>Email: free@samuraijs.com</p>
                                    <p>Password: free</p>
                                </FormLabel>
                                <FormGroup>
                                    <TextField  {...formik.getFieldProps('email')} name='email' variant={"outlined"}
                                                label="Email" margin="normal" value={formik.values.email}/>
                                    {formik.touched.email && formik.errors.email ?
                                        <div style={{textAlign: 'center', color: 'red'}}>{formik.errors.email}</div> :
                                        <br/>}
                                    <TextField {...formik.getFieldProps('password')} name='password'
                                               variant={"outlined"}
                                               type="password" label="Password"
                                               margin="normal"
                                               value={formik.values.password}
                                    />
                                    {formik.touched.password && formik.errors.password ?
                                        <div
                                            style={{textAlign: 'center', color: 'red'}}>{formik.errors.password}</div> :
                                        <br/>}
                                    <FormControlLabel name={'rememberMe'} label={'Remember me'}
                                                      control={<Checkbox  {...formik.getFieldProps('rememberMe')}
                                                                          checked={formik.values.rememberMe}/>}/>
                                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                                        Login
                                    </Button>
                                    {captcha && <div style={{display:'flex',flexDirection:'column',margin:'20px 0 100px 0'}}>
                                        <img src={captcha} alt="captcha"/>
                                        <TextField {...formik.getFieldProps('captcha')}
                                                   name='captcha'
                                                   variant={"outlined"}
                                                   type="text" label="captcha"
                                                   margin="normal"
                                                   value={formik.values.captcha}
                                        />
                                    </div>}
                                </FormGroup>
                            </FormControl>
                        </form>
                    </Grid>
                </Grid>
            }
        </>
    )
};

export default Login;
