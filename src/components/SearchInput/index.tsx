import {
  TextInput, TextInputProps, ActionIcon, useMantineTheme,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

function SearchInput(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      placeholder="Search for a book here"
      radius="xl"
      rightSection={(
        <ActionIcon color={theme.primaryColor} radius="xl" size={32} variant="filled">
          <IconSearch size="1.1rem" stroke={1.5} />
        </ActionIcon>
      )}
      rightSectionWidth={42}
      {...props}
    />
  );
}

export default SearchInput;
