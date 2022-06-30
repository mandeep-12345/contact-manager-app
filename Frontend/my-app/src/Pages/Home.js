import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

export default function Home() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
   useEffect(() => {
    !user && navigate("/login", { replace: true })

   }, [])
  return ( 
    <div>
      <div className="jumbotron">
        <h1>welcome {user?user.name:null} </h1>
        
        <p className="lead">
          <Link className="btn btn-info mt-2" to={"/create"} role="button">Add contacts</Link>
        </p>
      </div>
    </div>
  )
}
