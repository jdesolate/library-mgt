/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Button, Flex, Image, Modal, Paper, SimpleGrid, Stack, Switch, Text, TextInput,
} from '@mantine/core';
import { IconEdit, IconFileDescription } from '@tabler/icons-react';
import {
  query, where, getDocs, DocumentData,
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

import * as S from './styles';

function BookPage() {
  const { logout, userDetails } = useAuth();
  const isUserAdmin = userDetails?.accountType === AccountType.admin;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [books, setBooks] = useState<DocumentData[]>();
  const [currentBook, setCurrentBook] = useState<DocumentData | null>();
  const isCurrentBookAvailable = currentBook?.status === 'Available';

  const toggleModal = (book?: DocumentData) => {
    if (book) {
      setCurrentBook(book);
    } else {
      setCurrentBook(null);
    }

    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    logout();
    swal('LOGOUT', 'You have logged out.', SweetAlertEnum.SUCCESS);
  };

  useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true);

      const bookQuery = isUserAdmin ? query(bookRef) : query(bookRef, where('status', '==', 'Available'));

      const querySnapshot = await getDocs(bookQuery);

      setBooks(querySnapshot.docs.map((doc) => doc.data()));

      setIsLoading(false);
    }

    fetchBooks();
  }, []);

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

  const renderBook = books ? books.map((book) => (
    <S.BookContainer key={book.title}>
      <Text ml="md">{book.title}</Text>
      <Flex>
        {renderEditBookButton}
        <Button
          bg="white"
          color="blue"
          leftIcon={<IconFileDescription color="black" />}
          variant="subtle"
          onClick={() => toggleModal(book)}
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

  const renderDatePicker = isUserAdmin && (
    <S.DatePickerContainer>
      <label htmlFor="datePicker">Return Date</label>
      <input
        disabled
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
      centered
      opened={isModalOpen}
      title=" "
      onClose={toggleModal}
    >
      <Stack spacing="sm">
        <Flex align="center" justify="space-around" wrap="wrap">
          {renderDatePicker}
          <Switch
            checked={isCurrentBookAvailable}
            label="Status"
            labelPosition="left"
            my="md"
            offLabel="Unavailable"
            size="lg"
            onLabel="Available"
          />
        </Flex>
        <Image
          withPlaceholder
          alt="With custom placeholder"
          fit="contain"
          height={200}
          src={currentBook?.imageUrl}
        />
        <TextInput
          disabled
          color="white"
          label="Title"
          placeholder="Title"
          size="md"
          value={currentBook?.title}
        />
        <TextInput
          disabled
          color="white"
          label="Author"
          placeholder="Author"
          size="md"
          value={currentBook?.author}
        />
        <TextInput
          disabled
          color="white"
          label="Accession Number"
          placeholder="Accession Number"
          size="md"
          value={currentBook?.accessionNumber}
        />
        <TextInput
          disabled
          color="white"
          label="Call Number"
          placeholder="Call Number"
          size="md"
          value={currentBook?.callNumber}
        />
        <TextInput
          disabled
          color="white"
          label="Publisher"
          placeholder="Publisher"
          size="md"
          value={currentBook?.publisher}
        />
        <TextInput
          disabled
          color="white"
          label="Keywords"
          placeholder="Keywords"
          size="md"
          value={currentBook?.keywords?.map((keyword: string) => keyword)?.join(', ')}
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
            <Text color="white" my="sm" size="1.5rem" weight={600}>
              List of Books
              {' '}
              {isUserAdmin ? null : 'Available'}
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
