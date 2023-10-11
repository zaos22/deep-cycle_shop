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
const delMaterial = 'http://localhost/delete-material'

function Materials({ idSupplier }) {
    const [materials, setMaterials] = useState([])
    const [showModal, setShowModal] = useState(false);

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

    const getMaterials = async () => {
        const res = await axios.get(materialsAPI + '/' + idSupplier)
        setMaterials(res.data)
    }

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

                <table className="table-auto table-hover w-full shadow-lg rounded-lg">
                    <thead>
                        <tr className="colorbg shadow-lg rounded-lg text-black">
                            <th className="px-6 py-3 uppercase">
                                Material
                            </th>
                            <th className="px-6 py-3 uppercase">
                                Price
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
