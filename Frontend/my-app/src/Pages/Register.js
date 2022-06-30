import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"


import AuthContext from '../Context/AuthContext';
import ToastContext from '../Context/ToastContext';

export default function Register() {
    const{toast}=useContext(ToastContext)
    const { registerUser } = useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""

    })
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setCredentials({ ...credentials, [name]: value })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(credentials)
        if (!credentials.email || !credentials.password || !credentials.confirmPassword) {
            toast.error("Please fill out all the required fields")
            return;
        }
        if (credentials.password !== credentials.confirmPassword) {
            toast.error("Password doesn't match,please enter correct password")
        }
        const userData = { ...credentials, confirmPassword: undefined }
        registerUser(userData)
    }
    return (
        <div>
            
            <h1>Create your account here</h1>
            <form onSubmit={handleSubmit} >
                <div class="form-group">
                    <label for="nameInput" class="form-label mt-4">
                        Your Name
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="nameInput"
                        name="name"
                        value={credentials.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                    />
                </div>


                <div className="form-group">
                    <label for="exampleInputEmail1" className="form-label mt-4">Email address</label>
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
                    <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
                    <input type="password"
                        className="form-control"
                        id="inputPassword"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your password" />
                </div>
                <div className="form-group ">
                    <label for="confirmPassword" className="form-label mt-4">Confirm Password</label>
                    <input type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={credentials.confirmPassword}
                        onChange={handleInputChange}
                        required
                        placeholder="Confirm your password" />
                </div>

                <input type="submit" value="Register" className='btn btn-primary my-3 mx-2' />

                <p>Already have an account? <Link to='/login'>Login</Link></p>



            </form>
        </div>
    )
}
