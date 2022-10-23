import styled from 'styled-components';

const StyledWordBox = styled.span`
  border: 2px solid #f1ad93;
  margin-left: -2px;
  margin-top: -2px;
  position: relative;
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
  }
  &:after {
    background-image: linear-gradient(
      90deg,
      #f1ad93,
      #f1ad93 75%,
      transparent 75%,
      transparent 100%
    );
    left: 0;
    top: 50%;
    transform: translateY(-1px);
    width: 100%;
    height: 1px;
    background-size: 4px 1px;
  }
  &:before {
    background-image: linear-gradient(
      180deg,
      #f1ad93,
      #f1ad93 75%,
      transparent 75%,
      transparent 100%
    );
    left: 50%;
    top: 0;
    transform: translateX(-1px);
    width: 1px;
    height: 100%;
    background-size: 1px 4px;
  }
`;

export default StyledWordBox;
