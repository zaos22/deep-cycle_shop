import react from "react";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import Materials from './Materials/Materials';
import Create from "./Create";
import Delete from "./Delete";
import Update from "./Update";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";


export default function Suppliers() {
    const [suppliers, setSuppliers] = useState([])
    const [search, setSearch] = useState("");

    const updateUserList = () => {
        getSuppliers();
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 8) {
            getSuppliers(); // Obtiene todos los proveedores
        }
    }

    useEffect(() => {
        getSuppliers()
    }, [])

    const getSuppliers = async () => {
        try {
            const response = await axios.get(`/suppliers-data?search=${search}`);
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error al obtener proveedores:', error);
        }
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);

        // Llama a la función para obtener proveedores solo si hay un término de búsqueda
        if (searchTerm !== '') {
            getSuppliers();
        }
    };


    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mb-3 d-flex justify-content-start">
                    <input
                    className="transparent-input"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearchChange}
                        onKeyDown={onKeyDown}
                    />
                </div>
                <div className="mb-3 d-flex justify-content-end">
                    <Create updateUserList={updateUserList}></Create>
                </div>
            </div>
            <table className="table-auto table-hover w-full shadow-lg rounded-lg">
                <thead>
                    <tr className="colorbg shadow-lg rounded-lg text-black">
                        <th className="px-6 py-3 uppercase">
                            Company
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Agent Name
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Agent Lastname
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Phone
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Email
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Material
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Ubication
                        </th>
                        <th className="px-6 py-3 uppercase"></th>
                    </tr>
                </thead>
                <tbody className="custom-tbody text-center">
                    {suppliers.map((supplier) => (
                        <tr key={supplier.id} className="headerbg1">
                            <td>{supplier.company}</td>
                            <td>{supplier.agent_name}</td>
                            <td>{supplier.agent_lastname}</td>
                            <td>{supplier.phone}</td>
                            <td>{supplier.email}</td>
                            <td><Materials idSupplier={supplier.id}></Materials></td>
                            <td>{supplier.ubication}</td>
                            <td>
                                <div className="d-flex justify-content-between">
                                    <div className="pe-2">
                                        <Update updateUserList={updateUserList} data={supplier}></Update>
                                    </div>
                                    <div className="pe-2">
                                        <Delete userId={supplier.id} updateUserList={updateUserList} />
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

if (document.getElementById('suppliers')) {
    createRoot(document.getElementById('suppliers')).render(<Suppliers />);
}
