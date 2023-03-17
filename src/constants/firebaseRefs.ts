import { collection } from 'firebase/firestore';

import { db } from '../configs/firebaseConfig';

const bookRef = collection(db, 'book');
const userRef = collection(db, 'user');

export { bookRef, userRef };
