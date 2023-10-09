import React from 'react';
import Swal from 'sweetalert2';

function Delete({ userId, updateUserList }) {
    const delSupplier = 'http://localhost/delete-supplier'
    const delSuppliers = async () => {
        Swal.fire({
            title: 'Are you sure you want to delete the supplier?',
            showDenyButton: true,
            confirmButtonText: 'Confirm',
            denyButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', '', 'success');
                const res = await axios.delete(delSupplier + '/' + userId);
                updateUserList()
            } else if (result.isDenied) {
                Swal.fire('The user is safe', '', 'info');
            }
        });
    };

    return (
        <button onClick={delSuppliers} type="button" className="btn btn-danger">
            <i className="fa-solid fa-trash"></i>
        </button>
    );
}

export default Delete;
