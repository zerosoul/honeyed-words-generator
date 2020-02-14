import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import StyledWordBox from './StyledWordBox';
import ImageDownload from '../assets/img/download.svg';
import ImageRefresh from '../assets/img/refresh.svg';
import ImageHeart from '../assets/img/heart.svg';

import Words from '../assets/words';

function updateWords() {
  let idx = Math.floor(Math.random() * Words.length);
  let result = Words[idx];
  return result;
}

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
  transform: translateZ(0);
  backface-visibility: hidden;
  .card {
    position: relative;
    padding: 1rem 1.8rem;
    background: rgba(108, 53, 44, 0.8);
    margin-top: -2rem;
    max-width: 90vw;
    transform-style: preserve-3d;
    background-image: url(${ImageHeart}), url(${ImageHeart}), url(${ImageHeart});
    background-repeat: no-repeat;
    background-origin: content-box;
    background-size: 4rem, 2rem, 1rem;
    background-position: right bottom, left bottom, right top;
    box-shadow: 0 0 1rem #6c352c;
    .heart {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      width: 3rem;
      opacity: 0.5;
      transform: rotate(20deg);
      display: none;
    }
    &.starting {
      background: rgb(244, 176, 243);
      background: linear-gradient(294deg, rgba(244, 176, 243, 1) 0%, rgba(234, 87, 107, 1) 100%);
      box-shadow: none;
      .heart {
        display: block;
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
      margin-bottom: 1rem;
      display: flex;
      flex-wrap: wrap;
      font-size: 2rem;
      &:nth-child(even) {
        transform: translateZ(80px);
      }
      &:nth-child(odd) {
        transform: translateZ(100px);
      }
    }
  }
  .opts {
    margin-top: 5rem;
  }
`;
const StyledButton = styled.button`
  background-size: 0.8rem;
  background-position: 0.4rem center;
  background-repeat: no-repeat;
  background-color: rgba(2, 2, 2, 0.6);
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 8px black;
  padding: 0.5rem 0.5rem 0.5rem 1.4rem;
  margin-right: 0.6rem;
  &.refresh {
    background-image: url(${ImageRefresh});
  }
  &.download {
    background-image: url(${ImageDownload});
  }
`;
const WordBox = styled(StyledWordBox)`
  padding: 0.4rem;
  font-weight: 800;
`;
const sleep = async (dur = 2) => {
  const misDur = dur * 1000;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, misDur);
  });
};
export default function Card({ handleUpdate }) {
  const [words, setWords] = useState('');
  const [generating, setGenerating] = useState(false);

  const cardRef = useRef(null);
  useEffect(() => {
    let newWords = updateWords();
    setWords(newWords);
  }, []);
  useEffect(() => {
    if (generating) {
      document.onmousemove = null;
      cardRef.current.style.transform = 'none';
    } else {
      document.onmousemove = e => {
        if (cardRef) {
          let ax = -(window.innerWidth / 2 - e.pageX) / 20;
          let ay = (window.innerHeight / 2 - e.pageY) / 10;
          console.log('moving', `rotateY(${ax}deg) rotateX(${ay}deg)`);
          cardRef.current.style.transform = `rotateY(${ax}deg) rotateX(${ay}deg)`;
        }
      };
    }
    return () => {
      document.onmousemove = null;
    };
  }, [generating]);
  const handleDownload = async () => {
    console.log('download');
    let ele = document.querySelector('#HONEYED_WORDS_CARD');
    await generateImage(ele);
  };
  const generateImage = async (ele, isWebview = false) => {
    setGenerating(true);
    await sleep(1);
    html2canvas(ele, {
      debug: process.env.NODE_ENV !== 'production',
      onclone: document => {
        let tmp = document.querySelector('#HONEYED_WORDS_CARD');
        tmp.classList.add('starting');
        if (isWebview) {
          tmp.style.boxShadow = 'none';
        }

        console.log('dommmm', tmp.innerHTML);
      },
      scale: window.devicePixelRatio * (isWebview ? 2 : 1)
    }).then(function(canvas) {
      console.log(canvas);
      if (isWebview) {
        console.log('weixin');
        let img = document.createElement('img');

        canvas.toBlob(blob => {
          const {
            URL: { createObjectURL }
          } = window;
          img.src = createObjectURL(blob);
          img.classList.add('downloadImg');
        });
        ele.classList.add('img');
        ele.appendChild(img);
        setGenerating(false);
      } else {
        canvas.toBlob(blob => {
          saveAs(blob, `hw-${new Date().getTime()}.png`);
          setGenerating(false);
        }, 'image/png');
        // saveAs(canvas.toDataURL(), `${name}-${new Date().getTime()}.png`);
      }
      ele.classList.remove('starting');
    });
  };
  return (
    <StyledWrapper>
      <div id="HONEYED_WORDS_CARD" className="card" ref={cardRef}>
        {words.split('|').map(line => {
          return (
            <p className="line" key={line}>
              {line.split('').map((w, idx) => {
                return (
                  <WordBox className="word" key={`${w}-${idx}`}>
                    {w}
                  </WordBox>
                );
              })}
            </p>
          );
        })}
        <img className="heart" src={ImageHeart} alt="heart" />
      </div>
      <div className="opts">
        <StyledButton className="refresh" onClick={handleUpdate}>
          换一句
        </StyledButton>
        <StyledButton disabled={generating} className="download" onClick={handleDownload}>
          保存
        </StyledButton>
      </div>
    </StyledWrapper>
  );
}
