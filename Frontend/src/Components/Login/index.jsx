import {
    Avatar,
    Box,
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
import { Link } from "react-router-dom";
  
const LoginPage = () => {
    const handleSubmit = () => console.log("login");
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
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    placeholder="Enter username"
                    fullWidth
                    required
                    autoFocus
                    sx={{ mb: 2 }}
                />
                <TextField
                    placeholder="Enter password"
                    fullWidth
                    required
                    type="password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                    Sign In
                </Button>
                </Box>
                <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                <Grid item sx={{ marginTop: 2, marginBottom: 2, cursor: "pointer" }}>
                    <Link to="/register">
                        Sign Up
                    </Link>
                </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default LoginPage;