import React from 'react';
import styled from 'styled-components';
import StyledButton from './StyledButton';
import { MdRefresh } from 'react-icons/md';

const Button = styled(StyledButton)`
  position: fixed;
  left: 3rem;
  bottom: 0.5rem;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    width: 28px;
    height: 28px;
  }
`;
export default function RefreshButton({ visible = false, handleUpdate }) {
  return (
    <Button className={visible ? 'visible' : 'hidden'} onClick={handleUpdate}>
      <MdRefresh />
    </Button>
  );
}
