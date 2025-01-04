import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import StyledModal from './StyledModal';

const Modal = ({ children, open = false, onClose = () => {}, title = 'Modal' }) => {
  if (!open) return null;

  return createPortal(
    <>
      <div className="overlay" />
      <StyledModal>
        <button className="close-modal" onClick={onClose}>
          X
        </button>
        <h3>{title}</h3>
        {children}
      </StyledModal>
    </>,
    document.getElementById('portal'),
  );
};

Modal.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
