import styled from 'styled-components';
const StyledNavBar = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.6em;

  .navlink {
    text-decoration: none;
  }

  .active-link {
    background-color: rgba(174, 174, 174, 0.5);
    border-radius: 3px;
  }
`;

export default StyledNavBar;
