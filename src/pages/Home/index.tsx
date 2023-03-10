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

import { Button, PageContainer } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import AccountType from '../../enums/AccountType.enum';

import * as S from './styles';

enum ButtonType {
  LOGIN = 'Log in',
  SIGNUP = 'Sign up',
}

export default function Home() {
  const [type, toggle] = useToggle(['login', 'register']);
  const authContext = useAuth();
  const isTypeRegister = type === 'register';
  const toggleAuthText = isTypeRegister ? ButtonType.LOGIN : ButtonType.SIGNUP;
  const submitButtonText = !isTypeRegister ? ButtonType.LOGIN : ButtonType.SIGNUP;
  const toggleAuthDesc = isTypeRegister ? 'Already have an account?' : 'Don\'t have an account?';

  const form = useForm({
    initialValues: {
      accountType: '',
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

  async function handleRegister() {
    console.log('Registering!');
    const userCredentials = await authContext?.register(form.values.email, form.values.password);

    if (userCredentials?.user) {
      authContext?.verify(userCredentials.user);
      authContext?.logout();
    }
  }

  async function handleLogin() {
    console.log('Logging IN!');

    await authContext?.login(form.values.email, form.values.password);
  }

  if (authContext?.user && isTypeRegister) {
    toggleAuth();
  } else if (authContext?.user?.emailVerified) {
    // route to appropriate dashboard for admin or user
  }

  const renderForgotPassword = !isTypeRegister && (
    <Group position="right">
      <Anchor<'a'>
        color="white"
        size="sm"
        type="button"
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
      onChange={(value: string) => form.setFieldValue('accountType', value)}
    />
  );

  function handleAuth() {
    if (isTypeRegister) {
      handleRegister();
    } else {
      handleLogin();
    }
  }

  return (
    <PageContainer>
      <Overlay opacity={0.85} zIndex={0}>
        <Image alt="school background" height="100vh" src="src/assets/school_bg.png" />
      </Overlay>
      <S.LogoContainer>
        <img alt="school logo" className="logo" src="src/assets/school_logo.png" />
      </S.LogoContainer>
      <S.Title>LCCL Book Availability System</S.Title>
      <S.HomeButtonContainer>
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
      </S.HomeButtonContainer>
    </PageContainer>
  );
}
