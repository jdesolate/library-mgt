import { Navigate } from 'react-router-dom';

import routes from '../../constants/routes';
import { useAuth } from '../../contexts/AuthContext';

type Props = {
  children: JSX.Element,
};

export default function ProtectedRoute(props: Props) {
  const { children } = props;
  const {
    firebaseUserDetails,
    loadingFirebaseUserDetails,
    loadingUserDetails,
  } = useAuth();

  if (loadingFirebaseUserDetails) {
    return <div>LOADING Firebase User Details....</div>;
  }

  if (!firebaseUserDetails) {
    return <Navigate to={routes.HOME} />;
  }

  if (loadingUserDetails) {
    return <div>LOADING User Details....</div>;
  }

  return children;
}
