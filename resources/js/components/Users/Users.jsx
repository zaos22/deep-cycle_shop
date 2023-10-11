import react from "react";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import Create from "./Create";
import Delete from "./Delete";
import Update from "./Update";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";


export default function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const updateUserList = () => {
        getUsers();
    };

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async (searchTerm) => {
        try {
            const res = await axios.get(`/users-data?search=${searchTerm || ''}`)
            setUsers(res.data)
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    }

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);

        // Llama a la función para obtener proveedores
        // Si el campo de búsqueda está vacío, no se especifica un término de búsqueda
        getUsers(searchTerm === '' ? null : searchTerm);
    };

    return (
        <div>
            <div>
                <div className="d-flex justify-content-between">
                    <div className="mb-3 d-flex justify-content-start">
                        <input
                            id="search"
                            className="transparent-input"
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="mb-3 d-flex justify-content-end">
                        <Create updateUserList={updateUserList}></Create>
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
                                        <Update updateUserList={updateUserList} data={user}></Update>
                                    </div>
                                    <div className="pe-2">
                                        <Delete userId={user.id} updateUserList={updateUserList} />
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
