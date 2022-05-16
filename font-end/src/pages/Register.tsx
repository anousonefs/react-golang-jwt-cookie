import { Paper, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

interface loginForm {
    name: string
    email: string
    password: string
}

const Register = () => {
    const [loginForm, setLoginForm] = useState<loginForm>({
        name: '',
        email: '',
        password: '',
    })
    const [redirect, setRedirect] = useState(false)

    const onTextChange = (e: any) => {
        e.preventDefault()
        const { name, value } = e.target
        console.log(name, value)
        setLoginForm({ ...loginForm, [name]: value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginForm),
        })
        const content = await response.json()
        console.log(content)
        setRedirect(true)
    }
    const handleReset = () =>
        setLoginForm({ name: '', email: '', password: '' })

    if (redirect) {
        return (
            <>
                <Navigate to="/login" replace />
            </>
        )
    }

    return (
        <Paper>
            <h2>Register Form</h2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%',
                    margin: '0 auto',
                }}
            >
                <TextField
                    onChange={onTextChange}
                    value={loginForm.name}
                    name="name"
                    label={'Name'} //optional
                />
                <br />
                <TextField
                    onChange={onTextChange}
                    value={loginForm.email}
                    name="email"
                    label={'email'} //optional
                />
                <br />
                <TextField
                    onChange={onTextChange}
                    value={loginForm.password}
                    name="password"
                    label={'password'} //optional
                    type="password"
                />

                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={handleReset}>Reset</Button>
            </div>
        </Paper>
    )
}

export default Register
