import react from "react";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import axios from "axios";
import Bill_Lines from './Bill_Lines';
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";


export default function Bills() {
    const [bills, setBills] = useState([])
    const [search, setSearch] = useState("");

    useEffect(() => {
        getBills()
    }, [])

    const getBills = async (searchTerm) => {
        try {
            // Si searchTerm es null, obtiene todos los proveedores
            const response = await axios.get(`/bills-data?search=${searchTerm || ''}`);
            setBills(response.data);
        } catch (error) {
            console.error('Error al obtener proveedores:', error);
        }
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);

        // Llama a la función para obtener proveedores
        // Si el campo de búsqueda está vacío, no se especifica un término de búsqueda
        getBills(searchTerm === '' ? null : searchTerm);
    };


    return (
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
            </div>
            <table className="table-auto table-hover w-full shadow-lg rounded-lg">
                <thead>
                    <tr className="colorbg shadow-lg rounded-lg text-black">
                    <th className="px-6 py-3 uppercase">
                            Bill Name
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Client
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Supplier
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Date
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Bill Lines
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody className="custom-tbody text-center">
                    {bills.map((bill) => (
                        <tr key={bill.id} className="headerbg1">
                            <td>{bill.name}</td>
                            <td>{bill.client}</td>
                            <td>{bill.supplier}</td>
                            <td>{bill.date == null ? 'Pending' : bill.date.substring(0, 10)}</td>
                            <td><Bill_Lines billID={bill.id}></Bill_Lines></td>
                            <td>{bill.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

if (document.getElementById('bills')) {
    createRoot(document.getElementById('bills')).render(<Bills />);
}
