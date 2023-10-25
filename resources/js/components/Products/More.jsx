import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ModalComponent from "../ModalComponent";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function More({ idProduct, update }) {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        getInfo()
    }, [])

    const moreInfo = 'http://localhost/moreinfo'
    // const mountedby= ''

    const [info, setInfo] = useState('')

    const getInfo = async () => {
        try {
            const res = await axios.get(moreInfo + '/' + idProduct)
            setInfo(res.data[0])
            update()
        } catch (error) {
            console.error('Error al obtener info:', error);
        }
    }

    return (
        <>
            <Button variant="info" onClick={handleShowModal}>
                <i className="fa-solid fa-circle-info"></i>
            </Button>

            <ModalComponent
                title="More info"
                show={showModal}
                onHide={handleCloseModal}
            >

                <form>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 pe-5">
                            <label htmlFor="stock" className="form-label">Stock</label>
                            <input type="number" autoComplete="off" className="form-control" id="stock" aria-describedby="stock"
                                defaultValue={info.stock}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mountedby" className="form-label">Mounted By</label>
                            <input type="text" autoComplete="off" className="form-control" id="mountedby"
                                defaultValue={info.name + ' ' + info.lastname}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </div>
                </form>
            </ModalComponent>
        </>
    );
}

export default More;
