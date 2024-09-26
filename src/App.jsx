import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import Button from './components/Button'
import { Outlet } from 'react-router-dom'


//i have to change the api key of RTE in RTE.jsx 


function App() {
 const [isLoading, setisLoading] = useState(true)
 const dispatch = useDispatch()
 
 
 useEffect(() => {
  authService.getCurrentUser()
  .then((userData)=>{
      if(userData){
        dispatch(login({userData}))

      }
      else{
        dispatch(logout())
      }
  })
  .catch((e)=>{
    console.log("this is login error",e)
  })
  .finally(()=>{
    setisLoading(false)
  })

   
 
  
 }, [])
 

  return (!isLoading ?  
    <>
      <div className="bg-rose-700 w-[100%]   min-h-screen flex flex-wrap content-between">
        
        <div className='w-full bg-green-600 block'>
          <Header/>
          <main className='bg-[#90a955] pt-5 min-h-[80vh]'>
            <h1 className=' text-center text-3xl font-bold font-sans'>
              BLOGS ON  :
              </h1>
            <Outlet/> 
            {/* <Button data-test-id="aman" bgColor='bg-red-200' className='border-2 border-orange-600' textColor='text-voilet-800' type='button'  >aply here</Button> */}
          </main>
          <Footer/>
        </div>
      </div>
    </>
    :
    
    <div className='flex  justify-center items-center h-[60vh]'>
        <h1 className='w-full font-semibold text-center mx-auto text-3xl text-black '>Loading...</h1>
      </div>
    
    
  )
}

export default App
