import ReactDOM from 'react-dom/client'

import './index.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import Root from './routes/root.tsx'
import Index from './routes/index.tsx'
import Profile, { profileLoader } from './routes/auth/profile.tsx'
import About, { AboutLoader } from './routes/about.tsx'
import Login from './routes/login.tsx'
import useAuthStore from './store/authStore.ts'
import Parcels from './routes/auth/parcels.tsx'
import { protectedLoader } from './loaders/protectedLoader.ts'


const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <Root />,
    async loader(){
      //! Hooks can only be called inside of the body of a function component.
      return useAuthStore.getState();
    },
    children: [
      { index: true, element: <Index /> },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/logout',
        async loader() {
          //! Hooks can only be called inside of the body of a function component.
          await useAuthStore.getState().logoutBlacklisToken()
          return redirect('/login')
        },
      },
      {
        path: '/profile',
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: '/parcels',
        element: <Parcels />,
        loader: protectedLoader,
      },
      {
        path: '/about',
        element: <About />,
        loader:AboutLoader,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  // </React.StrictMode>,
    <RouterProvider router={router} />
)
