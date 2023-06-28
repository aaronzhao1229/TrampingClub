import Form from 'react-bootstrap/Form'
import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form'
import { login } from '../../app/apis/userApi'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from './authSlice'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
  })

  async function onSubmit(values) {
    try {
      const username = values.username
      const userData = await login(values)
      dispatch(setCredentials({ ...userData, username }))
      navigate(location.state?.from || '/')
    } catch (error) {
      if (!error.response) {
        toast.error('No server response')
      } else if (error.response.status === 400) {
        toast.error('Missing Username or Password')
      } else if (error.response.status === 401) {
        toast.error('Unauthorized')
      } else {
        toast.error('Login Failed')
      }
    }
  }
  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            {...register('username', {
              required: 'Username is required',
            })}
          />
          {errors.username && (
            <Form.Text className="text-danger">
              {errors.username.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!isValid}>
          {isSubmitting ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            'Submit'
          )}
        </Button>
      </Form>
    </Container>
  )
}