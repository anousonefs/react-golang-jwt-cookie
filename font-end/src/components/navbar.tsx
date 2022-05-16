import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

export default function Navbar(props: {
    name: string
    setName: (name: string) => void
}) {
    const logout = async () => {
        await fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })

        props.setName('')
    }
    let nav
    if (props.name === '') {
        nav = (
            <>
                <Button color="inherit">
                    <Link to="/login">Login</Link>
                </Button>
                <Button color="inherit">
                    <Link to="/register">Register</Link>
                </Button>
            </>
        )
    } else {
        nav = (
            <>
                <Button color="inherit" onClick={() => logout()}>
                    <Link to="/login">Logout</Link>
                </Button>
            </>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Link to="/">
                            <MenuIcon />
                        </Link>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        News
                    </Typography>
                    {/* <Button color="inherit">
                        <Link to="/login">Login</Link>
                    </Button> */}
                    {nav}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
