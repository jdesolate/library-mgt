/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { addDoc } from 'firebase/firestore';
import { useState } from 'react';
import swal from 'sweetalert';

import { requestRef } from '../../../constants/firebaseRefs';

import RequestStatus from '../../../enums/RequestStatus.enum';
import SweetAlertEnum from '../../../enums/SweetAlert.enum';
import formatDate from '../../../utils/Date';

import * as S from '../styles';

type BookDetail = {
  bookId: string;
  bookTitle: string;
};

type Props = {
  isUserStudent: boolean;
  isBookAvailable: boolean;
  bookDetails: BookDetail;
  userEmail: string;
};

function BookRequestForm(props: Props) {
  const {
    isUserStudent, isBookAvailable, bookDetails, userEmail,
  } = props;
  const [onEditRequest, setOnEditRequest] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      returnDate: '',
    },
  });

  async function saveRequest() {
    try {
      const newRequestDetails = {
        bookId: bookDetails.bookId,
        bookTitle: bookDetails.bookTitle,
        email: userEmail,
        returnDate: form.values.returnDate,
        status: RequestStatus.PENDING,
      };
      const docRef = await addDoc(requestRef, newRequestDetails);

      if (docRef) {
        swal('Request', 'Successfully sent request. Please wait for the admin to confirm your request.', SweetAlertEnum.SUCCESS);
        setOnEditRequest(!onEditRequest);
      }
    } catch (e) {
      swal('Request', 'Failed to send request.', SweetAlertEnum.ERROR);
    }
  }

  const handleConfirmRequest = async () => {
    const isConfirmed = await swal('Are you sure?', {
      buttons: {
        cancel: true,
        confirm: true,
      },
    });

    if (isConfirmed) {
      saveRequest();
    }
  };

  const renderRequestBookFormButton = isUserStudent && isBookAvailable && !onEditRequest && (
    <Button
      fullWidth
      mt="lg"
      styles={{
        root: { backgroundColor: '#2148C0' },
      }}
      type="submit"
      onClick={() => setOnEditRequest(!onEditRequest)}
    >
      Request Book
    </Button>
  );

  const renderRequestBookConfirmButton = isUserStudent && isBookAvailable && onEditRequest && (
    <Button
      fullWidth
      mt="lg"
      styles={{
        root: { backgroundColor: '#2148C0' },
      }}
      onClick={handleConfirmRequest}
    >
      Confirm Request
    </Button>
  );

  const renderRequestForm = onEditRequest && (
    <form onSubmit={form.onSubmit(handleConfirmRequest)}>
      <S.DatePickerContainer>
        <label htmlFor="datePicker">Return Date</label>
        <input
          required
          className="datePickerInput"
          name="datePicker"
          type="date"
          value={formatDate(form.values.returnDate)}
          onChange={(event) => form.setFieldValue('returnDate', event.currentTarget.value)}
        />
      </S.DatePickerContainer>
      {renderRequestBookConfirmButton}
    </form>
  );

  return (
    <Paper>
      {renderRequestBookFormButton}
      {renderRequestForm}
    </Paper>
  );
}

export default BookRequestForm;
