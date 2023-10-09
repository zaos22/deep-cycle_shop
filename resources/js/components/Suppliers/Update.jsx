import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ModalComponent from "../ModalComponent";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Create({ updateUserList, data }) {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const openEdit = () => {
        handleShowModal()
        setCompany(data.company);
        setAname(data.agent_name);
        setAlname(data.agent_lastname);
        setPhone(data.phone);
        setEmail(data.email);
        setMtype(data.type);
        setMprice(data.price);
        setUbi(data.ubication);
        setSupplier(data.suppliers_id)
    };
    const updateSuppliers = 'http://localhost/edit-supplier'

    const [company, setCompany] = useState('')
    const [agent_name, setAname] = useState('')
    const [agent_last, setAlname] = useState('')
    const [phone, setPhone] = useState(0)
    const [email, setEmail] = useState('')
    const [ubication, setUbi] = useState('')
    const [type, setMtype] = useState('')
    const [price, setMprice] = useState(0)
    const [supplier, setSupplier] = useState(0)

    const updateSupplier = async (e) => {
        e.preventDefault();
        await axios.put(updateSuppliers + '/' + data.id + '/' + data.material, {
            company: company,
            agent_name: agent_name,
            agent_lastname: agent_last,
            phone: phone,
            email: email,
            ubication: ubication,
            type: type,
            price: price,
            suppliers_id: supplier
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
                <form onSubmit={updateSupplier}>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3">
                            <label htmlFor="company" className="form-label">Company</label>
                            <input type="text" autoComplete="off" className="form-control" id="company" aria-describedby="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="agent_name" className="form-label">Agent Name</label>
                            <input type="text" autoComplete="off" className="form-control" id="agent_name"
                                value={agent_name}
                                onChange={(e) => setAname(e.target.value)} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3">
                            <label htmlFor="agent_lastname" className="form-label">Agent Lastname</label>
                            <input type="text" autoComplete="off" className="form-control" id="agent_lastname"
                                value={agent_last}
                                onChange={(e) => setAlname(e.target.value)} />
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
                            <label htmlFor="type" className="form-label">Material</label>
                            <input type="text" autoComplete="off" className="form-control" required id="type"
                                value={type}
                                onChange={(e) => setMtype(e.target.value)} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" autoComplete="off" className="form-control" required id="price"
                                value={price}
                                onChange={(e) => setMprice(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="supplier" className="form-label">Supplier</label>
                            <input type="text" autoComplete="off" className="form-control" required id="supplier"
                                value={supplier}
                                onChange={(e) => setSupplier(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ubication" className="form-label">Ubication</label>
                        <input type="text" autoComplete="off" className="form-control w-full" required id="ubication"
                            value={ubication}
                            onChange={(e) => setUbi(e.target.value)} />
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
