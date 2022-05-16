import React, { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
    const [name, setName] = useState('')

    // useEffect(() => {
    //     ;(async () => {
    //         const response = await fetch('http://localhost:3000/api/user', {
    //             headers: { 'Content-Type': 'application/json' },
    //             credentials: 'include',
    //         })
    //         const content = await response.json()
    //         setName(content.name)
    //     })()
    // })

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar name={name} setName={setName} />
                <Routes>
                    <Route path="/" element={<Home name={name} />} />
                    <Route
                        path="/login"
                        element={<Login setName={setName} />}
                    />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
