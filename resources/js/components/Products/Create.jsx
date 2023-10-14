import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ModalComponent from "../ModalComponent";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Create({ updateUserList }) {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const storeUsers = 'http://localhost/new-user'

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [dni, setDni] = useState('')
    const [phone, setPhone] = useState(0)
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [passw, setPassw] = useState('')

    const storeUser = async (e) => {
        e.preventDefault();
        await axios.post(storeUsers, {
            name: name,
            lastname: lastname,
            DNI: dni,
            phone: phone,
            email: email,
            role: role,
            password: passw,
        });
        handleCloseModal()
        updateUserList()
        Swal.fire("Created!", "", "success");
        setName("");
        setLastname("");
        setDni("");
        setPhone(0);
        setEmail("");
        setRole("");
        setPassw("");
    };

    return (
        <>
            <Button variant="primary" onClick={handleShowModal}>
                <i className="fa-solid fa-plus"></i>
            </Button>

            <ModalComponent
                title="New User"
                show={showModal}
                onHide={handleCloseModal}
            >
                <form onSubmit={storeUser}>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" autoComplete="off" className="form-control" id="name" aria-describedby="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label">Lastname</label>
                            <input type="text" autoComplete="off" className="form-control" id="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3">
                            <label htmlFor="dni" className="form-label">DNI</label>
                            <input type="text" autoComplete="off" className="form-control" id="dni"
                                value={dni}
                                onChange={(e) => setDni(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="number" autoComplete="off" className="form-control" id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" autoComplete="off" className="form-control" required id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passw" className="form-label">Password</label>
                            <input type="password" autoComplete="off" className="form-control" required id="passw"
                                value={passw}
                                onChange={(e) => setPassw(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" autoComplete="off" name="flexRadioDefault" id="flexRadioDefault1"
                            value={role}
                            onChange={(e) => setRole(e.target.value = 'admin')} />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Admin
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" autoComplete="off" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                            value={role}
                            onChange={(e) => setRole(e.target.value = 'client')} />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Client
                        </label>
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
