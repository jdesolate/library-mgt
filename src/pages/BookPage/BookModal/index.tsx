/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Image, Modal, Stack, Flex, Switch, TextInput, Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPencil } from '@tabler/icons-react';
import {
  doc, DocumentData, updateDoc,
} from 'firebase/firestore';
import { useState } from 'react';

import swal from 'sweetalert';

import { db } from '../../../configs/firebaseConfig';
import { useAuth } from '../../../contexts/AuthContext';
import AccountType from '../../../enums/AccountType.enum';
import BookStatus from '../../../enums/BookStatus.enum';
import SweetAlertEnum from '../../../enums/SweetAlert.enum';

import formatDate from '../../../utils/Date';
import * as S from '../styles';

type Props = {
  book: DocumentData;
  isOpen: boolean;
  isStatusUpdated: boolean;
  onCloseModal: () => void;
  onStatusUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

function BookModal(props: Props) {
  const {
    book, isOpen, isStatusUpdated, onCloseModal, onStatusUpdate,
  } = props;
  const [isBookAvailable, setIsBookAvailable] = useState<boolean>(book.status === BookStatus.AVAILABLE);
  const [onEditState, setOnEditState] = useState<boolean>(false);
  const { userDetails } = useAuth();
  const isUserAdmin = userDetails?.accountType === AccountType.ADMIN;

  const form = useForm({
    initialValues: {
      accessionNumber: book.accessionNumber,
      author: book.author,
      bookType: book.bookType,
      callNumber: book.callNumber,
      keywords: book.keywords,
      publisher: book.publisher,
      returnDate: book.returnDate,
      status: book.status,
      title: book.title,
    },
  });

  const handleOnCloseModal = () => {
    setOnEditState(!onEditState);
    onCloseModal();
  };

  async function saveChanges() {
    try {
      const newBookDetails = {
        accessionNumber: form.values.accessionNumber,
        author: form.values.author,
        bookType: form.values.bookType,
        callNumber: form.values.callNumber,
        keywords: form.values.keywords,
        publisher: form.values.publisher,
        returnDate: form.values.returnDate,
        status: form.values.status,
        title: form.values.title,
      };

      await updateDoc(doc(db, 'book', book.id), newBookDetails);

      onStatusUpdate(!isStatusUpdated);

      swal('Update', 'Successfully saved changes.', SweetAlertEnum.SUCCESS);
      form.reset();
      handleOnCloseModal();
    } catch (e) {
      swal('Update', 'Failed to save change.', SweetAlertEnum.ERROR);
    }
  }

  async function handleConfirm() {
    const isConfirmed = await swal('Are you sure?', {
      buttons: {
        cancel: true,
        confirm: true,
      },
    });

    if (isConfirmed) {
      saveChanges();
    }
  }

  const toggleEditState = () => {
    setOnEditState(!onEditState);
  };

  const toggleStatus = () => {
    if (onEditState) {
      setIsBookAvailable(!isBookAvailable);

      const bookStatus = !isBookAvailable ? BookStatus.AVAILABLE : BookStatus.UNAVAILABLE;

      form.setFieldValue('status', bookStatus);
    }
  };

  const renderDatePicker = !isBookAvailable && (
    <S.DatePickerContainer>
      <label htmlFor="datePicker">Return Date</label>
      <input
        className="datePickerInput"
        name="datePicker"
        readOnly={!onEditState}
        required={!isBookAvailable && onEditState}
        type="date"
        value={formatDate(form.values.returnDate)}
        onChange={(event) => form.setFieldValue('returnDate', event.currentTarget.value)}
      />
    </S.DatePickerContainer>
  );

  const renderEditButton = isUserAdmin && !onEditState && (
    <Flex justify="end">
      <Button
        rightIcon={
          <IconPencil size="1.2rem" stroke={1.5} />
        }
        size="sm"
        variant="subtle"
        onClick={toggleEditState}
      >
        Edit
      </Button>
    </Flex>
  );

  return (
    <Modal
      centered
      opened={isOpen}
      title=" "
      onClose={handleOnCloseModal}
    >
      <form onSubmit={form.onSubmit(handleConfirm)}>
        <Stack spacing="sm">
          {renderEditButton}
          <Image
            withPlaceholder
            alt="Book Image"
            fit="contain"
            height={200}
            my="md"
            src={book.imageUrl}
          />
          <TextInput
            color="white"
            label="Title"
            placeholder="Title"
            readOnly={!onEditState}
            required={onEditState}
            size="md"
            value={form.values.title}
            onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
          />
          <TextInput
            color="white"
            label="Book Type"
            placeholder="Book Type"
            readOnly={!onEditState}
            required={onEditState}
            size="md"
            value={form.values.bookType}
            onChange={(event) => form.setFieldValue('bookType', event.currentTarget.value)}
          />
          <TextInput
            color="white"
            label="Author"
            placeholder="Author"
            readOnly={!onEditState}
            required={onEditState}
            size="md"
            value={form.values.author}
            onChange={(event) => form.setFieldValue('author', event.currentTarget.value)}
          />
          <TextInput
            color="white"
            label="Accession Number"
            placeholder="Accession Number"
            readOnly={!onEditState}
            required={onEditState}
            size="md"
            value={form.values.accessionNumber}
            onChange={(event) => form.setFieldValue('accessionNumber', event.currentTarget.value)}
          />
          <TextInput
            color="white"
            label="Call Number"
            placeholder="Call Number"
            readOnly={!onEditState}
            required={onEditState}
            size="md"
            value={form.values.callNumber}
            onChange={(event) => form.setFieldValue('callNumber', event.currentTarget.value)}
          />
          <TextInput
            color="white"
            label="Publisher"
            placeholder="Publisher"
            readOnly={!onEditState}
            required={onEditState}
            size="md"
            value={form.values.publisher}
            onChange={(event) => form.setFieldValue('publisher', event.currentTarget.value)}
          />
          <TextInput
            color="white"
            label="Keywords"
            placeholder="Keywords"
            readOnly={!onEditState}
            required={onEditState}
            size="md"
            value={form.values.keywords}
            onChange={(event) => form.setFieldValue('keywords', event.currentTarget.value)}
          />
          <Stack>
            <Flex align="center" gap="xl" justify="space-between" wrap="wrap">
              {renderDatePicker}
              <S.SwitchWrapper>
                <Switch
                  checked={isBookAvailable}
                  label="Status"
                  labelPosition="left"
                  offLabel="Unavailable"
                  readOnly={!onEditState}
                  required={onEditState}
                  size="lg"
                  onChange={toggleStatus}
                  onLabel="Available"
                />
              </S.SwitchWrapper>
            </Flex>
          </Stack>
          {onEditState && (
            <Button
              mt="lg"
              styles={{
                root: { backgroundColor: '#2148C0' },
              }}
              type="submit"
              onClick={() => handleConfirm()}
            >
              Save Changes
            </Button>
          )}
        </Stack>
      </form>
    </Modal>
  );
}

export default BookModal;