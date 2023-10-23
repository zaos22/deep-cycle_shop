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

    const x1Product = 'http://localhost/duplicate1-product'
    const x5Product = 'http://localhost/duplicate-product'
    const _1Product = 'http://localhost/sell1-product'
    const _5Product = 'http://localhost/sell-product'
    const _Product = 'http://localhost/soldout-product'

    const x1Products = async () => {
        await axios.post(x1Product + '/' + idProduct);
        Swal.fire('Great!', 'The product was duplicated', 'success');
        updateUserList()
        handleCloseModal()
    }

    const x5Products = async () => {
        await axios.post(x5Product + '/' + idProduct);
        Swal.fire('Great!', 'The products are duplicated', 'success');
        updateUserList()
        handleCloseModal()
    }

    const _1Products = async () => {
        await axios.delete(_1Product + '/' + idProduct);
        Swal.fire('Great!', 'The product was sold', 'success');
        updateUserList()
        handleCloseModal()
    }

    const _5Products = async () => {
        await axios.delete(_5Product + '/' + idProduct);
        Swal.fire('Great!', 'The products are sold', 'success');
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
                                <Button variant="primary" onClick={x1Products}>
                                    <i className="fa-solid fa-cart-flatbed"></i>
                                </Button>
                                <div className='mt-1'>
                                    <label htmlFor="duplicate1">1</label>
                                </div>
                            </div>
                            <div className='pe-2'>
                                <Button variant="secondary" onClick={x5Products}>
                                    <i className="fa-solid fa-boxes-stacked"></i>
                                </Button>
                                <div className='mt-1'>
                                    <label htmlFor="duplicate5">5</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <div className='mb-2'>
                            <label htmlFor="sold">Sold</label>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className='pe-2'>
                                <Button variant="primary" onClick={_1Products}>
                                    <i className="fa-solid fa-money-bill-1-wave"></i>
                                </Button>
                                <div className='mt-1'>
                                    <label htmlFor="soldone">1</label>
                                </div>
                            </div>
                            <div className='pe-2'>
                                <Button variant="secondary" onClick={_5Products}>
                                    <i className="fa-solid fa-money-bills"></i>
                                </Button>
                                <div className='mt-1'>
                                    <label htmlFor="soldfive">5</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <div className='mb-2'>
                            <label htmlFor="soldout">Sold Out</label>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className='pe-2'>
                                <Button variant="success" onClick={_Products}>
                                    <i className="fa-solid fa-sack-dollar"></i>
                                </Button>
                            </div>
                        </div>
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
