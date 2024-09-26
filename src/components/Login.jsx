import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'

import {Button,Logo,Input} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'

import {useForm} from 'react-hook-form'

const Login = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const [error,setError]=useState('')
   

    const login= async (data)=>{
        setError("")
        try {
          const session=  await authService.logIn(data)
          if (session) {
            const userData= await authService.getCurrentUser()
            // console.log('getting user data in login',userData)
            if(userData){
                dispatch(authLogin(userData))
                //console.log(authLogin(userData)) gives output in {type:"",payload:""}
                navigate('/') //isse programitically kahi bhi bhej skte hai
            }
            
          } 
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full  '>
        <div className={`mx-auto w-full max-w-lg bg-[#4f772d] max-sm:w-[90%] mb-10 rounded-xl p-10 border border-black`}>

        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
        <p className='mt-2 text-center mr-1 text-base text-black'>
        Don't have any account ?  
        <Link to='/signup' className='font-medium ml-1 text-primary transition-all duration-200 hover:underline'>
          Sign Up</Link>
        </p>

        {error && <p className='text-red-500 mt-8 text-center '>{error}</p>}

        {/* yaha handlesubmit method hia useForm ka like setInput method hai usestate ka */}
        
        <form className='mt-8' onSubmit={handleSubmit(login)}>

            <div className='space-y-5'>
                <Input label="Email :" placeholder="Enter your email"
                type="email"
                {...register("email",{
                    required:true,
                    validate:{matchPatern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address" }

                })} // its a javascript spread operator, always spread hogi ye so that other input me override na ho jb hum register use kre 

                />
                <Input 
                label="Password :"
                type="password"
                placeholder="Enter your password"
                {...register("password",{
                    required:true
                })}
                />
                
                <Button type='submit' className='w-full '>Sign in</Button>
            </div>
        </form>


        </div>
    </div>
  )
}

export default Login