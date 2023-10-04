import react from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";

const usersAPI = 'http://localhost/users-data'

export default function Users() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const res = await axios.get(usersAPI)
        setUsers(res.data)
    }

    return (
        <div>
            <div>

                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Create User
                </button>

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New User</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <table className="table table-hover">
                <thead className="custom-thead text-center">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">ID</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Discharge date</th>
                    </tr>
                </thead>
                <tbody className="custom-tbody text-center">
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.lastname}</td>
                            <td>{user.DNI}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.created_at.substring(0, 10)}</td>
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
