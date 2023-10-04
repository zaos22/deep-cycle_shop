import react from "react";
import { createRoot } from "react-dom/client";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';



export default function Menu() {

    const modules = [
        {
            id: 1,
            title: 'Users',
            url: '/users',
            description: '',
            imageUrl: '/storage/users.png',
        },
        {
            id: 2,
            title: 'Suppliers',
            url: '/suppliers',
            description: '',
            imageUrl: '/storage/suppliers.png',
        },
        {
            id: 3,
            title: 'Products',
            url: '/products',
            description: '',
            imageUrl: '/storage/products.png',
        },
        {
            id: 4,
            title: 'Bills',
            url: '/bills',
            description: '',
            imageUrl: '/storage/bills.png',
        },
    ];

    return (
        <Row xs={1} md={2} lg={2} className="g-4">
            {modules.map((module) => (
                <Col key={module.id}>
                    <Card>
                        <div className="colorbg1">
                            <div className="marco">
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Card.Img variant="top" src={module.imageUrl} style={{ width: '50%' }} />
                                </div>
                                <Card.Body>
                                    <Card.Title className=""></Card.Title>
                                    <Card.Text>{module.description}</Card.Text>
                                    <div className="d-flex justify-content-center">
                                        <Button variant="primary" href={module.url} className="btn-custom text-center text-uppercase fw-bold">{module.title}</Button>
                                    </div>
                                </Card.Body>
                            </div>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

if (document.getElementById('menu')) {
    createRoot(document.getElementById('menu')).render(<Menu />);
}
