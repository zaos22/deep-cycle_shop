import react from "react";
import Swal from 'sweetalert2'
import axios from "axios";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";

const usersAPI = 'http://localhost/users-data'
const delUser = 'http://localhost/delete-user'
const storeUsers = 'http://localhost/new-user'

export default function Users() {
    const [users, setUsers] = useState([])

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [dni, setDni] = useState('')
    const [phone, setPhone] = useState(0)
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [passw, setPassw] = useState('')

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const res = await axios.get(usersAPI)
        setUsers(res.data)
    }

    const storeUser = async (e) => {
        e.preventDefault()
        await axios.post(storeUsers, {
            name: name,
            lastname: lastname,
            DNI: dni,
            phone: phone,
            email: email,
            role: role,
            passw: passw
        })
        getUsers()
    }

    const delUsers = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete the user?',
            showDenyButton: true,
            confirmButtonText: 'Confirm',
            denyButtonText: `Cancel`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Deleted!', '', 'success')
                const res = await axios.delete(delUser + '/' + id)
                getUsers()
            } else if (result.isDenied) {
                Swal.fire('The user is safe', '', 'info')
            }
        })
    }

    return (
        <div>
            <div>
                <div className="mb-3 d-flex justify-content-end">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Create User
                    </button>
                </div>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New User</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="d-flex justify-content-between">
                                        <div className="mb-3">
                                            <label for="name" className="form-label">Name</label>
                                            <input type="text" autocomplete="off" className="form-control" id="name" aria-describedby="name" />
                                        </div>
                                        <div className="mb-3">
                                            <label for="lastname" className="form-label">Lastname</label>
                                            <input type="text" autocomplete="off" className="form-control" id="lastname" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="mb-3">
                                            <label for="dni" className="form-label">DNI</label>
                                            <input type="text" autocomplete="off" className="form-control" id="dni" />
                                        </div>
                                        <div className="mb-3">
                                            <label for="phone" className="form-label">Phone</label>
                                            <input type="text" autocomplete="off" className="form-control" id="phone" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="mb-3">
                                            <label for="email" className="form-label">Email</label>
                                            <input type="email" autocomplete="off" className="form-control" id="email" />
                                        </div>
                                        <div className="mb-3">
                                            <label for="passw" className="form-label">Password</label>
                                            <input type="password" autocomplete="off" className="form-control" id="passw" />
                                        </div>
                                    </div>
                                    <div class="form-check">
                                        <input className="form-check-input" type="radio" autocomplete="off" name="flexRadioDefault" id="flexRadioDefault1" value={'admin'} />
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            Admin
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input className="form-check-input" autocomplete="off" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={'client'} checked />
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            Client
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <table className="table-auto table-hover w-full shadow-lg rounded-lg">
                <thead>
                    <tr className="colorbg shadow-lg rounded-lg text-black">
                        <th className="px-6 py-3 uppercase">
                            Name
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Lastname
                        </th>
                        <th className="px-6 py-3 uppercase">
                            ID
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Phone
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Email
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Role
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Discharge date
                        </th>
                        <th className="px-6 py-3 uppercase"></th>
                    </tr>
                </thead>
                <tbody className="custom-tbody text-center">
                    {users.map((user) => (
                        <tr key={user.id} className="headerbg1">
                            <td>{user.name}</td>
                            <td>{user.lastname}</td>
                            <td>{user.DNI}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.created_at == null ? 'Pending' : user.created_at.substring(0, 10)}</td>
                            <td>
                                <div className="d-flex justify-content-between">
                                    <div className="pe-2">
                                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </div>
                                    <div className="pe-2">
                                        <button onClick={() => delUsers(user.id)} type="button" className="btn btn-danger">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

if (document.getElementById('users')) {
    createRoot(document.getElementById('users')).render(<Users />);
}
