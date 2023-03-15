import {
  AppShell, Container, Group, Paper, Stack,
} from '@mantine/core';

import CustomContainer from './styles';

type Props = {
  children: JSX.Element[];
};

function PageContainer(props: Props) {
  const { children } = props;

  return (
    <AppShell>
      <CustomContainer>
        <Stack align="center">
          {children}
        </Stack>
      </CustomContainer>
    </AppShell>
  );
}

export default PageContainer;
