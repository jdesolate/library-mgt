import {
  Overlay,
  Image,
  Anchor,
  Group,
  Stack,
  PasswordInput,
  TextInput,
  Text,
  Flex,
  Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import { IconLock, IconUser, IconUserEdit } from '@tabler/icons-react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SchoolBG from '../../assets/school_bg.png';
import SchoolLogo from '../../assets/school_logo.png';

import { Button, PageContainer } from '../../components';
import routes from '../../constants/routes';
import { useAuth } from '../../contexts/AuthContext';
import AccountType from '../../enums/AccountType.enum';

import ForgotPassword from './ForgotPassword';

import * as S from './styles';

enum ButtonType {
  LOGIN = 'Log in',
  SIGNUP = 'Sign up',
}

export default function Home() {
  const [type, toggle] = useToggle(['login', 'register']);
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState<boolean>(false);
  const authContext = useAuth();
  const navigate = useNavigate();
  const isTypeRegister = type === 'register';
  const toggleAuthText = isTypeRegister ? ButtonType.LOGIN : ButtonType.SIGNUP;
  const submitButtonText = !isTypeRegister ? ButtonType.LOGIN : ButtonType.SIGNUP;
  const toggleAuthDesc = isTypeRegister ? 'Already have an account?' : 'Don\'t have an account?';

  const form = useForm({
    initialValues: {
      accountType: AccountType.student,
      email: '',
      password: '',
    },

    validate: {
      accountType: (val) => (val.length <= 1 ? 'Please indicate the account type' : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const toggleAuth = () => {
    toggle();
    form.reset();
  };

  const toggleForgotPassword = () => {
    setIsForgotPasswordClicked((previousValue) => !previousValue);
  };

  async function handleRegister() {
    const userCredentials = await authContext?.register(form.values.email, form.values.password);

    if (userCredentials?.user) {
      authContext?.verify(userCredentials.user);
      authContext?.logout();
    }
  }

  async function handleLogin() {
    await authContext?.login(form.values.email, form.values.password);
    navigate(routes.LIBRARY);
  }

  function handleAuth() {
    if (isTypeRegister) {
      handleRegister();
    } else {
      handleLogin();
    }
  }

  if (authContext?.user && isTypeRegister) {
    toggleAuth();
  }

  const renderForgotPassword = !isTypeRegister && (
    <Group position="right">
      <Anchor<'a'>
        color="white"
        size="sm"
        type="button"
        onClick={toggleForgotPassword}
      >
        Forgot password?
      </Anchor>
    </Group>
  );

  const renderAccountTypeField = isTypeRegister && (
    <Select
      data={[AccountType.student, AccountType.admin]}
      error={form.errors.accountType
        && 'Please indicate the account type'}
      icon={<IconUserEdit color="#2148C0" />}
      placeholder="Your account type"
      value={form.values.accountType}
      onChange={(value: AccountType) => form.setFieldValue('accountType', value)}
    />
  );

  const renderForm = isForgotPasswordClicked ? (
    <ForgotPassword toggleForgotPasswordState={setIsForgotPasswordClicked} />
  ) : (
    <form onSubmit={form.onSubmit(handleAuth)}>
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
        <PasswordInput
          required
          error={
            form.errors.password
            && 'Password should include at least 6 characters'
          }
          icon={<IconLock color="#2148C0" />}
          placeholder="Password"
          size="md"
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
        />
        {renderAccountTypeField}
        {renderForgotPassword}
        <Button text={submitButtonText} type="submit" />
        <Flex justify="center">
          <Text color="white">{toggleAuthDesc}</Text>
          <S.SignUpButton onClick={toggleAuth}>{toggleAuthText}</S.SignUpButton>
        </Flex>
      </Stack>
    </form>
  );

  return (
    <PageContainer>
      <Overlay opacity={0.85} zIndex={0}>
        <Image alt="school background" height="100vh" src={SchoolBG} />
      </Overlay>
      <S.LogoContainer>
        <img alt="school logo" className="logo" src={SchoolLogo} />
      </S.LogoContainer>
      <S.Title>LCCL Book Availability System</S.Title>
      <S.HomeButtonContainer>
        {renderForm}
      </S.HomeButtonContainer>
    </PageContainer>
  );
}
