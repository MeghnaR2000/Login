import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clearLog } from '../redux/RegisterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../redux/LoginSlice'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, redirectToLog } = useSelector(state => state?.login);

  const validation = () => {
    let err = {}

    if (user?.email === '') {
      err.name = 'Email is required'
    }
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)) {
        err.email = 'Enter a valid email'
    }

    if (user?.password?.length === 0) {
      err.name = 'Password is required'
    }
    return err;
  }

  const postUserData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value })

    if (name === 'email') {
      if (value.length === 0) {
        setError({ ...error, email: '@Email is required' })
        setUser({ ...user, email: '' })
      } else {
        setError({ ...error, email: '' })
        setUser({ ...user, email: value })
      }
    }

    if (name === 'password') {
      if (value.length === 0) {
        setError({ ...error, password: '@Password is required' })
        setUser({ ...user, password: '' })
      } else {
        setError({ ...error, password: '' })
        setUser({ ...user, password: value })
      }
    }
  }

  const submitInfo = (e) => {
    e.preventDefault()
    const errorList = validation()
    setError(errorList)
    if (Object.keys(errorList)?.length < 1) {

      dispatch(userLogin(user));
    }
  }
  const redirectUser = () => {
    const token = localStorage.getItem('token');
    if (token !== '' && token !== null && token !== undefined) {
      navigate('/');
    }
  }
  useEffect(() => {
    redirectUser();
  }, [redirectToLog]);


  const log = () => {
    dispatch(clearLog);
  }
  return (
    <>
      <>
        <div className="card" style={{ width: '30rem', margin: '50px auto' }}>
          <div className="card-body">
            <h5 className="card-title">Login Form</h5>
            <form>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  value={user?.email}
                  placeholder='Enter your email'
                  onChange={postUserData}
                />
                <span style={{ color: 'red' }}>{error?.email}</span>

              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" name='password' className="form-control" id="exampleInputPassword1"
                  value={user?.password}
                  placeholder='Enter your Password'
                  onChange={postUserData}
                />
                <span style={{ color: 'red' }}>{error?.password}</span>
              </div>

              <button type="submit" onClick={submitInfo} className="btn btn-primary">Login</button>
              **Don't have an account??<Link to='/register' onClick={log}>Register</Link>
            </form>

          </div>
        </div>

      </>
    </>
  )
}

export default Login