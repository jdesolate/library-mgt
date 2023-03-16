import {
  Button, Flex, Paper, SimpleGrid,
} from '@mantine/core';
import swal from 'sweetalert';

import { PageContainer } from '../../components';
import SchoolLogo from '../../components/SchoolLogo';

import { useAuth } from '../../contexts/AuthContext';
import SweetAlertEnum from '../../enums/SweetAlert.enum';

import * as S from './styles';

function BookPage() {
  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
    swal('LOGOUT', 'You have logged out.', SweetAlertEnum.SUCCESS);
  };

  return (
    <PageContainer>
      <Paper bg="transparent" h="95vh" p="xl" w="95vw">
        <SimpleGrid cols={1} spacing="md">
          <S.FlexWrap>
            <S.FlexWrap>
              <SchoolLogo />
              <S.Title>LCCL Book Availability System</S.Title>
            </S.FlexWrap>
            <Button bg="red" variant="gradient" onClick={handleLogout}>Logout</Button>
          </S.FlexWrap>
        </SimpleGrid>
      </Paper>
    </PageContainer>
  );
}

export default BookPage;
