import { Paper, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

interface loginForm {
    email: string
    password: string
}

const Login = (props: { setName: (name: string) => void }) => {
    const [loginForm, setLoginForm] = useState<loginForm>({
        email: '',
        password: '',
    })
    const [navigation, setNavigation] = useState(false)
    const onTextChange = (e: any) => {
        e.preventDefault()
        const { name, value } = e.target
        console.log(name, value)
        setLoginForm({ ...loginForm, [name]: value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(loginForm),
        })
        const content = await response.json()
        setNavigation(true)
        props.setName(content.user.name)
    }
    if (navigation) {
        return (
            <>
                <Navigate to="/" replace />
            </>
        )
    }
    const handleReset = () => setLoginForm({ email: '', password: '' })

    return (
        <Paper>
            <h2>Login Form</h2>
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

export default Login
