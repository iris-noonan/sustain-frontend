// SignupForm.jsx

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../../services/authService'

import styles from './SignUp.module.scss';

const SignUp = ({ setUser }) => {

  // ! State
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password_confirmation: ''
  });

  // ! Location variables
  const navigate = useNavigate()

  // ! Event Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signup(formData) // sign in
      setUser(user) // set user to state
      navigate('/') // navigate to dashboard
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="name"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={formData.password_confirmation}
            name="password_confirmation"
            onChange={handleChange}
          />
        </div>
        <div className={styles.buttons}>
          <button>Sign Up</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  )
}

export default SignUp