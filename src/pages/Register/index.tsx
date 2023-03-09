import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, PageContainer } from '../../components';

import * as S from './styles';

export default function Register() {
  const navigate = useNavigate();

  function navigateToUrl(url: string) {
    if (url === '/login') {
      navigate('/');
    } else {
      navigate(`/register/${url}`);
    }
  }

  return (
    <PageContainer>
      <S.BackgroundContainer>
        <img alt="school background" className="logo" src="src/assets/school_bg.png" />
      </S.BackgroundContainer>
      <S.LogoContainer>
        <img alt="school logo" className="logo" src="src/assets/school_logo.png" />
      </S.LogoContainer>
      <S.Title>LCCL Book Availability System</S.Title>
      <S.HomeButtonContainer>
        <Button text="SIGN UP AS STUDENT" />
        <Button text="SIGN UP AS ADMIN" />
        <S.FlexRow>
          <p>Already have an account?</p>
          <S.SignUpButton onClick={() => navigateToUrl('/login')}>Log in</S.SignUpButton>
        </S.FlexRow>
      </S.HomeButtonContainer>
    </PageContainer>
  );
}
