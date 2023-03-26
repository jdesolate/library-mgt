import { Paper } from '@mantine/core';
import React from 'react';

import { PageContainer } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import AccountType from '../../enums/AccountType.enum';

function RequestPage() {
  const { userDetails } = useAuth();
  const isUserAdmin = userDetails?.accountType === AccountType.ADMIN;

  return (
    <PageContainer shouldShowNavbar={isUserAdmin}>
      <Paper bg="transparent" h="95vh" p="xl" />
    </PageContainer>
  );
}

export default RequestPage;
