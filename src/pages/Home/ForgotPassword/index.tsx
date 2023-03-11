import {
  Stack, TextInput, Flex,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUser } from '@tabler/icons-react';

import { Button } from '../../../components';
import { useAuth } from '../../../contexts/AuthContext';

import * as S from '../styles';

type Props = {
  toggleForgotPasswordState: React.Dispatch<React.SetStateAction<boolean>>;
};

function ForgotPassword(props: Props) {
  const { toggleForgotPasswordState } = props;
  const authContext = useAuth();
  const submitButtonText = 'SEND RESET EMAIL';
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });

  async function sendForgotPasswordEmail() {
    await authContext?.reset(form.values.email);
  }

  function handleBackHome() {
    toggleForgotPasswordState(false);
  }

  return (
    <form onSubmit={form.onSubmit(sendForgotPasswordEmail)}>
      <Stack spacing="md">
        <TextInput
          required
          color="white"
          error={form.errors.email && 'Invalid email'}
          icon={<IconUser color="#2148C0" />}
          placeholder="Email Address"
          size="md"
          value={form.values.email}
          onChange={(event) => form.setFieldValue(
            'email',
            event.currentTarget.value,
          )}
        />
        <Button text={submitButtonText} type="submit" />
        <Flex justify="center">
          <S.SignUpButton onClick={() => handleBackHome()}>Back to Home</S.SignUpButton>
        </Flex>
      </Stack>
    </form>
  );
}

export default ForgotPassword;
