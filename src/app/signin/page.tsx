"use client";

import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Link from 'next/link'
import { IAuth } from "@/utils/schema/auth";
import { login } from '@/services/auth'
import { RESPONSE_CODES } from "@/utils/constants";
import { useRouter } from 'next/navigation'
import PATHS from "@/utils/paths";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function Signin() {

    const router = useRouter();
    const [togglePassword, setTogglePassword] = useState(false);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };


    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(credentials: IAuth) {
        login(credentials)
        .then(res => {
            if(res.status == RESPONSE_CODES.SUCCESS){
                console.log(res.data)
                router.push(PATHS.HOME)
            }
        })
        .catch(err => console.log(err))
    }

  return <>
        <div className="app-container">
          <div className="title">Medical Image Analytics</div>
          <div className="card">
              <h4 className="card-header">Login</h4>
              <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                          <label>Email</label>
                          <input type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                          <div className="invalid-feedback">{errors.email?.message}</div>
                      </div>
                      <div className="form-group">
                          <label>Password</label>
                          <input type={togglePassword ? "text": "password"}  {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                          {togglePassword ? <VisibilityIcon className="password-confirm-icon" onClick={() => setTogglePassword(!togglePassword)} />: <VisibilityOffIcon className="password-confirm-icon" onClick={() => setTogglePassword(!togglePassword)}/>}
                          <div className="invalid-feedback">{errors.password?.message}</div>
                      </div>
                      <button disabled={formState.isSubmitting} className="btn btn-primary">
                          {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                          Login
                      </button>
                      <Link href="/register" className="btn btn-link">Register</Link>
                  </form>
              </div>
          </div>
        </div>
  </>
}

export default Signin;
