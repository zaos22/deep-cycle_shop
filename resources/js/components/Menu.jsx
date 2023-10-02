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
            description: '',
            imageUrl: '/storage/logo.png',
        },
        {
            id: 2,
            title: 'Suppliers',
            description: '',
            imageUrl: '/storage/logo.png',
        },
        {
            id: 3,
            title: 'Products',
            description: '',
            imageUrl: '/storage/logo.png',
        },
        {
            id: 4,
            title: 'Bills',
            description: '',
            imageUrl: '/storage/logo.png',
        },
    ];

    return (
        <Row xs={1} md={2} lg={2} className="g-4">
            {modules.map((module) => (
                <Col key={module.id}>
                    <Card>
                        <div className="colorbg1">
                            <div className="marco">
                                <Card.Img variant="top" src={module.imageUrl} />
                                <Card.Body>
                                    <Card.Title className="text-center">{module.title}</Card.Title>
                                    <Card.Text>{module.description}</Card.Text>
                                    <div className="d-flex justify-content-center">
                                        <Button variant="primary" className="btn-custom">Ver Detalles</Button>
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
