import React from 'react'
import {Container,Logo,LogoutBtn} from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {
    const authStatus=useSelector((state)=> state.status)
    const navigate=useNavigate()

    const navItems=[

        {
            name:'Home',
            slug:'/',
            active:true

        },
        {
            name:'Login',
            slug:'/login',
            active:!authStatus

        },
        {
            name:'Signup',
            slug:'/signup',
            active:!authStatus

        },
        {
            name:'All Posts',
            slug:'/all-posts',
            active:authStatus

        },
        {
            name:'Add Post',
            slug:'/add-post',
            active:authStatus

        },
        
    ]


      
  return (
    <header className='py-3 shadow border-b-2 border-black bg-[#ecf39e]'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4 '>
                        <Link 
                        to='/'>
                        <Logo width='70px'/>
                        </Link>

                    </div>
                    <ul className='flex  ml-auto'>
                        {
                            navItems.map((each)=>{
                              return each.active ? <li className='gap-2 ' key={each.name}>
                                    <button className='inline-block px-6 py-2 hover:bg-[#90A955] rounded-full font-semibold duration-300'
                                     onClick={()=> navigate(each.slug)}
                                     >{each.name}</button>
                              </li> : null
                                
                            })
                        }
                        {authStatus && (<li>
                            <LogoutBtn/>
                        </li>)}
                    </ul>
                </nav>


            </Container>

    </header>
  )
}

export default Header