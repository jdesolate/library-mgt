import styled from 'styled-components';

export const BackgroundContainer = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  filter: blur(2px);
  z-index: -1;
  object-fit: cover;
`;

export const LogoContainer = styled.div`
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    a:nth-of-type(2) .logo {
      animation: logo-spin infinite 20s linear;
    }
  }
`;

export const Title = styled.h1`
  width: 664px;
  height: 50px;
  left: 308px;
  top: 300px;

  font-family: 'Outfit';
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 50px;
  text-align: center;

  color: #FFFFFF;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const HomeButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
`;

export const SignUpButton = styled.a`
  margin: 0;
  margin-left: 5px;
  color: white;
  cursor: pointer;
`;