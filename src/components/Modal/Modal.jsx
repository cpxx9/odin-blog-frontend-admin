import { createPortal } from 'react-dom';
import StyledModal from './StyledModal';

const Modal = ({ children, open = false, onClose, title }) => {
  if (!open) return null;

  return createPortal(
    <>
      <div className="overlay" />
      <StyledModal>
        <button onClick={onClose}>X</button>
        <h3>{title}</h3>
        {children}
      </StyledModal>
    </>,
    document.getElementById('portal'),
  );
};

export default Modal;
