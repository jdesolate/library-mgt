import {
  AppShell,
  Overlay,
  Image,
} from '@mantine/core';

import SchoolBG from '../../assets/school_bg.png';

import CustomContainer from './styles';

type Props = {
  children: JSX.Element;
};

function PageContainer(props: Props) {
  const { children } = props;

  return (
    <AppShell>
      <CustomContainer>
        <Overlay opacity={0.85} zIndex={-1}>
          <Image alt="school background" fit="cover" height="100vh" src={SchoolBG} />
        </Overlay>
        {children}
      </CustomContainer>
    </AppShell>
  );
}

export default PageContainer;
