import CustomContainer from './styles';

type Props = {
  children: JSX.Element[];
};

function PageContainer(props: Props) {
  const { children } = props;

  return (
    <CustomContainer>{children}</CustomContainer>
  );
}

export default PageContainer;
