import React, { useContext, useEffect, useState } from 'react'

import { Modal } from "react-bootstrap"
import ToastContext from '../Context/ToastContext'
import { Link } from 'react-router-dom'



export default function AllContact() {
    const [searchInput, setSearchInput] = useState("");

    const { toast } = useContext(ToastContext)
    const [showModel, setShowModel] = useState(false)

    const [modelData, setModelData] = useState({})
    const [contacts, setContacts] = useState([])
    useEffect(()=>{
        getExistingContact()

    }, [])
    const getExistingContact=async () => {

        try {
            const res = await fetch(`https://be-10x-cms.herokuapp.com/api/myContacts`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },

            })
            const result = await res.json()
            if (!result.error) {
                setContacts(result.contacts)



            }

        } catch (error) {
            console.log(error)

        }

    }
    const deleteContact = async (id) => {
        if (window.confirm("are you sure you want to delete this contact?")) {
            try {
                const res = await fetch(`https://be-10x-cms.herokuapp.com/api/delete/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },

                    })
                const result = await res.json()
                if (!result.error) {
                    setContacts(result.myContacts);
                    toast.success("deleted contact")
                    setShowModel(false)


                }
                else {
                    toast.error(result.error)

                }

            } catch (error) {
                console.log(error)

            }

        }


    }
    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const newSearchUser = contacts.filter((contact) =>
            contact.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        console.log(newSearchUser);
        setContacts(newSearchUser);
    };



    return (
        <div>
            <div >
                <h1>Your contacts</h1>
                <a href="/myContacts" className="btn btn-danger my-2">
                    Reload Contact
                </a>
                {contacts.length === 0 ? <h3 >No contacts created yet</h3> : (
                    <>
                        <form className="d-flex" onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                name="searchInput"
                                id="searchInput"
                                className="form-control my-2"
                                placeholder="Search Contact"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button type="submit" className="btn btn-info mx-2 ">
                                Search
                            </button>
                        </form>
                        <h3>Your total contacts: {contacts.length}</h3>
                        <table className="table table-hover mt-3">
                            <thead className="table table-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map(contact => (
                                    <tr key={contact._id} onClick={() => {
                                        setModelData({})
                                        setModelData(contact)
                                        setShowModel(true)
                                    }} >
                                        <th scope="row">{contact.name}</th>
                                        <td>{contact.address}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.phone} </td>
                                    </tr>
                                ))}



                            </tbody>
                        </table>
                    </>)


                }


            </div>
            <Modal show={showModel} onHide={() => setShowModel(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>{modelData.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h3>{modelData.name}</h3>
                    <p><strong>Address:</strong> {modelData.address} </p>
                    <p><strong>Email: </strong>{modelData.email} </p>
                    <p><strong>Phone number: </strong> {modelData.phone} </p>
                </Modal.Body>

                <Modal.Footer>
                    <Link className="btn btn-info" to={`/edit/${modelData._id}`}>
                        Edit
                    </Link>
                    <button className="btn btn-warning" onClick={() => setShowModel(false)}>Close</button>
                    <button className="btn btn-danger" onClick={() => deleteContact(modelData._id)}>Delete contact</button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}
