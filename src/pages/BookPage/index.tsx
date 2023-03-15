import React from 'react';

import swal from 'sweetalert';

import { useAuth } from '../../contexts/AuthContext';
import SweetAlertEnum from '../../enums/SweetAlert.enum';

function BookPage() {
  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
    swal('LOGOUT', 'You have logged out.', SweetAlertEnum.SUCCESS);
  };

  return (
    <div>
      <h1>BookPage</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default BookPage;
