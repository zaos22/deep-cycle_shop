import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ModalComponent from "../ModalComponent";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Duplicate({ updateUserList, idProduct }) {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
        newMontage();
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const x2Product = 'http://localhost/duplicate-product'
    const _1Product = 'http://localhost/sell-product'
    const _Product = 'http://localhost/soldout-product'

    const x2Products = async () => {
        await axios.post(x2Product + '/' + idProduct);
        Swal.fire('Great!', 'The product was duplicated', 'success');
        updateUserList()
        handleCloseModal()
    }

    const _1Products = async () => {
        await axios.delete(_1Product + '/' + idProduct);
        Swal.fire('Great!', 'The product was sold', 'success');
        updateUserList()
        handleCloseModal()
    }

    const _Products = async () => {
        await axios.delete(_Product + '/' + idProduct);
        Swal.fire('Great!', 'All the products are sold out', 'success');
        updateUserList()
        handleCloseModal()
    }

    return (
        <>
            <Button variant="secondary" onClick={handleShowModal}>
                <i className="fa-solid fa-gear"></i>
            </Button>

            <ModalComponent
                title="Products Settings"
                show={showModal}
                onHide={handleCloseModal}
            >
                <div className="d-flex justify-content-between">
                    <div></div>
                    <div></div>
                    <div className='pe-2'>
                        <label htmlFor="duplicate">Duplicate 5</label>
                    </div>
                    <div className='pe-2'>
                        <label htmlFor="soldone">Sold 5</label>
                    </div>
                    <div className='pe-2'>
                        <label htmlFor="soldout">Sold Out</label>
                    </div>
                    <div></div>
                    <div></div>
                </div>
                <div className='pt2 pb-2'></div>
                <div className="d-flex justify-content-between">
                    <div></div>
                    <div></div>
                    <div className='pe-2'>
                        <Button variant="primary" onClick={x2Products}>
                            <i className="fa-solid fa-plus"></i>
                        </Button>
                    </div>
                    <div className='pe-2'>
                        <Button variant="secondary" onClick={_1Products}>
                            <i className="fa-solid fa-money-bill-1-wave"></i>
                        </Button>
                    </div>
                    <div className='pe-2'>
                        <Button variant="success" onClick={_Products}>
                            <i className="fa-solid fa-sack-dollar"></i>
                        </Button>
                    </div>

                    <div></div>
                    <div></div>
                </div>
                <div className="modal-footer">
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </div>
            </ModalComponent>
        </>
    );
}

export default Duplicate;
