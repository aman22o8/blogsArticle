import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Protected = ({children,authentication=true}) => {
    const navigate=useNavigate()
    const [loader, setloader] = useState(true)
    const authstatus=useSelector((state)=> state.status)


            // let authValue=authstatus===true ? true :false

            
    useEffect(() => {
      if (authentication &&authstatus!==authentication) {
        navigate('/login')
        
      } else if(!authentication && authstatus !== authentication) {
        navigate('/')
        
      }
      setloader(false)  
    }, [authstatus,navigate,authentication])
    


  return loader ? <h1>Loading...</h1>  : <>{children}</>

}

export default Protected