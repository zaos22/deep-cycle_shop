import React from 'react';
import Swal from 'sweetalert2';

function Delete({ montageID, productID, updateUserList }) {
    const delProduct = 'http://localhost/delete-product'
    const delProducts = async () => {
        Swal.fire({
            title: 'Are you sure you want to delete this product?',
            showDenyButton: true,
            confirmButtonText: 'Confirm',
            denyButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', '', 'success');
                await axios.delete(delProduct + '/' + productID + '/' + montageID);
                updateUserList()
            } else if (result.isDenied) {
                Swal.fire('The product is safe', '', 'info');
            }
        });
    };

    return (
        <button onClick={delProducts} type="button" className="btn btn-danger">
            <i className="fa-solid fa-trash"></i>
        </button>
    );
}

export default Delete;
