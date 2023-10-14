import react from "react";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import Create from "./Create";
import Delete from "./Delete";
import Update from "./Update";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";


export default function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const updateUserList = () => {
        getProducts();
    };

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async (searchTerm) => {
        try {
            const res = await axios.get(`/products-data?search=${searchTerm || ''}`)
            setProducts(res.data)
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    }

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);

        // Llama a la función para obtener proveedores
        // Si el campo de búsqueda está vacío, no se especifica un término de búsqueda
        getProducts(searchTerm === '' ? null : searchTerm);
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
                    {products.map((product) => (
                        <tr key={product.id} className="headerbg1">
                            <td>{product.name}</td>
                            <td>{product.lastname}</td>
                            <td>{product.DNI}</td>
                            <td>{product.phone}</td>
                            <td>{product.email}</td>
                            <td>{product.role}</td>
                            <td>{product.created_at == null ? 'Pending' : product.created_at.substring(0, 10)}</td>
                            <td>
                                <div className="d-flex justify-content-between">
                                    <div className="pe-2">
                                        <Update updateUserList={updateUserList} data={product}></Update>
                                    </div>
                                    <div className="pe-2">
                                        <Delete userId={product.id} updateUserList={updateUserList} />
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

if (document.getElementById('products')) {
    createRoot(document.getElementById('products')).render(<Products />);
}
