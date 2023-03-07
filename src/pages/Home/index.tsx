import {
  Overlay, Image, Anchor, Group, Stack, PasswordInput, TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { Button, PageContainer } from '../../components';

import * as S from './styles';

export default function Home() {
  const navigate = useNavigate();

  function navigateToUrl(url: string) {
    if (url === 'registration') {
      navigate(`/${url}`);
    } else {
      navigate(`/login/${url}`);
    }
  }

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  function handleLogin() {
    console.log(form.values.email, form.values.password);
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
        <form onSubmit={form.onSubmit(handleLogin)}>
          <Stack spacing="md">
            <TextInput
              required
              error={form.errors.email && 'Invalid email'}
              placeholder="EMAIL ADDRESS"
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
              placeholder="PASSWORD"
              size="md"
              type="password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue(
                'password',
                event.currentTarget.value,
              )}
            />
            <Group position="right">
              <Anchor<'a'>
                size="sm"
                type="button"
              >
                Forgot password?
              </Anchor>
            </Group>
            <Button text="LOG IN" type="submit" />
            <S.FlexRow>
              <p>Don&apos;t have an account?</p>
              <S.SignUpButton onClick={() => navigateToUrl('registration')}>Sign up</S.SignUpButton>
            </S.FlexRow>
          </Stack>
        </form>
      </S.HomeButtonContainer>
    </PageContainer>
  );
}
