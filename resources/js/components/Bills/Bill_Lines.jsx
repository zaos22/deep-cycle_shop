import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ModalComponent from "../ModalComponent";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Bill_Lines({ billID }) {
    const [showModal, setShowModal] = useState(false);
    const [bill_lines, setBill_lines] = useState([])
    const [search, setSearch] = useState("");

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        getBill_lines()
    }, [])

    const bill_Lines = 'http://localhost/bill_lines'

    const getBill_lines = async (searchTerm) => {
        try {
            // Si searchTerm es null, obtiene todos los proveedores
            const response = await axios.get(bill_Lines + '/' + billID + `?search=${searchTerm || ''}`);
            setBill_lines(response.data);
        } catch (error) {
            console.error('Error al obtener las lineas de factura:', error);
        }
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);

        // Llama a la función para obtener proveedores
        // Si el campo de búsqueda está vacío, no se especifica un término de búsqueda
        getBill_lines(searchTerm === '' ? null : searchTerm);
    };

    return (
        <>
            <Button variant="info" onClick={handleShowModal}>
                <i className="fa-solid fa-list"></i>
            </Button>

            <ModalComponent
                title="Bill Lines"
                show={showModal}
                onHide={handleCloseModal}
            >
                <div className="mb-3">
                    <input
                        id="search"
                        className="transparent-input"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                <table className="table-auto table-hover w-full shadow-lg rounded-lg table-responsive">
                    <thead className="">
                        <tr className='colorbg shadow-lg rounded-lg text-black'>
                            <th className='px-2 py-1 uppercase'>Bill Name</th>
                            <th className='px-2 py-1 uppercase'>Unity</th>
                            <th className='px-2 py-1 uppercase'>Product Name</th>
                            <th className='px-2 py-1 uppercase'>Material Name</th>
                        </tr>
                    </thead>
                    <tbody className='custom-tbody text-center'>
                        {bill_lines.map((line) => (
                            <tr key={line.id} className="headerbg1">
                                <td>{line.bill_name}</td>
                                <td>{line.unity}</td>
                                <td>{line.product_name}</td>
                                <td>{line.material_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </ModalComponent>
        </>
    );
}

export default Bill_Lines;
