import React from 'react'

const Button = ({children,
    type='button',
    bgColor='bg-[#ecf39e]',
    textColor='text-black',
    className='',
    ...props

}) => {
  return (
    <button className={`px-4 py-2 rounded-lg font-semibold 
        duration-500 hover:border-[#132a13]  border-2 ${className} ${bgColor} ${textColor}`} {...props}>
        
        {children}</button>
  )
}

export default Button
//(props)=>{
//     const {children,type='bg-blue}  }