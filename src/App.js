import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/common/Navbar'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { check_token } from "./redux/LoginSlice";
import Student from './pages/Student';
import AddStudent from './pages/AddStudent'
import Edit from './pages/Edit'


const App = () => {
  const dispatch=useDispatch();
  const ProtectedRoute = ({ children }) => {
    const token=localStorage.getItem('token');
    return (token !== '' && token !== null && token !== undefined)?
    <>
      {children}
    </>:
    <>
    <Navigate to='/login'/>
    </>
  }

  const publicRoute = [
    {
      path: '/login',
      component: <Login />
    },
    {
      path: '/register',
      component: <Register />
    }
  ];
  const privateRoutes = [
    {
      path: '/',
      component:<Home/>
    },
    {
      path:'/student',
      component:<Student/>
    },
    {
      path:'/addStudent',
      component:<AddStudent/>
    },
    {
      path:'/edit/:id',
      component:<Edit/>
    },
  ]
  useEffect(()=>{
    dispatch(check_token())
  },[dispatch])
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          {
            publicRoute?.map((route, index) => {
              return (<>
                <Route
                  key={index?.id}
                  exact path={route?.path}
                  element={route?.component}
                />
              </>)
            })
          }
          {
            privateRoutes?.map((route, index) => {
              return (<>
                <Route
                  key={index?.id}
                  exact path={route?.path}
                  element={(<ProtectedRoute>{route?.component}</ProtectedRoute>)}
                />
              </>)
            })
          }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App