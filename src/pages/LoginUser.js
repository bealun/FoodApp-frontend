import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useDispatch } from 'react-redux'
import swal from 'sweetalert'
import { user } from '../reducers/user'
import { ShareButton } from '../components/Button/ShareButton'

const loginURL = 'https://grymt-food-app.herokuapp.com/login'

export const LoginForm = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()

  // Trigger POST req when logging in
  // Save accesstoken and userId in Redux
  // Validation with SweetAlert
  // Pushed to login page if validated
  const handleSignup = (event) => {
    event.preventDefault()

    fetch(loginURL, {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (!res.ok) {
          setUserName('')
          setPassword('')
          swal({
            text: 'Something went wrong',
            icon: 'error',
            button: {
              text: 'Try again'
            }
          })
        } else {
          return res.json()
        }
      })
      .then(({ accessToken, userID }) => {
        if (accessToken) {
          dispatch(user.actions.login())
          dispatch(user.actions.access(accessToken))
          dispatch(user.actions.userId(userID))
          history.push('/profile')
        }
      })
      .catch((err) => console.log('errors', err))
  }

  return (
    <UserForm onSubmit={handleSignup}>
      <LoginTitle>Login</LoginTitle>
      <SignupLabel>
        User name:
        <InputField
          required
          type="text"
          onChange={(event) => setUserName(event.target.value)}
          value={userName}
          placeholder="Your name" />
      </SignupLabel>

      <SignupLabel>
        Password:
        <InputField
          required
          minLength="5"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          placeholder="******" />
      </SignupLabel>

      <ShareButton buttonName="Login" />
    </UserForm>
  )
}

const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #FFFBFA;
  border-radius: 20px;
  margin: 0px 10px;
  padding: 10px;
  `

const LoginTitle = styled.h2`
  font-family: 'Circular', sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  color: #8DCAC7;
`

const SignupLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 10px;
  color: #295284;
`

const InputField = styled.input`
  width: 200px;
  padding: 10px;
  background: #F3DDD4;
  color: #F56C54;
  border-radius: 2px;
  font-family: 'Circular', sans-serif;
  border: none;
  transition: 0.2s ease-in-out;

  &:hover {
    background: #FDE9E0;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: 'Circular', sans-serif;
    color: #F56C54;
  }
  :-ms-input-placeholder {
    color: #F56C54;
    font-family: 'Circular', sans-serif;
  }

  &:focus {
    outline: 2px solid #F56C54;
  }
  `