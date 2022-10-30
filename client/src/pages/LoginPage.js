import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"

const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const handleLogin = () => {
    // dispatch(auth.loginSuccess)
    console.log(`username ${username}`)
    console.log(`password ${password}`)
  }

  return (
    <div>
        <Form>
            <Form.Group className='mb-3'>
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={(e) => setUsername(e.target.value)} type="text" placeholder="enter username" />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="enter password" />
            </Form.Group>
            <Button onClick={handleLogin} variant="primary">
                Login
            </Button>
        </Form>
    </div>
  )
}

export default LoginPage