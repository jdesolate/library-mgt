import { Text } from '@mantine/core';
import styled from 'styled-components';

export const Title = styled(Text)`
  z-index: 1;
  font-family: 'Outfit';
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 50px;
  text-align: center;

  color: #FFFFFF;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;

export const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  color: white;
  gap: 0.5em;
  width: 100%;

  button {
    justify-self: flex-end;
  }

  @media screen and (max-width: 450px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const BooksWrapper = styled.div`
  margin: 2vh 2vw;
  max-width: 450px;

  @media screen and (max-width: 450px) {
    width: 100%;
  }
`;
