import CustomButton from './styles';

type Props = {
  text: string;
  onClick: () => void;
};

function Button(props: Props) {
  const { text, onClick } = props;

  return (
    <div>
      <CustomButton onClick={onClick}>{text}</CustomButton>
    </div>
  );
}

export default Button;
