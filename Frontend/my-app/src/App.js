import React from 'react'
import Layout from './Components/Layout'
import { Routes as Switch, Route } from "react-router-dom"
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { AuthContextProvider } from './Context/AuthContext'
import { ToastContextProvider } from './Context/ToastContext'
import CreateContact from './Pages/CreateContact'
import AllContact from './Pages/AllContact'
import EditContact from './Pages/EditContact'

export default function App() {
  return (
    <div>
      <ToastContextProvider>
        <AuthContextProvider>

          <Layout >

            <Switch>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/create' element={<CreateContact />} />
              <Route path='/myContacts' element={<AllContact />} />
              <Route path="/edit/:id" element={<EditContact />} />
            </Switch>
          </Layout>

        </AuthContextProvider>
      </ToastContextProvider>



    </div>
  )
}
