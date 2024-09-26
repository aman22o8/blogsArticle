import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Container } from '../components'
import service from '../appwrite/mainconfig'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'


const Post = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const [authorAuth, setauthorAuth] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    // console.log("my slug",slug)
    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData);
    // console.log('user data',userData)

    
    

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                setisLoading(true)
                if (post) {
                    // console.log("post",post)
                    setPost(post);
                    const isAuthor = post && userData ? post.userId === userData.$id : false;
                    setauthorAuth(isAuthor)
                    setisLoading(false)

                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    console.log(authorAuth)

    return isLoading || post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {authorAuth && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : <div className='flex  justify-center items-center h-[60vh]'>
        <h1 className='w-full font-semibold text-center mx-auto text-3xl text-blue-300 '>Loading...</h1>
        </div>
        

  
    ;
}

export default Post