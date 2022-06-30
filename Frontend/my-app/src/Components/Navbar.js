import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import AuthContext from '../Context/AuthContext'
import ToastContext from '../Context/ToastContext'


export default function Navbar({ title = "Contact-management-application" }) {
    const { toast } = useContext(ToastContext)
    const navigate = useNavigate()
    const { user, setUser } = useContext(AuthContext)
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{title}
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav ms-auto">
                            {user ?
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link " to="/myContacts">All contacts</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link " to="/create">Create</Link>
                                    </li>

                                    <li className="nav-item">

                                        <button className="btn btn-danger" onClick={() => {
                                            setUser(null)
                                            localStorage.clear()
                                            toast.success("successfully Logged out !")
                                            navigate("/login", { replace: true })
                                        }}>Logout</button>
                                    </li>
                                </> :
                                <> <li className="nav-item">
                                    <Link className="nav-link active" to="/login">Login
                                        <span className="visually-hidden">(current)</span>
                                    </Link>
                                </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/register">Register</Link>
                                    </li>
                                </>}




                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}
