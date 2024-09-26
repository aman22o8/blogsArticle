import React from 'react'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useDispatch} from "react-redux";
// import { useNavigate,redirect } from 'react-router-dom';



const LogoutBtn = () => {
    const dispatch=useDispatch()
    

    const logoutHandler=()=>{

      authService.logOut()
      .then(()=>{
        dispatch(logout())
      })
      .catch((e)=>{
        console.log("this is logout error",e)
      })

      
    }


  return (
    <button onClick={logoutHandler} className='inline-block px-6 rounded-full font-semibold py-2 duration-200 hover:bg-[#90A955]'>Logout</button>
  )
}

export default LogoutBtn