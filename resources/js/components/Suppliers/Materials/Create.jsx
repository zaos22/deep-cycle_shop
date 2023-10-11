import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ModalComponent from "../../ModalComponent";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Create({ updateUserList, idSupplier }) {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const openEdit = () => {
        handleShowModal()
        setMtype(data.type);
        setMprice(data.price);
    };
    const createMaterials = 'http://localhost/new-material'

    const [type, setMtype] = useState('')
    const [price, setMprice] = useState(0)


    const createMaterial = async (e) => {
        e.preventDefault();
        await axios.post(createMaterials, {
            type: type,
            price: price,
            suppliers_id: idSupplier
        });
        handleCloseModal()
        updateUserList()
        Swal.fire("Created!", "", "success");
    };

    return (
        <>
            <Button variant="primary" onClick={openEdit}>
                <i className="fa-solid fa-plus"></i>
            </Button>

            <ModalComponent
                title="Update Supplier"
                show={showModal}
                onHide={handleCloseModal}
            >
                <form onSubmit={createMaterial}>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Material</label>
                        <input type="text" autoComplete="off" className="form-control" required id="type"
                            value={type}
                            onChange={(e) => setMtype(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" autoComplete="off" className="form-control" required id="price"
                            value={price}
                            onChange={(e) => setMprice(e.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </ModalComponent>
        </>
    );
}

export default Create;
