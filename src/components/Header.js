import React from 'react';
import styled from 'styled-components';
import StyledWordBox from './StyledWordBox';

import ImageHeart from '../assets/img/heart.svg';
const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    display: flex;
    font-size: 3rem;
    font-weight: 800;
    text-shadow: 0 0 4px black;
  }
`;
const WordBox = styled(StyledWordBox)`
  position: relative;
  margin: 0 0.4rem;
  padding: 0.3rem;
  border: 1px solid pink;
  color: #f4b0f3;
  .pinyin {
    color: #f1ad93;
    text-transform: capitial;
    font-size: 1rem;
    position: absolute;
    left: 50%;
    top: -1.5rem;
    transform: translateX(-50%);
  }
`;
const StyledButton = styled.button`
  background-size: 0.8rem;
  background-position: 0.4rem center, right center;
  background-repeat: no-repeat;
  background-color: #60322b;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 8px black;
  padding: 0.5rem 0.5rem 0.5rem 1.4rem;
  margin-right: 0.6rem;
  background-image: url(${ImageHeart}), url(${ImageHeart});
  margin-top: 1rem;
  font-size: 1.4rem;
`;
export default function Header({ handleStart }) {
  return (
    <Wrapper>
      <div className="title">
        <WordBox>
          甜<i className="pinyin">tǔ</i>
        </WordBox>
        <WordBox>
          言<i className="pinyin">wèi</i>
        </WordBox>
        <WordBox>
          蜜<i className="pinyin">qíng</i>
        </WordBox>
        <WordBox>
          语<i className="pinyin">huà</i>
        </WordBox>
      </div>
      <StyledButton onClick={handleStart}>开始生成</StyledButton>
    </Wrapper>
  );
}
