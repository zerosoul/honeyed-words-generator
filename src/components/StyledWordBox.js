import styled from 'styled-components';

const StyledWordBox = styled.span`
  border: 1px solid rgba(222, 222, 222, 0.2);
  margin-left: -1px;
  position: relative;
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    background: rgba(222, 222, 222, 0.1);
  }
  &:after {
    left: 0;
    top: 50%;
    transform: translateY(-1px);
    width: 100%;
    height: 1px;
  }
  &:before {
    left: 50%;
    top: 0;
    transform: translateX(-1px);
    width: 1px;
    height: 100%;
  }
`;

export default StyledWordBox;
