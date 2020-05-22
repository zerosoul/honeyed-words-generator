import React from 'react';
import styled from 'styled-components';
import StyledWordBox from './StyledWordBox';
import StartButton from './StartButton';
import { AniPopIn, AniFadeDown, AniFloat } from './animates';

import ImageLogo from '../assets/img/logo.png';
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
  .logo {
    width: 6rem;
    margin-bottom: 3rem;
    animation-fill-mode: both;

    animation: ${AniFloat} 2s ease-in infinite alternate;
  }
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
    font-size: 1.5rem;
    position: absolute;
    left: 50%;
    top: -2rem;
    transform: translateX(-50%);
    .w {
      font-family: monospace;
      text-transform: capitalize;
      animation: ${AniFadeDown} 1s;
      animation-fill-mode: both;
    }
  }
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
      <img className="logo" src={ImageLogo} alt="logo" />
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
      <StartButton onClick={handleStart}>开始</StartButton>
    </Wrapper>
  );
}
