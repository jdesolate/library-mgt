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

export const BookSection = styled.div`
  margin: 1vh 2vw;
`;

export const BooksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 20vh;
  overflow-y: auto;

  
  @media screen and (min-width: 350px) {
    height: 25vh;
  }
  
  @media screen and (min-width: 450px) {
    height: 40vh;
  }

  @media screen and (min-width: 6000px) {
    height: 45vh;
  }

  @media screen and (min-width: 800px) {
    height: 50vh;
  }
`;

export const SearchWrapper = styled.div`
  max-width: 450px;

  @media screen and (max-width: 450px) {
    width: 100%;
  }
`;

export const BookContainer = styled.div`
  display: flex;
  border-radius: 5px;
  height: fit-content;
  flex-wrap: wrap;
  padding: 1vh 2vw;
  align-items: center;
  justify-content: space-between;
  background: white;
  width: 100%;
`;
