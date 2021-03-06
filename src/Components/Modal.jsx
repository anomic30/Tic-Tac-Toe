import React from 'react';
import '../Styles/Modal.css';

const Modal = ({winner, showModal}) => {
    return (
        <div className="container">
            <h1>Winner</h1>
            <h1>{winner}</h1>
            <button onClick={()=>showModal()}>Play again!</button>
        </div>
    )
}

export default Modal
