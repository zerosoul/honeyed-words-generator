import styled from 'styled-components';
import { AniZoomIn } from './animates';

const StyledButton = styled.button`
  z-index: 998;
  background-size: 1rem 1rem;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(2, 2, 2, 0.6);
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 8px black;
  padding: 1rem;
  transition: background-image 0.5s;
  &.visible {
    animation: ${AniZoomIn} 0.5s ease-in-out;
  }
`;

export default StyledButton;
