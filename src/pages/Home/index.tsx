import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, PageContainer } from '../../components';

import * as S from './styles';

export default function Home() {
  const navigate = useNavigate();

  function navigateToUrl(url: string) {
    if (url === 'registration') {
      navigate(`/${url}`);
    } else {
      navigate(`/login/${url}`);
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
        <Button text="LOG IN AS STUDENT" onClick={() => navigateToUrl('student')} />
        <Button text="LOG IN AS ADMIN" onClick={() => navigateToUrl('admin')} />
        <S.FlexRow>
          <p>Don&apos;t have an account?</p>
          <S.SignUpButton onClick={() => navigateToUrl('registration')}>Sign up</S.SignUpButton>
        </S.FlexRow>
      </S.HomeButtonContainer>
    </PageContainer>
  );
}
