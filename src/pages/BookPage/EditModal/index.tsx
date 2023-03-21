/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Image, Modal, Stack, Flex, Switch, Text, TextInput, Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  doc, DocumentData, updateDoc,
} from 'firebase/firestore';
import { useState } from 'react';

import swal from 'sweetalert';

import { db } from '../../../configs/firebaseConfig';
import SweetAlertEnum from '../../../enums/SweetAlert.enum';

import formatDate from '../../../utils/Date';
import * as S from '../styles';

type Props = {
  book: DocumentData | null | undefined;
  isOpen: boolean;
  isStatusUpdated: boolean;
  onCloseModal: () => void;
  onStatusUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditModal(props: Props) {
  const {
    book, isOpen, isStatusUpdated, onCloseModal, onStatusUpdate,
  } = props;
  const [isBookAvailable, setIsBookAvailable] = useState<boolean>(book?.status === 'Available');

  const form = useForm({
    initialValues: {
      returnDate: '',
      status: isBookAvailable ? 'Available' : 'Unavailable',
    },
  });

  const toggleStatus = () => {
    setIsBookAvailable(!isBookAvailable);

    form.setFieldValue('status', !isBookAvailable ? 'Available' : 'Unavailable');
  };

  const toggleCloseModal = () => {
    form.reset();
    onCloseModal();
  };

  async function saveChanges() {
    try {
      await updateDoc(doc(db, 'book', book?.accessionNumber), {
        returnDate: form.values.returnDate,
        status: form.values.status,
      });
      onStatusUpdate(!isStatusUpdated);
      swal('Update', 'Successfully saved changes.', SweetAlertEnum.SUCCESS);
      form.reset();
      onCloseModal();
    } catch (e) {
      swal('Update', 'Failed to save change.', SweetAlertEnum.ERROR);
    }
  }

  const renderDatePicker = !isBookAvailable && (
    <S.DatePickerContainer>
      <label htmlFor="datePicker">Return Date</label>
      <input
        className="datePickerInput"
        name="datePicker"
        placeholder={formatDate(book?.returnDate)}
        required={!isBookAvailable}
        type="date"
        value={form.values.returnDate}
        onChange={(event) => form.setFieldValue('returnDate', event.currentTarget.value)}
      />
    </S.DatePickerContainer>
  );

  return (
    <Modal
      centered
      opened={isOpen}
      title=" "
      onClose={toggleCloseModal}
    >
      <Stack spacing="sm">
        <Image
          withPlaceholder
          alt="With custom placeholder"
          fit="contain"
          height={200}
          my="md"
          src={book?.imageUrl}
        />
        <TextInput
          readOnly
          color="white"
          label="Title"
          placeholder="Title"
          size="md"
          value={book?.title}
        />
        <TextInput
          readOnly
          color="white"
          label="Author"
          placeholder="Author"
          size="md"
          value={book?.author}
        />
        <TextInput
          readOnly
          color="white"
          label="Accession Number"
          placeholder="Accession Number"
          size="md"
          value={book?.accessionNumber}
        />
        <TextInput
          readOnly
          color="white"
          label="Call Number"
          placeholder="Call Number"
          size="md"
          value={book?.callNumber}
        />
        <TextInput
          readOnly
          color="white"
          label="Publisher"
          placeholder="Publisher"
          size="md"
          value={book?.publisher}
        />
        <TextInput
          readOnly
          color="white"
          label="Keywords"
          placeholder="Keywords"
          size="md"
          value={book?.keywords?.map((keyword: string) => keyword)?.join(', ')}
        />
        <form onSubmit={form.onSubmit(saveChanges)}>
          <Stack>
            <Text>Edit fields below</Text>
            <Flex align="center" gap="xl" justify="start" wrap="wrap">
              {renderDatePicker}
              <S.SwitchWrapper>
                <Switch
                  checked={isBookAvailable}
                  label="Status"
                  labelPosition="left"
                  offLabel="Unavailable"
                  size="lg"
                  onChange={toggleStatus}
                  onLabel="Available"
                />
              </S.SwitchWrapper>
            </Flex>
            <Button
              mt="lg"
              styles={{
                root: { backgroundColor: '#2148C0' },
              }}
              type="submit"
            >
              Save Status
            </Button>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
}

export default EditModal;
