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


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate:(values)=>{
         let errors:FormikErrorType = {}
            if(values.email === ''){
                errors.email = 'Email required'
            }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }else if(values.password.length < 3){
                errors.password = 'password under minimum 3 symbols'
            }
            return errors
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
            formik.resetForm()
        },
    });

    return (

        <Grid container justifyContent={'center'}>
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
                            <TextField {...formik.getFieldProps('email')} name='email' variant={"outlined"}
                                       label="Email" margin="normal" value={formik.values.email}/>
                            {formik.touched.email && formik.errors.email ? <div style={{textAlign:'center',color:'red'}}>{formik.errors.email}</div> : null}
                            <TextField {...formik.getFieldProps('password')} name='password' variant={"outlined"}
                                       type="password" label="Password"
                                       margin="normal"
                                       value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? <div style={{textAlign:'center',color:'red'}}>{formik.errors.password}</div> : null}
                            <FormControlLabel label={'Remember me'} control={<Checkbox/>}/>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>

    );
};

export default Login;
