import React from 'react';
import './DeleteModal.css';

const DeleteModal = ({ handleDeleteConfirm, handleDeleteCancel }) => {
    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-body">
                    <h1 className='modal-heading'>Confirm Deletion</h1>
                    <p className="modal-text">
                        Are you sure you want to delete invoice? This action can not be undone.
                    </p>
                    <div className="btnBx">
                        <button className="btn" onClick={handleDeleteCancel}>Cancel</button>
                        <button className="btn" onClick={handleDeleteConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;