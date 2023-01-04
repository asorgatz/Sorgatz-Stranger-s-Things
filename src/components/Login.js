import React, { useState } from 'react';
import { exchangeTokenForUser } from '../api/';

const Login = (props) => {
  // const exchangeTokenForUser = props.exchangeTokenForUser
  const user = props.user
  const setUser = props.setUser
  const setToken = props.setToken
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (ev) => {
    ev.preventDefault()
    try {
      fetch(
        'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              username: username,
              password: password,
            },
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          const token = result.data.token;
          window.localStorage.setItem('token', token);
          setToken(token);
          console.log(token)
        })
    } catch (error) {
      console.error(error)
    }
  };


  return (
    <form onSubmit={login}>
      <input
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        placeholder="password"
        type='password'
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button disabled={!username || !password}>Login</button>
    </form>
  );
}

export default Login