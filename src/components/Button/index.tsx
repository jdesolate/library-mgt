import { ButtonProps } from '@mantine/core/lib/Button';

import CustomButton from './styles';

type Props = ButtonProps & {
  text: string;
};

function Button(props: Props) {
  const { text, ...restProps } = props;

  return (
    <div>
      <CustomButton {...restProps}>{text}</CustomButton>
    </div>
  );
}

export default Button;
