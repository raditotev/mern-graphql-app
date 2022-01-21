import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext.inContext) {
    throw new Error(
      'Auth context is available only inside a provider. Make sure your App is wrapped in AuthContextProvider'
    );
  }

  return authContext;
};

export default useAuth;
