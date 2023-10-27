import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Bill_Lines from './Bill_Lines';
import { createRoot } from "react-dom/client";
import jsPDF from "jspdf";
import 'jspdf-autotable';

export default function Bills() {
    const [bills, setBills] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getBills();
    }, []);

    const getBills = async (searchTerm) => {
        try {
            const response = await axios.get(`/bills-data?search=${searchTerm || ''}`);
            setBills(response.data);
        } catch (error) {
            console.error('Error al obtener facturas:', error);
        }
    };

    const getBillLines = async (billId) => {
        try {
            const response = await axios.get(`/bill_lines/${billId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener líneas de factura:', error);
            return [];
        }
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);
        getBills(searchTerm === '' ? null : searchTerm);
    };

    const generatePDF = async (bill) => {
        const doc = new jsPDF();

        doc.setFontSize(12);

        // Título "Bill"
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('Bill', 105, 15);
        doc.text(' ', 105, 15);

        // Información de la factura
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        // Linia con nombre de factura y fecha
        doc.text(`Bill Name: ${bill.name}`, 10, 30);
        doc.text(`Date: ${bill.date == null ? 'Pending' : bill.date.substring(0, 10)}`, 160, 30);
        // Linia con cliente y proveedor
        doc.text(`Client: ${bill.client}`, 10, 50);
        doc.text(`Supplier: ${bill.supplier}`, 160, 50);

        // Obtener líneas de factura
        const billLines = await getBillLines(bill.id);

        const columns = ["Unity", "Description", "Price"];
        const rows = [];

        billLines.forEach((line) => {
            rows.push([
                line.unity,
                `${line.product_name == null ? line.material_name : line.product_name}`,
                line.unity !== 1 ? bill.total / 5 : bill.total,
            ]);
        });

        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 70,
            theme: "striped",
            styles: { halign: "center" },
        });

        // Calcular y agregar totales
        const subtotal = bill.total;
        const tax = 0.25 * subtotal; // 25% de impuestos
        const grandTotal = subtotal + tax;

        // Totales
        doc.setFontSize(14);
        doc.text(`Subtotal: €${subtotal.toFixed(2)}`, 10, doc.autoTable.previous.finalY + 20);
        doc.text(`Tax (25%): €${tax.toFixed(2)}`, 10, doc.autoTable.previous.finalY + 30);
        doc.setFont('helvetica', 'bold');
        doc.text(`Grand Total: €${grandTotal.toFixed(2)}`, 10, doc.autoTable.previous.finalY + 40);

        // Genera una URL de datos del PDF
        const pdfDataUri = doc.output('datauristring');

        // Abre una nueva pestaña con la URL de datos del PDF
        const newTab = window.open();
        newTab.document.write('<embed width="100%" height="100%" src="' + pdfDataUri + '" type="application/pdf">');
    };


    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="mb-3 d-flex justify-content-start">
                    <input
                        id="search"
                        className="transparent-input"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <table className="table-auto table-hover w-full shadow-lg rounded-lg">
                <thead>
                    <tr className="colorbg shadow-lg rounded-lg text-black">
                        <th className="px-6 py-3 uppercase">Bill Name</th>
                        <th className="px-6 py-3 uppercase">Client</th>
                        <th className="px-6 py-3 uppercase">Supplier</th>
                        <th className="px-6 py-3 uppercase">Date</th>
                        <th className="px-6 py-3 uppercase">Bill Lines</th>
                        <th className="px-6 py-3 uppercase">Total</th>
                        <th className="px-6 py-3 uppercase">Bill</th>
                    </tr>
                </thead>
                <tbody className="custom-tbody text-center">
                    {bills.map((bill) => (
                        <tr key={bill.id} className="headerbg1">
                            <td>{bill.name}</td>
                            <td>{bill.client}</td>
                            <td>{bill.supplier}</td>
                            <td>{bill.date == null ? 'Pending' : bill.date.substring(0, 10)}</td>
                            <td><Bill_Lines billID={bill.id}></Bill_Lines></td>
                            <td>{bill.total}</td>
                            <td>
                                <Button variant="primary" onClick={() => generatePDF(bill)}><i className="fa-solid fa-download"></i></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

if (document.getElementById('bills')) {
    createRoot(document.getElementById('bills')).render(<Bills />);
}
