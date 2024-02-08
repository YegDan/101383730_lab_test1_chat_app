import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/users/signup', formData)
        .then(res => {
            if(res.status === 201) {
                console.log('User created')
            }else {
                console.log(`Status: ${res.status}`)
            }
        })
        .catch(err => {
            console.log(err)
        })
        
    }

  return (
    <>
    <h1>Signup</h1>
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
    

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </>
  )
}
