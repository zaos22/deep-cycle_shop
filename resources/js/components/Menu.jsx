import react from "react";
import { createRoot } from "react-dom/client";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Menu() {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="storage/logo.png" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Primary</Button>{' '}
            </Card.Body>
        </Card>
    );
}

if (document.getElementById('menu')) {
    createRoot(document.getElementById('menu')).render(<Menu />);
}
