import React from 'react';

import { useAuth } from '../../contexts/AuthContext';

function BookPage() {
  const auth = useAuth();
  const handleLogout = () => auth.logout();

  return (
    <div>
      <h1>BookPage</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default BookPage;
