import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { shuffle } from '../utils';
import CodeQR from 'qrcode.react';

import { getQueryValue } from '../utils';
import ImageLogo from '../assets/img/logo.png';
import ImageLover from '../assets/img/lover.bg.png';

import { AniPopIn, AniFadeIn, AniSlideInDown } from './animates';
import StyledWordBox from './StyledWordBox';
import ImageHeart from '../assets/img/heart.svg';
import ImageNoise from '../assets/img/noise.bg.png';
import Words from '../assets/words';

const StyledWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;

  &.visible .card {
    animation: ${AniSlideInDown} 1s;
  }
  .card {
    position: relative;
    padding: 1.8rem 2rem;
    background-color: rgba(108, 53, 44, 0.8);
    margin-top: -2rem;
    max-width: 94vw;
    box-shadow: 0 0 1rem #6c352c;
    animation-fill-mode: both;
    .qr {
      visibility: hidden;
      position: absolute;
      bottom: 0;
      right: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .tip {
        font-size: 0.5rem;
        color: #222;
        padding: 0.2rem 0;
      }
    }
    .lover {
      visibility: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 4rem;
      opacity: 0.6;
    }
    .heart {
      position: absolute;
      animation-fill-mode: both;
      animation: ${AniFadeIn} 3s ease infinite alternate;
      opacity: 0;
      &.heart1 {
        transform: rotate(20deg);
        bottom: 1rem;
        right: 1rem;
        width: 3rem;
      }
      &.heart2 {
        transform: rotate(-20deg);
        bottom: 1rem;
        left: -1rem;
        width: 1rem;
      }
      &.heart3 {
        transform: rotate(-30deg);
        top: 1rem;
        left: 1rem;
        width: 2rem;
      }
      &.heart4 {
        transform: rotate(40deg);
        top: 2rem;
        right: 1.2rem;
        width: 1.5rem;
      }
      &.heart5 {
        transform: rotate(-10deg);
        bottom: 2rem;
        left: 1.2rem;
        width: 1.8rem;
      }
    }
    &.starting {
      background-image: url(${ImageNoise});
      background-repeat: repeat;
      box-shadow: none;
      animation: none;
      transform: none;
      .qr,
      .lover {
        visibility: visible;
      }
      .line .word {
        color: #222;
        text-shadow: none;
      }
      .heart {
        display: block;
      }
      * {
        animation: none;
      }
    }
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 0.8rem;
      border-radius: 50%;
      left: 0;
      bottom: -1rem;
      box-shadow: 0 30px 20px rgba(0, 0, 0, 0.2);
    }
    .line {
      margin-bottom: 1.4rem;
      display: flex;
      flex-wrap: wrap;
      font-size: 2rem;
    }
  }
`;
const WordBox = styled(StyledWordBox)`
  text-shadow: 0 0 3px black;
  color: #f4b0f3;
  padding: 0.4rem;
  font-weight: 800;
  animation: ${AniPopIn} 1s ease forwards;
  animation-fill-mode: both;
`;
const wordsIdx = getQueryValue('idx');
let currWords = '';
if (wordsIdx) {
  currWords = Words[wordsIdx];
  console.log({ currWords });
}
const RandomWords = [...Words];
shuffle(RandomWords);
let wordCount = 0;

let wordSeq = currWords === '' ? 1 : RandomWords.findIndex(w => w === currWords) + 1;
console.log({ Words });

export default function Card({ visible = false }) {
  const [words, setWords] = useState('');

  useEffect(() => {
    if (visible) {
      let newWords = RandomWords[(wordSeq - 1) % RandomWords.length];
      setWords(newWords);
      wordCount = 0;
      // 全局变量
      window.CUR_WORDS_IDX = Words.findIndex(w => w === newWords);
      console.log('from card CUR_WORDS_IDX', window.CUR_WORDS_IDX);

      return () => {
        wordSeq++;
      };
    }
  }, [visible]);

  return (
    <StyledWrapper className={visible ? 'visible' : 'hidden'}>
      <div id="HONEYED_WORDS_CARD" className={`card`}>
        {words.split('|').map((line, lineIdx) => {
          let ws = line.split('');
          console.log({ ws });

          if (lineIdx !== 0) {
            wordCount = wordCount + words.split('|')[lineIdx - 1].length;
          }
          return (
            <p className="line" key={line}>
              {ws.map((w, idx) => {
                return w !== '' ? (
                  <WordBox
                    style={{ animationDelay: `${0.2 * (wordCount + idx)}s` }}
                    className="word"
                    key={`${w}-${idx}`}
                  >
                    {w}
                  </WordBox>
                ) : null;
              })}
            </p>
          );
        })}
        {[1, 2, 3, 4, 5].map((num, idx) => (
          <img
            style={{ animationDelay: `${idx * 0.3}s` }}
            key={num}
            className={`heart heart${num}`}
            src={ImageHeart}
            alt="heart"
          />
        ))}
        <div className="qr">
          <CodeQR
            renderAs="svg"
            imageSettings={{ width: 10, height: 10, src: ImageLogo, excavate: true }}
            size={50}
            bgColor="#f2f2f2"
            level="Q"
            fgColor="#000"
            includeMargin={false}
            value={`${window.location.href.split('?')[0]}?idx=${window.CUR_WORDS_IDX}`}
          />
          <div className="tip">土味情话</div>
        </div>
        <img src={ImageLover} alt="lover" className="lover" />
      </div>
    </StyledWrapper>
  );
}
