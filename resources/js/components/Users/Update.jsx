import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ModalComponent from "../ModalComponent";
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

    const updateUsers = 'http://localhost/edit-user';

    const formatDate = (date) => {
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate)) {
            const year = parsedDate.getFullYear();
            const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
            const day = String(parsedDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return '';
    };

    const [name, setName] = useState(data.name || '');
    const [lastname, setLastname] = useState(data.lastname || '');
    const [dni, setDni] = useState(data.DNI || '');
    const [phone, setPhone] = useState(data.phone || 0);
    const [email, setEmail] = useState(data.email || '');
    const [role, setRole] = useState(data.role || 'admin');
    const [passw, setPassw] = useState('');
    const [paydate, setPaydate] = useState(formatDate(data.payday) || ''); // Formatea la fecha
    const [salary, setSalary] = useState(data.salary || 0);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${updateUsers}/${data.id}`, {
                name,
                lastname,
                DNI: dni,
                phone,
                email,
                role,
                password: passw,
                salary,
                payday: paydate
            });
            updateUserList();
            handleCloseModal();
            Swal.fire('Edited!', '', 'success');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };


    return (
        <>
            <Button variant="success" onClick={handleShowModal}>
                <i className="fa-solid fa-pen-to-square"></i>
            </Button>

            <ModalComponent
                title="Update User"
                show={showModal}
                onHide={handleCloseModal}
            >
                <form onSubmit={updateUser}>
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
                            <input type="password" autoComplete="off" className="form-control" id="passw"
                                value={passw}
                                onChange={(e) => setPassw(e.target.value)} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                    <div className="mb-3">
                            <label htmlFor="salary" className="form-label">Salary</label>
                            <input type="number" autoComplete="off" className="form-control" required id="salary"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="paydate" className="form-label">Payday</label>
                            <input type="date" autoComplete="off" className="form-control" required id="paydate"
                                value={paydate}
                                onChange={(e) => setPaydate(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-check">
                        {role !== 'admin' && (
                            <div>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    autoComplete="off"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    value={role} // Asegúrate de establecer el valor correcto aquí
                                    onChange={(e) => setRole('admin')} // Asegúrate de establecer 'admin' como valor aquí
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Admin
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="form-check">
                        {role !== 'client' && (
                            <div>
                                <input className="form-check-input" autoComplete="off" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value = 'client')} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Client
                                </label>
                            </div>
                        )}
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

export default Update;
