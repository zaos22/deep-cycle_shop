import react from "react";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import Create from "./Create";
import Delete from "./Delete";
import Update from "./Update";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";

const suppliersAPI = 'http://localhost/suppliers-data'


export default function Suppliers() {
    const [suppliers, setSuppliers] = useState([])

    const updateUserList = () => {
        getSuppliers();
    };

    useEffect(() => {
        getSuppliers()
    }, [])

    const getSuppliers = async () => {
        const res = await axios.get(suppliersAPI)
        setSuppliers(res.data)
    }

    return (
        <div>
            <div>
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
                            <td>{supplier.type}</td>
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
