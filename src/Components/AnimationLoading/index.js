import React from 'react';
import styled from 'styled-components';

const LOADING = styled.span`
  animation: blinker 1s step-start infinite;
  color: ${({ theme }) => theme.colors.primary};

@keyframes blinker {
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`

export default function AnimationLoading() {
  return (
    <>
      <LOADING>
        Loading ...
    </LOADING>
    </>
  )
}
