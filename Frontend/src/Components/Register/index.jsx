import {
    Avatar,
    Container,
    FormControlLabel,
    Paper,
    TextField,
    Typography,
    Checkbox,
    Button,
    Grid,
  } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
  
const RegisterPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ username: '', email: '' });
    
    const validate = () => {
        let valid = true;
        const newErrors = { username: '', email: '' };

        if (username.trim().length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch("http://localhost:3001/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem("token", data.token);

                    navigate("/");
                } else {
                    console.error("Login failed:", data.error);
                }       
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Container maxWidth="xs">
            <Paper elevation={10} sx={{ marginTop: 30, padding: 2 }}>
                <Avatar
                sx={{
                    mx: "auto",
                    bgcolor: "secondary.main",
                    textAlign: "center",
                    mb: 1,
                }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        placeholder="Enter username"
                        fullWidth
                        required
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={!!errors.username}
                        helperText={errors.username}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        placeholder="Enter gmail"
                        fullWidth
                        required
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        placeholder="Enter password"
                        fullWidth
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                        Sign Up
                    </Button>
                </form>
                <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                    <Grid item sx={{ 
                        marginTop: 2, 
                        marginBottom: 2, 
                        cursor: "pointer" 
                    }}>
                        <Link to="/login">
                            Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default RegisterPage;