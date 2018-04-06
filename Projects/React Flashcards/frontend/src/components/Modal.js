import React from 'react';

const Modal = ({ children, handleCloseModal, showModal, title }) => (
    <div className={`modal-container ${showModal && `show-modal`}`}>
        <div className="modal">
            <button className="close icon" onClick={handleCloseModal}><i className="fa fa-close"></i></button>

            <h2>{ title }</h2>
            <div className="modal-content">
                { children }
            </div>
        </div>
    </div>
);

export { Modal };