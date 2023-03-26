const HOME = '/';
const BOOKS = '/books';
const FORBIDDEN_PAGE = '/error';
const REQUESTS = '/requests';

export const NAMED_ROUTES = [
  { name: 'Home', path: HOME },
  { name: 'Books', path: BOOKS },
  { name: 'Requests', path: REQUESTS },
  { name: 'Error', path: FORBIDDEN_PAGE },
];

export default {
  BOOKS,
  FORBIDDEN_PAGE,
  HOME,
  REQUESTS,
};
