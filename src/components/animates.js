import { keyframes } from 'styled-components';

const AniPopIn = keyframes`
from{
  transform:rotate(-10deg) translateX(-110px);
  opacity:0;
}
to{
opacity:1;
  transform:rotate(0) translateX(0);
}
`;
const AniFadeDown = keyframes`
 0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.4);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;
const AniBounceInUp = keyframes`
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }

`;
const AniZoomIn = keyframes`
 from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
`;
const AniBlink = keyframes`
  0% { opacity:0;transform: scale(0.2) rotate(0); }
  50% { opacity:0.6;transform: scale(2) rotate(30deg); }
  100% { opacity:1;transform: scale(0.5) rotate(-30deg); }
`;
const AniSlideInDown = keyframes`
 from {
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }

`;
const AniSlideLeft = keyframes`
 from{
  transform:translateX(100%)
}
to{
  transform:translateX(0)
}
`;
export { AniSlideLeft, AniPopIn, AniSlideInDown, AniZoomIn, AniFadeDown, AniBounceInUp, AniBlink };
