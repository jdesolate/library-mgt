/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  ActionIcon,
  AspectRatio,
  Button,
  Card,
  Container,
  createStyles,
  Flex,
  Image,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import {
  IconCheck, IconEdit, IconFileDescription, IconSearch, IconX,
} from '@tabler/icons-react';
import {
  query, getDocs, DocumentData,
} from 'firebase/firestore';
import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import swal from 'sweetalert';

import { LibraryLoader, PageContainer } from '../../components';
import SchoolLogo from '../../components/SchoolLogo';
import { bookRef } from '../../constants/firebaseRefs';

import { useAuth } from '../../contexts/AuthContext';
import AccountType from '../../enums/AccountType.enum';
import SweetAlertEnum from '../../enums/SweetAlert.enum';
import formatDate from '../../utils/Date';

import EditModal from './EditModal';

import * as S from './styles';

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

function BookPage() {
  const { logout, userDetails } = useAuth();
  const isUserAdmin = userDetails?.accountType === AccountType.admin;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isStatusUpdated, setIsStatusUpdated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<DocumentData[]>();
  const [filteredBooks, setFilteredBooks] = useState<DocumentData[]>();
  const [currentBook, setCurrentBook] = useState<DocumentData | null>();
  const isCurrentBookAvailable = currentBook?.status === 'Available';
  const theme = useMantineTheme();
  const [searchInput, setSearchInput] = useState<string>('');
  const { classes } = useStyles();

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
      setFilteredBooks(querySnapshot.docs.map((doc) => doc.data()));

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

  /*
   * <S.BookContainer key={book.accessionNumber}>
   *     <Flex align="center" gap="md" my="sm" wrap="wrap">
   *       <Text ml="md">{book.title}</Text>
   *       <Text color={getStatusColor(book.status)} ml="md">
   *         {getStatusIcon(book.status)}
   *         {' '}
   *         {' '}
   *         {getStatusText(book.status)}
   *       </Text>
   *     </Flex>
   *     <Flex>
   *       {
   *         isUserAdmin && (
   *           <Button
   *             bg="white"
   *             color="blue"
   *             leftIcon={<IconEdit color="black" />}
   *             variant="subtle"
   *             onClick={() => onModalOpen(book, true)}
   *           >
   *             Edit
   *           </Button>
   *         )
   *       }
   *       <Button
   *         bg="white"
   *         color="blue"
   *         leftIcon={<IconFileDescription color="black" />}
   *         variant="subtle"
   *         onClick={() => onModalOpen(book)}
   *       >
   *         View Details
   *       </Button>
   *     </Flex>
   *   </S.BookContainer>
   */

  const renderBook = filteredBooks && filteredBooks.length > 0 ? filteredBooks.map((book) => (
    <Card key={book.accessionNumber} className={classes.card} component="a" href="#" p="md" radius="md">
      <AspectRatio ratio={1920 / 1080}>
        <Image src={book.imageUrl} />
      </AspectRatio>
      <Text color="dimmed" mt="md" size="xs" transform="uppercase" weight={700}>
        {book.status}
      </Text>
      <Text className={classes.title} mt={5}>
        {book.title}
      </Text>
    </Card>
  )) : (
    <Paper bg="white" p="md" radius={5}>
      <Text color="black" size={18}>There are no books available currently. Please come back at a later time.</Text>
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

  const renderLoader = isLoading && <LibraryLoader />;

  return (
    <PageContainer>
      <Paper bg="transparent" h="95vh" p="xl" w="95vw">
        {renderLoader}
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
            <Container py="xl">
              <SimpleGrid breakpoints={[{ cols: 1, maxWidth: 'sm' }]} cols={3}>
                {renderBook}
              </SimpleGrid>
            </Container>
            {/* <S.BooksWrapper>
              {renderBook}
            </S.BooksWrapper> */}
          </S.BookSection>
        </SimpleGrid>
      </Paper>
    </PageContainer>
  );
}

export default BookPage;
