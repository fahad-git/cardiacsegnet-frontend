"use client";

import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Link from 'next/link'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IUser } from "@/utils/schema/auth";
import { registerUser } from "@/services/auth";
import { RESPONSE_CODES } from "@/utils/constants";
import { useRouter } from "next/navigation";
import PATHS from "@/utils/paths";
import Loader from "@/handlers/loader/loader";
import "./register.css"

function Register(){

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false)
    const [togglePasswordConfirm, setTogglePasswordConfirm] = useState(false)

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('First Name is required'),
        email: Yup.string()
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        passwordConfirmation: Yup.string()
            .required('Password confirmation is required')
            .min(8, 'Password must be at least 8 characters')
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(userDetails: any) {
        setIsLoading(true);
        const emailSplit = userDetails.email.split("@");
        const user: IUser = {
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
            username: emailSplit[0]
        }
        registerUser(user)
        .then(res => {
            if(res.status === RESPONSE_CODES.SUCCESS || res.status === RESPONSE_CODES.SUCCESS_WITHOUT_CONTENT){
                router.push(PATHS.LOGIN)
            }
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            console.log(err)
        })
    }

    return <>
        <div className="app-container ">
            <div className="title">Medical Image Analytics</div>
            <div className="card">
                <h4 className="card-header">Register</h4>
                {isLoading && (
                    <>
                        <div className="register-loader-container"></div>
                        <Loader />
                    </>
                )}
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type={togglePassword ? "text": "password"}  {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            {togglePassword ? <VisibilityIcon className="password-icon" onClick={() => setTogglePassword(!togglePassword)} />: <VisibilityOffIcon className="password-icon" onClick={() => setTogglePassword(!togglePassword)}/>}
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type={togglePasswordConfirm ? "text": "password"} {...register('passwordConfirmation')} className={`form-control ${errors.passwordConfirmation ? 'is-invalid' : ''}`} />
                            {togglePasswordConfirm ? <VisibilityIcon className="password-confirm-icon" onClick={() => setTogglePasswordConfirm(!togglePasswordConfirm)} />: <VisibilityOffIcon className="password-confirm-icon" onClick={() => setTogglePasswordConfirm(!togglePasswordConfirm)}/>}
                            <div className="invalid-feedback">{errors.passwordConfirmation?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                        <Link href={PATHS.LOGIN} className="btn btn-link">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    </>

}

export default Register;