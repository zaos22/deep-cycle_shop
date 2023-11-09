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

    const updateProducts = 'http://localhost/edit-product';

    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [num_serie, setNum] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    const updateProduct = async (e) => {
        e.preventDefault();

        // Calculate the discounted price before sending the update request
        const discountedPrice = price - (price * discount / 100);

        await axios.put(updateProducts + '/' + data.id, {
            brand: brand,
            name: name,
            description: desc,
            num_serie: num_serie,
            price: discountedPrice, // Use the discounted price in the request
        });

        updateUserList();
        handleCloseModal();
        Swal.fire('Edited!', '', 'success');
    };

    const openEdit = () => {
        handleShowModal();
        setBrand(data.brand);
        setName(data.name);
        setDesc(data.description);
        setPrice(data.price);
        setNum(data.num_serie);
    };

    return (
        <>
            <Button variant="success" onClick={openEdit}>
                <i className="fa-solid fa-pen-to-square"></i>
            </Button>

            <ModalComponent
                title="Update Product"
                show={showModal}
                onHide={handleCloseModal}
            >
                <form onSubmit={updateProduct}>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3">
                            <label htmlFor="brand" className="form-label">Brand</label>
                            <input type="text" autoComplete="off" className="form-control" id="brand" aria-describedby="brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" autoComplete="off" className="form-control" id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Description</label>
                            <input type="text" autoComplete="off" className="form-control" id="desc"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="num_serie" className="form-label">Num Serie</label>
                            <input type="text" autoComplete="off" className="form-control" id="num_serie"
                                value={num_serie}
                                onChange={(e) => setNum(e.target.value)} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" autoComplete="off" className="form-control" required id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3">
                            <label htmlFor="discount" className="form-label">Discount</label>
                            <input type="number" autoComplete="off" className="form-control" required id="discount"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)} />
                        </div>
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
