import { Global, css } from "@emotion/react";
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro";

const customStyles = css`
  body {
    -webkit-tap-highlight-color: ${theme`colors.pink.300`};
    ${tw`antialiased`}
    font-family: Inter;
  }
  body::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  body::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #000000;
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes flyFromLeft {
    0% {
      margin-left: -100vw;
    }
    to {
      margin-left: 0;
    }
  }
  @keyframes bounceInLeft {
    0%,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      transform: translate3d(-3000px, 0, 0) scaleX(3);
    }
    60% {
      opacity: 1;
      transform: translate3d(25px, 0, 0) scaleX(1);
    }
    75% {
      transform: translate3d(-10px, 0, 0) scaleX(0.98);
    }
    90% {
      transform: translate3d(5px, 0, 0) scaleX(0.995);
    }
    to {
      transform: translateZ(0);
    }
  }
  @keyframes boxAnimate {
    from {
      opacity: 0;
      transform: rotate3d(1, 1, 1, 45deg);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
