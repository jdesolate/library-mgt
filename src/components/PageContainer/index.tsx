import {
  AppShell,
  Image,
} from '@mantine/core';

import SchoolBG from '../../assets/school_bg.png';

import * as S from './styles';

type Props = {
  children: JSX.Element;
};

function PageContainer(props: Props) {
  const { children } = props;

  return (
    <AppShell>
      <S.BackgroundImageWrapper>
        <Image alt="school background" fit="cover" height="100vh" src={SchoolBG} />
      </S.BackgroundImageWrapper>
      <S.CustomContainer>
        {children}
      </S.CustomContainer>
    </AppShell>
  );
}

export default PageContainer;
