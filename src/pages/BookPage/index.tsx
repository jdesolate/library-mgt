/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  ActionIcon,
  Button,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { query, getDocs, DocumentData } from 'firebase/firestore';
import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import swal from 'sweetalert';

import { LibraryLoader, PageContainer } from '../../components';
import SchoolLogo from '../../components/SchoolLogo';
import { bookRef } from '../../constants/firebaseRefs';

import { useAuth } from '../../contexts/AuthContext';
import SweetAlertEnum from '../../enums/SweetAlert.enum';

import BookCard from './BookCard';
import BookModal from './BookModal';

import * as S from './styles';

function BookPage() {
  const { logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isStatusUpdated, setIsStatusUpdated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<DocumentData[]>();
  const [filteredBooks, setFilteredBooks] = useState<DocumentData[]>();
  const [currentBook, setCurrentBook] = useState<DocumentData | null>();
  const theme = useMantineTheme();
  const [searchInput, setSearchInput] = useState<string>('');

  const onModalOpen = (book?: DocumentData | null) => {
    if (book) {
      setCurrentBook(book);
    } else {
      setCurrentBook(null);
    }

    setIsModalOpen(!isModalOpen);
  };

  const onCloseModal = () => {
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
      setFilteredBooks(querySnapshot.docs.map((doc) => doc.data()));

      setIsLoading(false);
    }

    fetchBooks();
  }, [isStatusUpdated]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSearch = () => {
    setFilteredBooks(books?.filter(
      (book) => book.title.toLowerCase().includes(searchInput.toLowerCase()),
    ));
  };

  const handleSearchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === '') {
      setFilteredBooks(books);
      setSearchInput('');
    } else {
      setSearchInput(event.currentTarget.value);
    }
  };

  const renderBook = filteredBooks && filteredBooks.length > 0 ? filteredBooks.map((book) => (
    <BookCard key={book.accessionNumber} book={book} onOpen={onModalOpen} />
  )) : (
    <Paper bg="white" left="15%" p="md" pos="absolute" radius={5} w="70%">
      <Text color="black" size={18}>There are no books available currently. Please come back at a later time.</Text>
    </Paper>
  );

  const renderBookModal = isModalOpen && currentBook && (
    <BookModal
      book={currentBook}
      isOpen={isModalOpen}
      isStatusUpdated={isStatusUpdated}
      onCloseModal={onCloseModal}
      onStatusUpdate={setIsStatusUpdated}
    />
  );
  const renderLoader = isLoading && <LibraryLoader />;

  return (
    <PageContainer>
      <Paper bg="transparent" h="95vh" p="xl" w="95vw">
        {renderLoader}
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
              <form onSubmit={handleFormSubmit}>
                <TextInput
                  placeholder="Search for a book here"
                  radius={5}
                  rightSection={(
                    <ActionIcon
                      color={theme.primaryColor}
                      radius="xl"
                      size={32}
                      type="submit"
                      variant="filled"
                      onClick={handleSearch}
                    >
                      <IconSearch size="1.1rem" stroke={1.5} />
                    </ActionIcon>
                  )}
                  rightSectionWidth={42}
                  size="md"
                  onChange={handleSearchOnChange}
                />
              </form>
            </S.SearchWrapper>
            <Text color="white" my="sm" size="1.5rem" weight={600}>
              List of Books
            </Text>
            <SimpleGrid
              breakpoints={[
                { cols: 1, maxWidth: 'sm' },
                { cols: 2, maxWidth: 'md' },
                { cols: 3, maxWidth: 'lg' },
              ]}
              cols={4}
            >
              {renderBook}
            </SimpleGrid>
          </S.BookSection>
        </SimpleGrid>
      </Paper>
    </PageContainer>
  );
}

export default BookPage;
