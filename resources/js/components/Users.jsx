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
    const [isModalOpen, setIsModalOpen] = useState(false); // Nuevo estado para controlar la visibilidad del modal

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
        e.preventDefault();
        await axios.post(storeUsers, {
            name: name,
            lastname: lastname,
            DNI: dni,
            phone: phone,
            email: email,
            role: role,
            password: passw
        });
        getUsers();
        Swal.fire('Created!', '', 'success')
        setIsModalOpen(false);
        setName('');
        setLastname('');
        setDni('');
        setPhone(0);
        setEmail('');
        setRole('');
        setPassw('');
    };

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
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title" id="exampleModalLabel">New User</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={storeUser}>
                                    <div className="d-flex justify-content-between">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" autoComplete="off" className="form-control" id="name" aria-describedby="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="lastname" className="form-label">Lastname</label>
                                            <input type="text" autoComplete="off" className="form-control" id="lastname"
                                                value={lastname}
                                                onChange={(e) => setLastname(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="mb-3">
                                            <label htmlFor="dni" className="form-label">DNI</label>
                                            <input type="text" autoComplete="off" className="form-control" id="dni"
                                                value={dni}
                                                onChange={(e) => setDni(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="form-label">Phone</label>
                                            <input type="number" autoComplete="off" className="form-control" id="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" autoComplete="off" className="form-control" required id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="passw" className="form-label">Password</label>
                                            <input type="password" autoComplete="off" className="form-control" required id="passw"
                                                value={passw}
                                                onChange={(e) => setPassw(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" autoComplete="off" name="flexRadioDefault" id="flexRadioDefault1"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value = 'admin')} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Admin
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" autoComplete="off" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value = 'client')} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Client
                                        </label>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </form>
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
