import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ModalComponent from "../../ModalComponent";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Update({ updateUserList, data }) {
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
    const updateMaterials = 'http://localhost/edit-material'

    const [type, setMtype] = useState('')
    const [price, setMprice] = useState(0)

    const x1Material = 'http://localhost/duplicate1-material'
    const x5Material = 'http://localhost/duplicate-material'
    const _1Material = 'http://localhost/used1-material'
    const _5Material = 'http://localhost/used-material'
    const _Material = 'http://localhost/usedall-material'

    const x1Materials = async () => {
        await axios.post(x1Material + '/' + data.id);
        Swal.fire('Great!', 'The material was duplicated', 'success');
        updateUserList()
        handleCloseModal()
    }

    const x5Materials = async () => {
        await axios.post(x5Material + '/' + data.id);
        Swal.fire('Great!', 'The material was duplicated', 'success');
        updateUserList()
        handleCloseModal()
    }

    const _1Materials = async () => {
        await axios.delete(_1Material + '/' + data.id);
        Swal.fire('Great!', 'The material was used', 'success');
        updateUserList()
        handleCloseModal()
    }

    const _5Materials = async () => {
        await axios.delete(_5Material + '/' + data.id);
        Swal.fire('Great!', 'The material was used', 'success');
        updateUserList()
        handleCloseModal()
    }

    const _Materials = async () => {
        await axios.delete(_Material + '/' + data.id);
        Swal.fire('Great!', 'All the materials are used', 'success');
        updateUserList()
        handleCloseModal()
    }


    const updateMaterial = async (e) => {
        e.preventDefault();
        await axios.put(updateMaterials + '/' + data.id, {
            type: type,
            price: price,
        });
        handleCloseModal()
        updateUserList()
        Swal.fire("Edited!", "", "success");
    };

    return (
        <>
            <Button variant="success" onClick={openEdit}>
                <i className="fa-solid fa-pen-to-square"></i>
            </Button>

            <ModalComponent
                title="Update Supplier"
                show={showModal}
                onHide={handleCloseModal}
            >
                <form onSubmit={updateMaterial}>
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
                    <div className='pt2 pb-2'></div>
                    <div className="d-flex justify-content-between">
                        <div></div>
                        <div></div>
                        <div className='text-center'>
                            <div className='mb-2'>
                                <label htmlFor="duplicate">Duplicate</label>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className='pe-2'>
                                    <Button variant="primary" onClick={x1Materials}>
                                        <i className="fa-solid fa-1"></i>
                                    </Button>
                                </div>
                                <div className='pe-2'>
                                    <Button variant="secondary" onClick={x5Materials}>
                                        <i class="fa-solid fa-5"></i>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className='text-center'>
                            <div className='mb-2'>
                                <label htmlFor="soldone">Used</label>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className='pe-2'>
                                    <Button variant="primary" onClick={_1Materials}>
                                        <i className="fa-solid fa-1"></i>
                                    </Button>
                                </div>
                                <div className='pe-2'>
                                    <Button variant="secondary" onClick={_5Materials}>
                                        <i class="fa-solid fa-5"></i>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className='text-center'>
                        <div className='mb-2'>
                            <label htmlFor="soldout">All Used</label>
                        </div>
                            <div className="d-flex justify-content-between">
                                <div className='pe-2'>
                                    <Button variant="danger" onClick={_Materials}>
                                        <i className="fa-solid fa-warehouse"></i>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className='mb-5'></div>
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

export default Update;
