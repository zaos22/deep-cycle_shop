import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ModalComponent from "../ModalComponent";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Create({ updateUserList }) {
    const [showModal, setShowModal] = useState(false);
    const [montage, setMontage] = useState(0);

    const storeProduct = 'http://localhost/new-product'

    const handleShowModal = () => {
        setShowModal(true);
        newMontage();
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        getMaterials()
    }, [])

    const getMaterials = async () => {
        try {
            const res = await axios.get('http://localhost/all-materials');
            setMaterials(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const newMontage = async () => {
        try {
            const res = await axios.post('http://localhost/new-montage');
            setMontage(res.data['id']);
        } catch (error) {
            console.error(error);
        }
    }

    const delMontage = async () => {
        try {
            await axios.delete('http://localhost/del-montage' + '/' + montage);
        } catch (error) {
            console.error(error); // Manejar errores si ocurren
        }
    }

    const [materials, setMaterials] = useState([]);
    const [brand, setBrand] = useState('')
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [num_serie, setNum] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)

    const storeProducts = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('brand', brand);
            formData.append('name', name);
            formData.append('description', desc);
            formData.append('num_serie', num_serie);
            formData.append('price', price);
            formData.append('montage_id', montage);
            formData.append('image', image);

            await axios.post(storeProduct, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // El pedido se realizó con éxito

            handleCloseModal();
            updateUserList();
            Swal.fire("Created!", "", "success");
            setName("");
            setBrand("");
            setDesc("");
            setNum("");
            setPrice(0);
            setImage(''); // Limpiar el estado de la imagen después de enviarla
        } catch (error) {
            // Manejar errores aquí
            console.error(error);
            delMontage();
            Swal.fire("Error", "Failed to create the product", "error");
        }
    };

    const handleMaterialChange = (e, materialId) => {
        const checked = e.target.checked;
        if (checked) {
            // Realizar inserción en la tabla de montages aquí
            // Puedes utilizar axios.post para enviar una solicitud al servidor
            // Asegúrate de enviar el materialId y otros datos necesarios
            axios.post('add-materials', {
                material_id: materialId,
                montage_id: montage,
            });

        } else {
            // Si se desmarca, puedes manejar la lógica para deshacer la inserción si es necesario
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShowModal}>
                <i className="fa-solid fa-plus"></i>
            </Button>

            <ModalComponent
                title="New Product"
                show={showModal}
                onHide={handleCloseModal}
            >
                <form onSubmit={storeProducts} encType="multipart/form-data">
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
                        <div className="mb-3">
                            <label className="form-label">Materials</label>
                            {materials.map((material) => (
                                <div key={material.id} className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`material-${material.id}`}
                                        onChange={(e) => handleMaterialChange(e, material.id)}
                                    />
                                    <label className="form-check-label" htmlFor={`material-${material.id}`}>
                                        {material.type}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
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

export default Create;
