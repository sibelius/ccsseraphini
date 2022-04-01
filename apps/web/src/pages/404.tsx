import { Error } from 'components/Error';

export default function Custom404() {
  return <Error errorCode="404" message="Page not found!" />;
}
