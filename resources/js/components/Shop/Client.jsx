import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FaShoppingCart } from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Checkout from "./Check";

// New ShoppingCartIcon component
function ShoppingCartIcon({ selectedProducts, onCheckout }) {
    return (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip id="tooltip-top">
                    {selectedProducts.map((product) => (
                        <div key={product.id}>
                            <img src={`http://localhost${product.image_url}`} alt={`Image of ${product.name}`} width="30" height="30" />
                            <p>{product.price}</p>
                        </div>
                    ))}
                    <div>Cart</div>
                </Tooltip>
            }
        >
            <div style={{ position: 'fixed', bottom: '10px', right: '10px', cursor: 'pointer' }}>
                <FaShoppingCart onClick={onCheckout} size={30} />
            </div>
        </OverlayTrigger>
    );
}

export default function Clients() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async (searchTerm) => {
        try {
            const res = await axios.get(`/products-data?search=${searchTerm || ''}`)
            setProducts(res.data)
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }

    const addToCart = (product) => {
        setSelectedProducts([...selectedProducts, product]);
    }

    const isButtonVisible = (product) => {
        // Check if the stock is greater than 0
        return product.stock > 0;
    }

    const handleCheckout = () => {
        // Implement your logic to redirect to the checkout page or perform other checkout actions
        // window.location.href = '/checkout';
        setShowCheckout(true);
    }

    return (
        <Row>
            {products.map((product) => (
                <Col key={product.id}>
                    <OverlayTrigger
                        placement="auto"
                        overlay={
                            <Tooltip id={`tooltip-${product.id}`}>
                                <div>
                                    <p><strong>Brand:</strong> {product.brand}</p>
                                    <p><strong>Description:</strong> {product.description}</p>
                                    <p><strong>Price:</strong> {product.price} €</p>
                                    <p><strong>Stock:</strong> {product.stock} €</p>
                                </div>
                            </Tooltip>
                        }
                    >
                        <Card>
                            <div className="colorbg1">
                                <div className="marco">
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Card.Img variant="top" src={`http://localhost${product.image_url}`}
                                            alt={`Image of ${product.name}`} style={{ width: '50%' }} />
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{ textAlign: "center", paddingBottom: '5px' }}>{product.name}</Card.Title>
                                        <Card.Text style={{ textAlign: "center" }}>
                                            <div className="d-flex justify-content-center">
                                                {isButtonVisible(product) && (
                                                    <Button variant="primary" onClick={() => addToCart(product)} className="btn-custom text-center text-uppercase fw-bold">Add to Cart</Button>
                                                )}                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </div>
                            </div>
                        </Card>
                    </OverlayTrigger>
                </Col>
            ))}
            <div className="flex justify-content-end">
                <div className="p-5 m-5">
                    <ShoppingCartIcon selectedProducts={selectedProducts} onCheckout={handleCheckout} />
                </div>
            </div>
            <Checkout show={showCheckout} onHide={() => setShowCheckout(false)} selectedProducts={selectedProducts} />
        </Row>
    );
}

if (document.getElementById('clients')) {
    createRoot(document.getElementById('clients')).render(<Clients />);
}
