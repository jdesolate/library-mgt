import {
  Button, Flex, Image, Modal, Paper, SimpleGrid, Stack, Text, TextInput,
} from '@mantine/core';
import { IconEdit, IconFileDescription } from '@tabler/icons-react';
import { useState } from 'react';
import swal from 'sweetalert';

import { PageContainer, SearchInput } from '../../components';
import SchoolLogo from '../../components/SchoolLogo';

import { useAuth } from '../../contexts/AuthContext';
import AccountType from '../../enums/AccountType.enum';
import SweetAlertEnum from '../../enums/SweetAlert.enum';

import * as S from './styles';

function BookPage() {
  const { logout, userDetails } = useAuth();
  const isUserAdmin = userDetails?.accountType === AccountType.admin;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    logout();
    swal('LOGOUT', 'You have logged out.', SweetAlertEnum.SUCCESS);
  };

  const renderEditBookButton = isUserAdmin && (
    <Button
      bg="white"
      color="blue"
      leftIcon={<IconEdit color="black" />}
      variant="subtle"
    >
      Edit
    </Button>
  );

  const renderBook = (
    <S.BookContainer>
      <Text ml="md">Book 1</Text>
      <Flex>
        {renderEditBookButton}
        <Button
          bg="white"
          color="blue"
          leftIcon={<IconFileDescription color="black" />}
          variant="subtle"
          onClick={toggleModal}
        >
          View Details
        </Button>
      </Flex>
    </S.BookContainer>
  );

  const renderBookModal = (
    <Modal
      centered
      opened={isModalOpen}
      title="Book"
      onClose={toggleModal}
    >
      <Stack spacing="sm">
        <Image
          withPlaceholder
          alt="With custom placeholder"
          height={200}
        />
        <TextInput
          required
          color="white"
          placeholder="Title"
          size="md"
        />
        <TextInput
          required
          color="white"
          placeholder="Author"
          size="md"
        />
        <TextInput
          required
          color="white"
          placeholder="Accession Number"
          size="md"
        />
        <TextInput
          required
          color="white"
          placeholder="Call Number"
          size="md"
        />
        <TextInput
          required
          color="white"
          placeholder="Publisher"
          size="md"
        />
        <TextInput
          required
          color="white"
          placeholder="Keywords"
          size="md"
        />
      </Stack>
    </Modal>
  );

  return (
    <PageContainer>
      <Paper bg="transparent" h="95vh" p="xl" w="95vw">
        {renderBookModal}
        <SimpleGrid cols={1} spacing="md">
          <S.FlexWrap>
            <S.FlexWrap>
              <SchoolLogo />
              <S.Title>LCCL Book Availability System</S.Title>
            </S.FlexWrap>
            <Button bg="red" variant="gradient" onClick={handleLogout}>Logout</Button>
          </S.FlexWrap>
          <S.BookSection>
            <S.SearchWrapper>
              <SearchInput radius={5} size="md" />
            </S.SearchWrapper>
            <Text color="white" my="sm" size="1.5rem" weight={600}>List of Books Available</Text>
            <S.BooksWrapper>
              {renderBook}
              {renderBook}
              {renderBook}
              {renderBook}
              {renderBook}
            </S.BooksWrapper>
          </S.BookSection>
        </SimpleGrid>
      </Paper>
    </PageContainer>
  );
}

export default BookPage;
