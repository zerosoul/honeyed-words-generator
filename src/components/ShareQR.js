/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CodeQR from 'qrcode.react';
import html2canvas from 'html2canvas';

import StyledButton from './StyledButton';
import ImageShare from '../assets/img/share.svg';
import ImageLogo from '../assets/img/logo.png';
import ImageClose from '../assets/img/close.svg';
import { AniSlideInUp } from './animates';
const ShareButton = styled(StyledButton)`
  z-index: 998;
  position: fixed;
  right: 3rem;
  bottom: 0.5rem;
  margin-right: 0.5rem;
  background-image: url(${ImageShare});
  &.close {
    background-image: url(${ImageClose});
  }
`;
const StyledModal = styled.section`
  z-index: 998;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 8px black;
  position: fixed;
  right: 2.5rem;
  bottom: 3rem;
  background: rgba(2, 2, 2, 0.8);
  padding: 1rem;
  padding: 1rem;
  &.visible {
    animation: ${AniSlideInUp} 1s;
  }
  .title {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .qr {
    width: 14rem;
    background: #fff;
    position: relative;
    .img {
      padding-top: 10px;
      svg {
        width: 100% !important;
        height: 100% !important;
      }
      .tip {
        color: #000;
        font-weight: 800;
        font-size: 0.8rem;
        text-align: center;
      }
    }
    .download {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`;
const Modal = ({ visible = false }) => {
  const [imgSrc, setImgSrc] = useState('');
  useEffect(() => {
    if (visible) {
      const qrEle = document.querySelector('#QR_DOWNLOAD');
      html2canvas(qrEle, {
        debug: process.env.NODE_ENV !== 'production',
        onclone: doc => {
          let tmp = doc.querySelector('#QR_DOWNLOAD');
          tmp.classList.remove('hidden');
        },
        scale: window.devicePixelRatio * 2
      }).then(cvs => {
        const tmp = cvs.toDataURL();
        setImgSrc(tmp);
        qrEle.classList.remove('hidden');
      });
    }
  }, [visible]);

  return (
    <StyledModal className={visible ? 'visible' : 'hidden'}>
      <div className="title">👇长按或右键保存，发朋友圈或发给TA表白👇</div>
      <div className="qr hidden" id="QR_DOWNLOAD">
        <div className="img">
          <CodeQR
            renderAs="svg"
            imageSettings={{ width: 30, height: 30, src: ImageLogo, excavate: true }}
            size={256}
            bgColor="#fff"
            level="Q"
            fgColor="#000"
            includeMargin={true}
            value={`${window.location.href.split('?')[0]}?idx=${window.CUR_WORDS_IDX}`}
          />
          <div className="tip">💓想对你说的话，就在这里！💓</div>
        </div>
        {imgSrc ? <img className="download" src={imgSrc} /> : null}
      </div>
    </StyledModal>
  );
};
export default function ShareQR({ visible = false }) {
  const [expand, setExpand] = useState(false);
  const handleClick = () => {
    setExpand(prev => !prev);
  };

  return (
    <>
      <Modal visible={expand} />
      <ShareButton
        className={`${expand ? 'close' : ''} ${visible ? 'visible' : 'hidden'}`}
        onClick={handleClick}
      ></ShareButton>
    </>
  );
}
