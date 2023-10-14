import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ModalComponent from "../ModalComponent";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Payrolls({ pay, paydate }) {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const [salary, setSalary] = useState(0)
    const [date, setDate] = useState('')

    const openEdit = () => {
        handleShowModal()
        setSalary(pay)
        setDate(paydate)
    };

    return (
        <>
            <Button variant="secondary" onClick={openEdit}>
            <i className="fa-solid fa-money-bill"></i>
            </Button>

            <ModalComponent
                title="Payroll User"
                show={showModal}
                onHide={handleCloseModal}
            >
                <form>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3">
                            <label htmlFor="salary" className="form-label">Salary</label>
                            <input type="number" autoComplete="off" className="form-control" id="salary" aria-describedby="salary"
                                defaultValue={pay}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="payday" className="form-label">Payday</label>
                            <input type="date" autoComplete="off" className="form-control" id="payday"
                                defaultValue={paydate}
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

export default Payrolls;
