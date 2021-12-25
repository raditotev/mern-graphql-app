import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/auth-hook';

import './AuthPage.css';

const sendQuery = async (query) => {
  try {
    const response = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: { 'Content-Type': 'application/json' },
    });
    const { data } = await response.json();
    if (response.status !== 200 && response.status !== 201) {
      throw new Error('Failed');
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

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
      mutation {
        createUser(user: {email: "${email}", password: "${password}"}) {
          _id
          email
        }
      }
      `,
    };

    if (isLoginForm) {
      query = {
        query: `
          query {
            login(email: "${email}", password: "${password}") {
              userId
              token
              tokenExpiration
            }
          }
        `,
      };
    }

    const data = await sendQuery(query);

    if (isLoginForm) {
      const { userId, token, tokenExpiration } = data.login;
      login(userId, token, tokenExpiration);
      history.push('/events');
    }
  };

  const authenticationTypeHandler = () => {
    setIsLoginForm((state) => !state);
  };

  return (
    <form className="auth-form" onSubmit={submitHandler}>
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
