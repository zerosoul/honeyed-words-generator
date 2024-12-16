import { useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
// import ImageDownload from '../assets/img/download.svg';
import StyledButton from './StyledButton';
import { MdDownload } from 'react-icons/md';

const ua = navigator.userAgent;
const isiOSwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ua);
const isWebview = ua.toLowerCase().indexOf('micromessenger') > -1 || isiOSwebview;
const Button = styled(StyledButton)`
  position: fixed;
  left: 0.5rem;
  bottom: 0.5rem;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    width: 28px;
    height: 28px;
  }
`;

export default function SaveButton({ visible }) {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    if (isWebview) {
      alert('请在浏览器打开！');
    }
    console.log('download');
    let ele = document.querySelector('#HONEYED_WORDS_CARD');
    await generateImage(ele);
  };
  const generateImage = async (ele, isWebview = false) => {
    setGenerating(true);
    html2canvas(ele, {
      debug: import.meta.env.DEV,
      onclone: (document) => {
        let tmp = document.querySelector('#HONEYED_WORDS_CARD');
        tmp.classList.add('starting');
        tmp.style.transform = 'none';
        tmp.style.boxShadow = 'none';
        console.log('dommmm', tmp.innerHTML);
      },
      scale: window.devicePixelRatio * (isWebview ? 2 : 1)
    }).then(function (canvas) {
      console.log(canvas);
      if (isWebview) {
        console.log('weixin');
        let img = document.createElement('img');

        canvas.toBlob((blob) => {
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
        canvas.toBlob((blob) => {
          saveAs(blob, `hw-${new Date().getTime()}.png`);
          setGenerating(false);
        }, 'image/png');
        // saveAs(canvas.toDataURL(), `${name}-${new Date().getTime()}.png`);
      }
      ele.classList.remove('starting');
    });
  };
  return (
    <Button
      className={visible ? 'visible' : 'hidden'}
      disabled={generating}
      onClick={handleDownload}
    >
      <MdDownload />
    </Button>
  );
}
