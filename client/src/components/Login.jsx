import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/users/login', formData)
        .then(res => {
            if(res.status === 200) {
                console.log('User logged in')
                const token = res.data.token
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
    <h1>Login</h1>
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

    </>
  )
}
