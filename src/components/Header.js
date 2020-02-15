import React from 'react';
import styled from 'styled-components';
import StyledWordBox from './StyledWordBox';
import { AniPopIn, AniBounceInUp, AniFadeDown } from './animates';

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
    font-size: 4rem;
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
  animation: ${AniPopIn} 1s ease forwards;
  animation-fill-mode: both;

  .pinyin {
    color: #f1ad93;
    text-transform: capitial;
    font-size: 1.5rem;
    position: absolute;
    left: 50%;
    top: -2rem;
    transform: translateX(-50%);
    .w {
      animation: ${AniFadeDown} 1s;
      animation-fill-mode: both;
    }
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
  padding: 0.5rem 0.6rem 0.5rem 1.4rem;
  margin-right: 0.6rem;
  background-image: url(${ImageHeart}), url(${ImageHeart});
  margin-top: 1.5rem;
  font-size: 2rem;
  animation: ${AniBounceInUp} 1s;
  animation-delay: 2.8s;
  animation-fill-mode: both;
`;
const titleWords = [
  { word: '甜', pinyin: 'tǔ' },
  { word: '言', pinyin: 'wèi' },
  { word: '蜜', pinyin: 'qíng' },
  { word: '语', pinyin: 'huà' }
];
export default function Header({ handleStart }) {
  return (
    <Wrapper>
      <div className="title">
        {titleWords.map((obj, idx) => {
          return (
            <WordBox style={{ animationDelay: `${0.3 * idx}s` }} key={obj.word}>
              {obj.word}
              <em className="pinyin">
                <i className="w" style={{ animationDelay: `${1.2 + 0.3 * idx}s` }}>
                  {obj.pinyin}
                </i>
              </em>
            </WordBox>
          );
        })}
      </div>
      <StyledButton onClick={handleStart}>开始生成</StyledButton>
    </Wrapper>
  );
}
