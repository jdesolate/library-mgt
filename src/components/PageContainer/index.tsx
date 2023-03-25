import {
  AppShell,
  Image,
} from '@mantine/core';

import SchoolBG from '../../assets/school_bg.png';
import LibraryNavbar from '../LibraryNavbar';

import * as S from './styles';

type Props = {
  children: JSX.Element;
  shouldShowNavbar: boolean;
};

function PageContainer(props: Props) {
  const { children, shouldShowNavbar } = props;

  const renderNavbar = shouldShowNavbar ? <LibraryNavbar /> : undefined;

  return (
    <AppShell
      navbar={renderNavbar}
      padding={0}
    >
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
