import React, { useEffect } from 'react';
import styled from 'styled-components';
import Words from '../assets/words';
import StyledWordBox from './StyledWordBox';
import { AniBlink } from './animates';
const StyledWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(2, 2, 2, 0.8);
  .words {
    background-color: rgba(108, 53, 44, 0.4);
    padding: 1rem;
    width: 80vw;
    min-height: 50vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    clip-path: polygon(0 0, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);
  }
`;
const WordBox = styled(StyledWordBox)`
  height: 100%;
  padding: 0.3rem;
  animation: ${AniBlink} 0.4s ease-in-out infinite;
`;
const reg = /[\u4e00-\u9fa5]/g;
// 去重
const words = [
  ...new Set(
    Words.join('')
      .match(reg)
      .join('')
      .split('')
  )
]
  .join('')
  .substring(0, 100);
export default function LoadingWords({ handleDone }) {
  const handleUpdateWord = evt => {
    let idx = Math.floor(Math.random() * words.length);
    let newWord = words[idx];
    evt.target.innerHTML = newWord;
  };
  useEffect(() => {
    setTimeout(
      () => {
        handleDone();
      },
      process.env.NODE_ENV == 'production' ? 3000 : 1000
    );
  }, [handleDone]);
  return (
    <StyledWrapper>
      <div className="words">
        {words.split('').map((word, idx) => {
          return (
            <WordBox
              onAnimationIteration={handleUpdateWord}
              style={{ animationDuration: `${2 * Math.random() + 0.2}s` }}
              key={`${word}-${idx}`}
            >
              {word}
            </WordBox>
          );
        })}
      </div>
    </StyledWrapper>
  );
}
