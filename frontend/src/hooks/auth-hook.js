import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

const useAuth = (props) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      'Auth context is available only inside a provider. Make sure your App is wrapped in AuthContextProvider'
    );
  }

  return authContext;
};

export default useAuth;
