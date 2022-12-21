import React, { useState } from 'react';

const Register = () => {

    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const register = (ev)=> {
        ev.preventDefault();
        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/register', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: {
              username: registerUsername,
              password: registerPassword 
            }
          })
        })
        .then(response => response.json())
        .then(result => console.log(result))
      }

    return(
        <form onSubmit = { register }>
          <input
            placeholder='username'
            value={ registerUsername }
            onChange = { ev => {setRegisterUsername(ev.target.value)}
            }
          />
          <input 
            placeholder='password'
            value={ registerPassword }
            onChange = { ev => setRegisterPassword(ev.target.value)}
          />
          <button>Register</button>
        </form>
    )
}

export default Register