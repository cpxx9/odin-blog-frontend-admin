import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 50px;
  z-index: 1000;

  button {
    position: absolute;
    top: 5%;
    right: 3%;
  }
`;

export default StyledModal;
