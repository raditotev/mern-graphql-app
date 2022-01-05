import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/auth-hook';

import { sendQuery } from '../helpers/client';

const AuthPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const emailInput = useRef();
  const passwordInput = useRef();
  const history = useHistory();

  const { login } = useAuth();

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    if (email.trim() === '' || password.trim() === '') {
      return;
    }

    let query = {
      query: `
        mutation createUser($email: String!, $password: String!) {
          createUser(user: {email: $email, password: $password}) {
            _id
            email
          }
        }
      `,
      variables: {
        email,
        password,
      },
    };

    if (isLoginForm) {
      query = {
        query: `
          query loginUser($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              userId
              token
              tokenExpiration
            }
          }
        `,
        variables: {
          email,
          password,
        },
      };
    }

    const data = await sendQuery(query);

    if (isLoginForm) {
      const { userId, token, tokenExpiration } = data.login;
      login(token, userId, tokenExpiration);
      history.push('/events');
    }
  };

  const authenticationTypeHandler = () => {
    setIsLoginForm((state) => !state);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">E-Mail</label>
        <input ref={emailInput} type="email" name="email" />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input ref={passwordInput} type="password" name="password" />
      </div>
      <div className="form-actions">
        <button type="button" onClick={authenticationTypeHandler}>
          {isLoginForm ? 'Switch to Register' : 'Switch to Login'}
        </button>
        <button type="submit">{isLoginForm ? 'Login' : 'Sign up'}</button>
      </div>
    </form>
  );
};

export default AuthPage;
