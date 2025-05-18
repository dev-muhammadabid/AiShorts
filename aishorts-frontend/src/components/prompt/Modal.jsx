// Imports
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ children, onClose }) => {
  // Disable page scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling when modal unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    // Backdrop covers the entire screen, clicking outside modal content closes the modal
    <div
      className="modal-backdrop"
      onClick={(e) => {
        // Only close if click is directly on backdrop, not inside modal-content
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-content">
        {/* Close button to explicitly close the modal */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {/* Render any children passed into the modal */}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
