import {
  Button, Paper, Table, Flex,
} from '@mantine/core';
import { getDocs, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';

import { LibraryLoader, PageContainer } from '../../components';
import { requestRef } from '../../constants/firebaseRefs';
import { useAuth } from '../../contexts/AuthContext';
import AccountType from '../../enums/AccountType.enum';
import RequestStatus from '../../enums/RequestStatus.enum';
import { BookRequest } from '../../types/Book.type';

enum ConfirmButtonEnum {
  APPROVE = 'Approve',
  REJECT = 'Reject',
}

function RequestPage() {
  const { userDetails } = useAuth();
  const isUserAdmin = userDetails?.accountType === AccountType.ADMIN;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookRequests, setBookRequests] = useState<BookRequest[]>();

  useEffect(() => {
    async function fetchRequests() {
      setIsLoading(true);

      const q = query(requestRef, where('status', '==', RequestStatus.PENDING));

      const data = await getDocs(q);

      setBookRequests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as BookRequest));

      setIsLoading(false);
    }

    fetchRequests();
  }, []);

  const handleApprove = () => {
    // approve
  };

  const handleReject = () => {
    // reject
  };

  async function handleConfirm(confirm: string) {
    await swal(`Would you like to ${confirm.toLowerCase()} this request?`, {
      buttons: {
        cancel: true,
        confirm: true,
      },
    });

    if (confirm === ConfirmButtonEnum.APPROVE) {
      handleApprove();
    } else {
      handleReject();
    }
  }

  const renderLoader = isLoading && <LibraryLoader />;

  const rows = bookRequests?.map((row) => (
    <tr key={row.id}>
      <td>{row.bookTitle}</td>
      <td>{row.returnDate}</td>
      <td>{row.email}</td>
      <td>
        <Flex align="center" justify="center">
          <Button color="green" mr="sm" onClick={() => handleConfirm(ConfirmButtonEnum.APPROVE)}>
            {ConfirmButtonEnum.APPROVE}
          </Button>
          <Button color="red" onClick={() => handleConfirm(ConfirmButtonEnum.REJECT)}>
            {ConfirmButtonEnum.REJECT}
          </Button>
        </Flex>
      </td>
    </tr>
  ));

  return (
    <PageContainer shouldShowNavbar={isUserAdmin}>
      <Paper h="90vh" m="lg" p="xl" sx={{ overflow: 'auto' }} w="70vw">
        {renderLoader}
        <Table miw={800} verticalSpacing="xs">
          <thead>
            <tr>
              <th>Book title</th>
              <th>Return Date</th>
              <th>Borrower</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </PageContainer>
  );
}

export default RequestPage;
