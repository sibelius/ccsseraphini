import { Error } from 'components/Error';

export default function Custom500() {
  return <Error errorCode="500" message="Internal server error!" />;
}
