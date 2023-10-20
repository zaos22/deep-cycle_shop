import react from "react";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import axios from "axios";
import ModalComponent from "../../ModalComponent";
import Create from "./Create";
import Update from './Update';
import Delete from "./Delete";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";

const materialsAPI = 'http://localhost/materials-data'

function Materials({ idSupplier }) {
    const [materials, setMaterials] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const updateUserList = () => {
        getMaterials();
    };

    useEffect(() => {
        getMaterials()
    }, [])

    const getMaterials = async (searchTerm) => {
        const res = await axios.get(materialsAPI + '/' + idSupplier + `?search=${searchTerm || ''}`)
        setMaterials(res.data)
    }

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);

        // Llama a la función para obtener proveedores
        // Si el campo de búsqueda está vacío, no se especifica un término de búsqueda
        getMaterials(searchTerm === '' ? null : searchTerm);
    };

    return (
        <div>
            <Button variant="secondary" onClick={handleShowModal}>
                <i className="fa-solid fa-screwdriver-wrench"></i>
            </Button>

            <ModalComponent
                title="Materials"
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

                <table className="table-auto table-hover w-full shadow-lg rounded-lg">
                    <thead>
                        <tr className="colorbg shadow-lg rounded-lg text-black">
                            <th className="px-6 py-3 uppercase">
                                Material
                            </th>
                            <th className="px-6 py-3 uppercase">
                                Price
                            </th>
                            <th className="px-6 py-3 uppercase">
                                Stock
                            </th>
                            <th className="px-6 py-3 uppercase text-center">
                                <Create updateUserList={updateUserList} idSupplier={idSupplier}></Create>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="custom-tbody text-center">
                        {materials.map((material) => (
                            <tr key={material.id} className="headerbg1">
                                <td>{material.type}</td>
                                <td>{material.price}</td>
                                <td>{material.stock}</td>
                                <td>
                                    <div className="d-flex justify-content-between">
                                        <div className="pe-2">
                                            <Update updateUserList={updateUserList} data={material}></Update>
                                        </div>
                                        <div className="pe-2">
                                            <Delete userId={material.id} updateUserList={updateUserList} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ModalComponent>
        </div>
    );
}

export default Materials;
