import React from 'react'

import service from '../appwrite/mainconfig'
import { Link } from 'react-router-dom'


// {$id,title,featuredImage}
const PostCard = ({$id,title,featuredImage}) => {
  // const {post}=props
  // const {$id,title,featuredImage}=post
  // console.log("props",props)
  // console.log("Post card ",$id,title,featuredImage)
  return (
    
    // $id is a syntax of appwrite
    <Link to={`/post/${$id}`}>
            <div className="w-full flex-wrap  bg-[#9fd87d] border-[1px] border-[#132a13] rounded-xl min-h-[245px] p-4">
                <div className='w-full justify-center mb-4'>
                    <img src={service.getFilePreview(featuredImage)} alt={title} //yaha ye image ki id khud le lega
                    className='rounded-xl min-h-[120px] h-[130px]'/>
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>

    </Link>
  )
}

export default PostCard