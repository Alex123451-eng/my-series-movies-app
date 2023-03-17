import styled, { keyframes } from "styled-components";

import { COLORS, SPACING } from "../../constants/styles";

export const Loader = () => {
  return (
    <LoaderWrapper>
      <Preloader></Preloader>
    </LoaderWrapper>
  );
};

const LoaderWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  vertical-align: middle;
  width: 100px;
  height: 100px;
  margin: ${SPACING.lg} 0;
`;

const spin = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const Preloader = styled.div`
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 140px;
  height: 140px;
  margin: -${SPACING.xxxl} 0 0 -${SPACING.xxxl};
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: ${COLORS.cyan};
  -webkit-animation: ${spin} 2s linear infinite;
  animation: ${spin} 2s linear infinite;

  &::before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: ${COLORS.bluePurple};
    -webkit-animation: ${spin} 3s linear infinite;
    animation: ${spin} 3s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: ${COLORS.pink};
    -webkit-animation: ${spin} 1.5s linear infinite;
    animation: ${spin} 1.5s linear infinite;
  }
`;
