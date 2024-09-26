import React from 'react'

const Logo = ({width="100px"}) => {
  return (
    <div className='h-full  flex justify-center'>
      <img src="/logomy.png" alt="logo" className='h-[50px] backdrop-filter w-[50px]' />
    </div>
  )
}

export default Logo