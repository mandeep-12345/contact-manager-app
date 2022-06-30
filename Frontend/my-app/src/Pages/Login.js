import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom"

// import { toast ,ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../Context/AuthContext';
import ToastContext from '../Context/ToastContext';



export default function Login() {
    const{toast}=useContext(ToastContext)
    const {loginUser}=useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setCredentials({ ...credentials, [name]: value })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        
        
        if (!credentials.email || !credentials.password) {
            toast.error("Please enter all the required fields")
            return
        }
        loginUser(credentials)
        
    }
    return (

        <div>
            {/* <ToastContainer autoClose={2000} /> */}
            <h1>This is login page</h1>


            <form onSubmit={handleSubmit} >



                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email address</label>
                    <input type="email"
                        className="form-control"
                        id="inputEmail"
                        aria-describedby="emailHelp"
                        name="email"
                        value={credentials.email}
                        onChange={handleInputChange}
                        required
                        placeholder="johndoe@gmail.com" />

                </div>
                <div className="form-group ">
                    <label htmlFor="inputPassword" className="form-label mt-4">Password</label>
                    <input type="password"
                        className="form-control"
                        id="inputPassword"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your password" />

                </div>
                <input type="submit" value="Login" className='btn btn-primary my-3 mx-2' />

                <p>Don't have an account? <Link to='/register'>Create one</Link></p>



            </form>

        </div>
    )
}
