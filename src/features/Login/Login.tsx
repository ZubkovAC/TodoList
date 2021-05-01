import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import { useFormik } from 'formik'
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import { AppRootStateType } from '../../app/store';
import { Redirect } from 'react-router-dom';


export const Login = () => {


    const dispatch= useDispatch()
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length > 15) {
                errors.password = 'Must be 15 characters or less';
            } else if (values.password.length < 6) {
                errors.password = 'Must be 6 characters or less';
            }
            return errors;
        },
        onSubmit: data => {
            dispatch(loginTC(data))
            formik.resetForm()
        },
    })

    if (isLoggedIn){
        return <Redirect  to={'/'}/>
    }


    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {
                            formik.values.email
                            && formik.errors.email
                            && <div style={{color:'red'}}>{formik.errors.email}</div>
                        }
                        <TextField
                            type="password"
                            label="Password"
                            {...formik.getFieldProps('password')}
                        />
                        {
                            formik.values.password
                            && formik.errors.password
                            && <div style={{color:'red'}}>{formik.errors.password}</div>
                        }
                        <FormControlLabel
                            label={'Remember me'}
                            control={
                                <Checkbox
                                    onChange={formik.handleChange}
                                    checked={formik.values.rememberMe}
                                    name='rememberMe'
                                />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
