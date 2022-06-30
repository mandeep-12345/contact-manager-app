import React, {  useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import AuthContext from '../Context/AuthContext'
import ToastContext from '../Context/ToastContext'

export default function CreateContact() {
   
    const navigate = useNavigate()
    // const { user } = useContext(AuthContext);
    const {toast}=useContext(ToastContext)
    const [userDetails, setuserDetails] = useState({
        name: "",
        address: "",
        email: "",
        phone: ""
    })
    
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setuserDetails({ ...userDetails, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const res = await fetch(`https://be-10x-cms.herokuapp.com/api/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(userDetails),
        })
        const result = await res.json()
        if(!result.error){
            console.log(result)
            toast.success(`Created [${userDetails.name}]contact`)
            setuserDetails({name:"",address:"",email:"",phone:""})
            navigate("/myContacts")
        }
        else{
           toast.error(result.error)
        }
       

    }
    return (
        <div>
            <h1>create your contact</h1>
            <form onSubmit={handleSubmit} >
                <div className="form-group ">
                    <label htmlFor="nameInput" className="form-label mt-4">Name of person</label>
                    <input type="text"
                        className="form-control"
                        id="nameInput"
                        name="name"
                        value={userDetails.name}
                        onChange={handleInputChange}
                        required
                        placeholder="john doe" />

                </div>

                <div className="form-group ">
                    <label htmlFor="addressInput" className="form-label mt-4">Address of the person</label>
                    <input type="text"
                        className="form-control"
                        id="addressInput"
                        name="address"
                        value={userDetails.address}
                        onChange={handleInputChange}
                        required
                        placeholder="gandhi nagar 05,delhi" />

                </div>
                <div className="form-group ">
                    <label htmlFor="emailInput" className="form-label mt-4">Email of the person</label>
                    <input type="email"
                        className="form-control"
                        id="emailInput"
                        name="email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        required
                        placeholder="johndoe@gmail.com" />

                </div>
                <div className="form-group ">
                    <label htmlFor="phoneInput" className="form-label mt-4">Phone number of the person</label>
                    <input type="number"
                        className="form-control"
                        id="phoneInput"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+977 8653235543" />

                </div>
                <input type="submit" value="Add Contact" className='btn btn-info my-3' />
            </form>
        </div>
    )
}

