/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Button, Flex, Image, Modal, Paper, SimpleGrid, Stack, Switch, Text, TextInput,
} from '@mantine/core';
import {
  IconCheck, IconEdit, IconFileDescription, IconX,
} from '@tabler/icons-react';
import {
  query, getDocs, DocumentData,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

import { PageContainer, SearchInput } from '../../components';
import SchoolLogo from '../../components/SchoolLogo';
import { bookRef } from '../../constants/firebaseRefs';

import { useAuth } from '../../contexts/AuthContext';
import AccountType from '../../enums/AccountType.enum';
import SweetAlertEnum from '../../enums/SweetAlert.enum';
import formatDate from '../../utils/Date';

import EditModal from './EditModal';

import * as S from './styles';

function BookPage() {
  const { logout, userDetails } = useAuth();
  const isUserAdmin = userDetails?.accountType === AccountType.admin;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isStatusUpdated, setIsStatusUpdated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [books, setBooks] = useState<DocumentData[]>();
  const [currentBook, setCurrentBook] = useState<DocumentData | null>();
  const isCurrentBookAvailable = currentBook?.status === 'Available';

  const onModalOpen = (book?: DocumentData | null, isEdit?: boolean) => {
    if (book) {
      setCurrentBook(book);
    } else {
      setCurrentBook(null);
    }

    if (isEdit) {
      setIsEditModalOpen(!isEditModalOpen);
    } else {
      setIsModalOpen(!isModalOpen);
    }
  };

  const onCloseModal = () => {
    setIsEditModalOpen(false);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    swal('LOGOUT', 'You have logged out.', SweetAlertEnum.SUCCESS);
  };

  useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true);

      const bookQuery = query(bookRef);

      const querySnapshot = await getDocs(bookQuery);

      setBooks(querySnapshot.docs.map((doc) => doc.data()));

      setIsLoading(false);
    }

    fetchBooks();
  }, [isStatusUpdated]);

  function getStatusColor(status: string) {
    return status === 'Available' ? 'green' : 'red';
  }

  function getStatusIcon(status: string) {
    return status === 'Available' ? <IconCheck size={12} /> : <IconX size={12} />;
  }

  function getStatusText(status: string) {
    return status === 'Available' ? 'Available' : 'Unavailable';
  }

  const renderBook = books ? books.map((book) => (
    <S.BookContainer key={book.accessionNumber}>
      <Flex align="center" gap="md" my="sm" wrap="wrap">
        <Text ml="md">{book.title}</Text>
        <Text color={getStatusColor(book.status)} ml="md">
          {getStatusIcon(book.status)}
          {' '}
          {' '}
          {getStatusText(book.status)}
        </Text>
      </Flex>
      <Flex>
        {
          isUserAdmin && (
            <Button
              key={book.accessionNumber}
              bg="white"
              color="blue"
              leftIcon={<IconEdit color="black" />}
              variant="subtle"
              onClick={() => onModalOpen(book, true)}
            >
              Edit
            </Button>
          )
        }
        <Button
          key={book.accessionNumber}
          bg="white"
          color="blue"
          leftIcon={<IconFileDescription color="black" />}
          variant="subtle"
          onClick={() => onModalOpen(book)}
        >
          View Details
        </Button>
      </Flex>
    </S.BookContainer>
  )) : (
    <Paper bg="white" p="md" radius={5}>
      <Text align="center" color="gray" size={22}>There are no books available currently. Please come back at a later time.</Text>
    </Paper>
  );

  const renderDatePicker = !isCurrentBookAvailable && (
    <S.DatePickerContainer>
      <label htmlFor="datePicker">Return Date</label>
      <input
        readOnly
        className="datePickerInput"
        name="datePicker"
        type="date"
        value={formatDate(currentBook?.returnDate)}
      />
    </S.DatePickerContainer>
  );

  const renderBookModal = isModalOpen && (
    <Modal
      key={currentBook?.accessionNumber}
      centered
      opened={isModalOpen}
      title=" "
      onClose={onCloseModal}
    >
      <Stack spacing="sm">
        <Image
          withPlaceholder
          alt="With custom placeholder"
          fit="contain"
          height={200}
          my="md"
          src={currentBook?.imageUrl}
        />
        <TextInput
          readOnly
          color="white"
          label="Title"
          placeholder="Title"
          size="md"
          value={currentBook?.title}
        />
        <TextInput
          readOnly
          color="white"
          label="Author"
          placeholder="Author"
          size="md"
          value={currentBook?.author}
        />
        <TextInput
          readOnly
          color="white"
          label="Accession Number"
          placeholder="Accession Number"
          size="md"
          value={currentBook?.accessionNumber}
        />
        <TextInput
          readOnly
          color="white"
          label="Call Number"
          placeholder="Call Number"
          size="md"
          value={currentBook?.callNumber}
        />
        <TextInput
          readOnly
          color="white"
          label="Publisher"
          placeholder="Publisher"
          size="md"
          value={currentBook?.publisher}
        />
        <TextInput
          readOnly
          color="white"
          label="Keywords"
          placeholder="Keywords"
          size="md"
          value={currentBook?.keywords?.map((keyword: string) => keyword)?.join(', ')}
        />
        <Flex align="center" gap="xl" justify="start" wrap="wrap">
          {renderDatePicker}
          <S.SwitchWrapper>
            <Switch
              checked={isCurrentBookAvailable}
              label="Status"
              labelPosition="left"
              offLabel="Unavailable"
              size="lg"
              onLabel="Available"
            />
          </S.SwitchWrapper>
        </Flex>
      </Stack>
    </Modal>
  );

  const renderEditBookModal = isUserAdmin && (
    <EditModal
      book={currentBook}
      isOpen={isEditModalOpen}
      isStatusUpdated={isStatusUpdated}
      onCloseModal={onCloseModal}
      onStatusUpdate={setIsStatusUpdated}
    />
  );

  return (
    <PageContainer>
      <Paper bg="transparent" h="95vh" p="xl" w="95vw">
        {renderBookModal}
        {renderEditBookModal}
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
            <Text color="white" my="sm" size="1.5rem" weight={600}>
              List of Books
            </Text>
            <S.BooksWrapper>
              {renderBook}
            </S.BooksWrapper>
          </S.BookSection>
        </SimpleGrid>
      </Paper>
    </PageContainer>
  );
}

export default BookPage;
