import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Protected,Login, SignUp} from './components/index.js'
import Home from './pages/Home.jsx'
// import Signup from './pages/SignUp.jsx'
import AddPost from './pages/AddPost.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'




const router=createBrowserRouter([

  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'',
        element: <Home/>,
      },
      {
        path:'/login',
        element:(
          <Protected authentication={false}>
            <Login/>
          </Protected>
        )
      },
      {
        path:'/signup',
        element:(
          <Protected authentication={false}>
            <SignUp/>
          </Protected>
        )
      },
      {
        path:'/all-posts',
        element:(
          <Protected authentication>
            <AllPosts/>
          </Protected>
        )
      },
      {
        path:'/add-post',
        element:(
          <Protected authentication>
            <AddPost/>
          </Protected>
        )
      },
      {
        path:'/edit-post/:slug',
        element:(
          <Protected authentication>
          
            <EditPost/>
          </Protected>
        )
      },
      {
        path:'/post/:slug',
        element:(
          <Protected authentication>
            <Post/>
          </Protected>
        )
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} router>
      <RouterProvider router={router}>
      <App />

      </RouterProvider>
    </Provider>
  </StrictMode>,
)
