import { keyframes } from 'styled-components';

const AniPopIn = keyframes`
from{
  transform:rotate(-10deg);
  opacity:0;
}
to{
opacity:1;
  transform:rotate(0);
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
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }

  75% {
    transform: translate3d(0, 10px, 0);
  }

  90% {
    transform: translate3d(0, -5px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const AniBlink = keyframes`
  0% { opacity:0;transform: scale(0.5); }
  50% { opacity:0.6;transform: scale(1.5); }
  100% { opacity:1;transform: scale(0.5); }
`;
export { AniPopIn, AniFadeDown, AniBounceInUp, AniBlink };
