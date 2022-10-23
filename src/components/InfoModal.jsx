/* eslint-disable react/jsx-no-target-blank */
import { useState } from 'react';
import styled from 'styled-components';
import GitHubButton from 'react-github-btn';
import StyledButton from './StyledButton';
import ImageInfo from '../assets/img/info.svg';
import ImageClose from '../assets/img/close.svg';
import ImageReward from '../assets/img/reward.jpg';
import { AniSlideLeft } from './animates';
const InfoButton = styled(StyledButton)`
  position: fixed;
  right: 0.5rem;
  bottom: 0.5rem;
  margin-right: 0.5rem;
  background-image: url(${ImageInfo});
  &.close {
    background-image: url(${ImageClose});
  }
`;
const StyledModal = styled.section`
  z-index: 998;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 8px black;
  position: fixed;
  right: 0.5rem;
  bottom: 3rem;
  background: rgba(2, 2, 2, 0.6);
  padding: 1rem;
  padding: 1rem;
  &.visible {
    animation: ${AniSlideLeft} 1s;
  }
  .reward {
    width: 14rem;
    align-self: center;
    margin-bottom: 1.8rem;
    position: relative;
    img {
      width: 100%;
      border: 1px solid #222;
    }
    &:after {
      content: attr(title);
      display: block;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      text-align: left;
      font-size: 0.8rem;
      bottom: -1rem;
      text-shadow: 0 0 8px #a09090;
    }
  }
  .line {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    &.title {
      font-size: 1.4rem;
      font-weight: 800;
    }
    &.github > span {
      margin-right: 0.4rem;
    }
  }
  .copyright {
    font-size: 0.5rem;
  }
`;
const Modal = ({ visible = false }) => (
  <StyledModal className={visible ? 'visible' : 'hidden'}>
    <div className="line title">土味情话在线生成器</div>
    <div className="line github">
      <GitHubButton
        href="https://github.com/zerosoul/honeyed-words-generator"
        data-color-scheme="no-preference: light; light: light; dark: dark;"
        data-icon="octicon-star"
        data-size="large"
        data-show-count="true"
        aria-label="Star zerosoul/honeyed-words-generator on GitHub"
      >
        Star
      </GitHubButton>
      <GitHubButton
        href="https://github.com/zerosoul/honeyed-words-generator/fork"
        data-color-scheme="no-preference: light; light: light; dark: dark;"
        data-icon="octicon-repo-forked"
        data-size="large"
        data-show-count="true"
        aria-label="Fork zerosoul/honeyed-words-generator on GitHub"
      >
        Fork
      </GitHubButton>
    </div>
    <div className="reward" title="如果有帮助到您，欢迎打赏~">
      <img src={ImageReward} alt="reward" title="如果有帮助到您，欢迎打赏~" />
    </div>
    <div className="copyright">
      <span> Copyright © {new Date().getFullYear()} By </span>
      <a rel="noopener noreferrer" href="https://yangerxiao.com" target="_blank">
        Tristan
      </a>
    </div>
  </StyledModal>
);
export default function InfoModal() {
  const [visible, setVisible] = useState(false);
  const handleInfoClick = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <Modal visible={visible} />

      <InfoButton className={`${visible ? 'close' : ''}`} onClick={handleInfoClick}></InfoButton>
    </>
  );
}
