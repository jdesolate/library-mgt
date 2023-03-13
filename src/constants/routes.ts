const HOME = '/';
const LIBRARY = '/books';
const FORBIDDEN_PAGE = '/error';

export const NAMED_ROUTES = [
  { name: 'Home', path: HOME },
  { name: 'Library', path: LIBRARY },
  { name: 'Error', path: FORBIDDEN_PAGE },
];

export default {
  FORBIDDEN_PAGE,
  HOME,
  LIBRARY,
};
