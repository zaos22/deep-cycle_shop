import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

function Checkout({ show, onHide, selectedProducts }) {
    const [quantities, setQuantities] = useState({});
    const [checkoutError, setCheckoutError] = useState(null);

    const getTotalPrice = () => {
        return selectedProducts.reduce((total, product) => total + product.price * quantities[product.id], 0);
    };

    const handleQuantityChange = (productId, event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantities({ ...quantities, [productId]: newQuantity });
    };

    const handleCheckout = async () => {
        try {
            let totalPrice = getTotalPrice();
            const response = await axios.post('/checkout', {
                selectedProducts,
                quantities,
                totalPrice
            });
            const billId = response.data.billId;
            let User_bill = await getBill(billId);
            Swal.fire({
                title: "Do you want your invoice?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `No`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire("Paid!", "", "success");
                    generatePDF(User_bill)
                } else if (result.isDenied) {
                    Swal.fire("Paid!", "", "success");
                }
            });
            onHide();
        } catch (error) {
            console.error('Error en la solicitud de checkout:', error);
            setCheckoutError('Error en el proceso de checkout');
        }
    };

    const getBill = async (billId) => {
        try {
            const response = await axios.get(`/bill-data/${billId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener la factura:', error);
        }
    };

    const getBillLines = async (billId) => {
        try {
            const response = await axios.get(`/bill_line/${billId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener líneas de factura:', error);
            return []; // Return an empty array in case of an error
        }
    };

    const generatePDF = async (bill) => {
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('Bill', 105, 15);
        doc.text(' ', 105, 15);

        const columns = ["Bill Name", "Client", "Date"];
        const rows = [];

        rows.push([
            bill.name,
            bill.client,
            bill.date == null ? 'Pending' : bill.date.substring(0, 10)
        ]);

        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 25,
            theme: "striped",
            styles: { halign: "center" },
        });

        // Obtener líneas de factura
        const billLines = await getBillLines(bill.id);

        const columns1 = ["Unity", "Description", "Price"];
        const rows1 = [];

        billLines.forEach((line) => {
            rows1.push([
                line.unity,
                line.product_name,
                line.price, // Use line.total instead of bill.total
            ]);
        });

        doc.autoTable({
            head: [columns1],
            body: rows1,
            startY: 50,
            theme: "striped",
            styles: { halign: "center" },
        });

        const subtotal = bill.total;
        const tax = 0.25 * subtotal;
        const grandTotal = subtotal + tax;

        doc.setFontSize(14);
        doc.text(`Subtotal: €${subtotal.toFixed(2)}`, 150, doc.autoTable.previous.finalY + 20);
        doc.text(`Tax (25%): €${tax.toFixed(2)}`, 150, doc.autoTable.previous.finalY + 30);
        doc.setFont('helvetica', 'bold');
        doc.text(`Grand Total: €${grandTotal.toFixed(2)}`, 150, doc.autoTable.previous.finalY + 40);

        const pdfDataUri = doc.output('datauristring');
        const newTab = window.open();
        newTab.document.write('<embed width="100%" height="100%" src="' + pdfDataUri + '" type="application/pdf">');
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Checkout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedProducts.map((product) => (
                    <div key={product.id}>
                        <p><strong>{product.name}</strong></p>
                        <p><strong>Price:</strong> {product.price} € each</p>
                        <Form.Group controlId={`quantity-${product.id}`}>
                            <Form.Label><strong>Quantity:</strong></Form.Label>
                            <Form.Control
                                type="number"
                                value={quantities[product.id] || 1}
                                onChange={(event) => handleQuantityChange(product.id, event)}
                                min="1"
                            />
                        </Form.Group>
                        <hr />
                    </div>
                ))}
                <p><strong>Total Price:</strong> {getTotalPrice()} €</p>
                {checkoutError && <p style={{ color: 'red' }}>{checkoutError}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCheckout}>
                    Proceed to Checkout
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Checkout;
