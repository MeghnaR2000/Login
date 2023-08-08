import React from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/LoginSlice'
import { toast } from 'react-toastify'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { logouttoggle } = useSelector(state => state?.login);
    const name = localStorage.getItem('name');
    const handleLogout = () => {
        toast.success(`${name} has successfully logged out!!!`);
        dispatch(logout());
        navigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link active text-white" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-white" to='/student'>Student</Link>
                        </li>
                        {
                            (logouttoggle === true) ? <>
                                <li className="nav-item" style={{marginRight:'20px'}}>
                                    <Link className="nav-link active" style={{ border: 'none', color: 'black', fontWeight: 'bold' }}>Hi... {name.split(' ')[0]}</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link active text-white" style={{border:'none',backgroundColor:'black', color:'white', fontWeight:'bold'}} onClick={handleLogout}>LogOut</button>
                                </li>
                            </> : <>
                                <li className="nav-item">
                                    <Link className="nav-link active text-white" to='/login'>Register</Link>
                                </li>
                            </>
                        }
                    </ul>
                   
                </div>
            </nav>

        </>
    )
}

export default Navbar