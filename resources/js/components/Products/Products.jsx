import react from "react";
import Create from "./Create";
import Delete from "./Delete";
import Update from "./Update";
import More from "./More";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import Duplicate from "./Duplicate";


export default function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const updateUserList = () => {
        getProducts();
    };

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async (searchTerm) => {
        try {
            const res = await axios.get(`/products-data?search=${searchTerm || ''}`)
            setProducts(res.data)
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    }

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);

        // Llama a la función para obtener proveedores
        // Si el campo de búsqueda está vacío, no se especifica un término de búsqueda
        getProducts(searchTerm === '' ? null : searchTerm);
    };

    function getFileNameFromUrl(url) {
        // Dividir la URL por '/'
        const urlParts = url.split('/');
        // El nombre del archivo es el último fragmento de la URL
        const fileName = urlParts[urlParts.length - 1];
        return fileName;
    }

    return (
        <div>
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
                    <div className="mb-3 d-flex justify-content-end">
                        <Create updateUserList={updateUserList}></Create>
                    </div>
                </div>
            </div>
            <table className="table-auto table-hover w-full shadow-lg rounded-lg">
                <thead>
                    <tr className="colorbg shadow-lg rounded-lg text-black">
                        <th className="px-6 py-3 uppercase">
                            Image
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Name
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Brand
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Description
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Price
                        </th>
                        <th className="px-6 py-3 uppercase">
                            Num_Serie
                        </th>
                        <th className="px-6 py-3 uppercase"></th>
                    </tr>
                </thead>
                <tbody className="custom-tbody text-center">
                    {products.map((product) => (
                        <tr key={product.id} className="headerbg1">
                            <td className="text-center">
                                {product.image_url && (
                                    <img
                                        src={`http://localhost${product.image_url}`}
                                        alt={`Image of ${product.name}`}
                                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                                        onError={(e) => {
                                            // Manejar errores de carga de imagen aquí
                                            console.error("Error cargando la imagen:", e);
                                        }}
                                    />
                                )}
                            </td>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.num_serie}</td>
                            <td>
                                <div className="d-flex justify-content-between">
                                    <div className="pe-2">
                                        <More idProduct={product.id} update={updateUserList}></More>
                                    </div>
                                    <div className="pe-2">
                                        <Duplicate updateUserList={updateUserList} idProduct={product.id} ></Duplicate>
                                    </div>
                                    <div className="pe-2">
                                        <Update updateUserList={updateUserList} data={product}></Update>
                                    </div>
                                    <div className="pe-2">
                                        <Delete montageID={product.montage_id} productID={product.id} updateUserList={updateUserList} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

if (document.getElementById('products')) {
    createRoot(document.getElementById('products')).render(<Products />);
}
