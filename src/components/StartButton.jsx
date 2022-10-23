import React from 'react';
import styled from 'styled-components';
import { AniBubble, AniBounceInUp } from './animates';
import ImageHeart from '../assets/img/heart.svg';

const StyledWrapper = styled.button`
  background-color: #60322b;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 8px black;
  padding: 0.5rem 1rem;
  margin-top: 1.5rem;
  font-size: 2rem;
  animation: ${AniBounceInUp} 1s;
  animation-delay: 2.8s;
  animation-fill-mode: both;
  position: relative;
  font-weight: 800;
  .heart {
    animation-fill-mode: both;
    position: absolute;
    width: 0.8rem;
    animation: ${AniBubble} 3s ease infinite;
    top: 0.2rem;
    right: 0.2rem;
  }
`;

export default function StartButton({ children, ...rest }) {
  return (
    <StyledWrapper {...rest}>
      {children}
      {[1, 2, 3, 4, 5, 6].map((item, idx) => {
        return (
          <img
            style={{ animationDelay: `${idx * 0.3}s` }}
            key={`${item}-${idx}`}
            src={ImageHeart}
            alt="heart"
            className="heart"
          />
        );
      })}
    </StyledWrapper>
  );
}
