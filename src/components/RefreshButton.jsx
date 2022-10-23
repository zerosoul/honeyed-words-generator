import React from 'react';
import styled from 'styled-components';
import ImageRefresh from '../assets/img/refresh.svg';
import StyledButton from './StyledButton';

const Button = styled(StyledButton)`
  position: fixed;
  left: 3rem;
  bottom: 0.5rem;
  background-image: url(${ImageRefresh});
`;
export default function RefreshButton({ visible = false, handleUpdate }) {
  return <Button className={visible ? 'visible' : 'hidden'} onClick={handleUpdate}></Button>;
}
