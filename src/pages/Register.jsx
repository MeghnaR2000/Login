import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userRegister, clearLog } from '../redux/RegisterSlice'

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    })
    const [error, setError] = useState({})
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {loading,redirectReg}=useSelector(state=>state?.registration);

    const validation = () => {
        let err = {}

        if (user?.name === '') {
            err.name = 'Name is required'
        }
        if (user?.email === '') {
            err.name = 'Email is required'
        }
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)) {
            err.email = 'Enter a valid email'
        }
        if (user?.mobile?.length === 0) {
            err.name = 'Mobile number is required'
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

        if (name === 'name') {
            if (value.length === 0) {
                setError({ ...error, name: '@Name is required' })
                setUser({ ...user, name: '' })
            } else {
                setError({ ...error, name: '' })
                setUser({ ...user, name: value })
            }
        }
        if (name === 'email') {
            if (value.length === 0) {
                setError({ ...error, email: '@Email is required' })
                setUser({ ...user, email: '' })
            } else {
                setError({ ...error, email: '' })
                setUser({ ...user, email: value })
            }
        }
        if (name === 'mobile') {
            if (value.length === 0) {
                setError({ ...error, mobile: '@Mobile number is required' })
                setUser({ ...user, mobile: '' })
            } else {
                setError({ ...error, mobile: '' })
                setUser({ ...user, mobile: value })
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

    const submitInfo=(e)=>{
      e.preventDefault()
      const errorList=validation()
      setError(errorList)
      if(Object.keys(errorList?.length===0)){
        dispatch(userRegister(user))
      }

    }

    const redirectUser=()=>{
        const name=localStorage.getItem('name');
        if(name!=='' && name!==null && name!==undefined){
            navigate('/login')
        }
    }

    useEffect(()=>{
        redirectUser()
    },[redirectReg])

    const log=()=>{
        dispatch(clearLog())
    }

    return (
        <>
            <div className="card" style={{ width: '30rem', margin: '50px auto' }}>
                <div className="card-body">
                    <h5 className="card-title">Registration Form</h5>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input type="text" name='name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                value={user?.name}
                                placeholder='Enter your name'
                                onChange={postUserData}
                            />
                            <span style={{ color: 'red' }}>{error?.name}</span>

                        </div>

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
                            <label htmlFor="exampleInputEmail1">Mobile</label>
                            <input type="tl" name='mobile' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                value={user?.mobile}
                                placeholder='Enter your mobile number'
                                onChange={postUserData}
                            />
                            <span style={{ color: 'red' }}>{error?.mobile}</span>
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

                        <button type="submit" onClick={submitInfo} className="btn btn-primary">Register</button>
                             **Already have an account??<Link to='/login' onClick={log}>Login</Link>
                    </form>

                </div>
            </div>

        </>
    )
}

export default Register