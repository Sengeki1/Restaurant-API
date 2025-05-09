import * as React from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  Paper,
  TextField,
  Grid,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  FormLabel
} from '@mui/material';
import Swal from "sweetalert2"
import { useNavigate  } from "react-router-dom"

function PaymentForm() {

    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();

    const onSubmit = () => {
        showAlert();
    };

    const showAlert = () => {
        Swal.fire({
            title: "Payment Successfull!",
            icon: "success",
            draggable: false
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/');
            }
        })
    }

    return (
        <Box
        sx={{
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        > 
            <form onSubmit={handleSubmit(onSubmit)}>
                <>
                    <Container component='main' maxWidth='sm' sx={{ mb: 4, }}>
                        <Paper
                            variant='outlined'
                            sx={{ 
                                my: { xs: 3, md: 6 }, 
                                p: { xs: 2, md: 3 },
                                border: "1px solid gray",
                                boxShadow: 3
                            }}
                        >
                            <Typography component='h1' variant='h4' align='center'>
                                Payment
                            </Typography>

                            <Box sx={{ my: 3 }}>
                                <Typography variant='h6' gutterBottom>
                                    Address
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            label='First name'
                                            fullWidth
                                            variant='standard'
                                            {...register('firstName')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            label='Last name'
                                            fullWidth
                                            variant='standard'
                                            {...register('lastName')}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormLabel sx={{ textAlign: 'left' }}>Zone</FormLabel>
                                        <Select
                                            required
                                            label='Zone'
                                            fullWidth
                                            variant='standard'
                                            {...register('Zone')}
                                        >
                                            <MenuItem value='Chã de Alecrim'>Chã de Alecrim</MenuItem>
                                            <MenuItem value='Monte Sossego'>Monte Sossego</MenuItem>
                                            <MenuItem value='Ribeira Bote'>Ribeira Bote</MenuItem>
                                            <MenuItem value='Fonte Cónego'>Fonte Cónego</MenuItem>
                                            <MenuItem value='Laginha'>Laginha</MenuItem>
                                            <MenuItem value='Fonte Filipe'>Fonte Filipe</MenuItem>
                                            <MenuItem value='Alto Miramar'>Alto Miramar</MenuItem>
                                            <MenuItem value='Ribeirinha'>Ribeirinha</MenuItem>
                                            <MenuItem value='Madeiralzinho'>Madeiralzinho</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ my: 3 }}>
                            <Typography variant='h6' gutterBottom>
                                Payment method
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label='Name on card'
                                    fullWidth
                                    variant='standard'
                                    {...register('cardName')}
                                />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label='Card number'
                                    fullWidth
                                    variant='standard'
                                    {...register('cardNumber')}
                                />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label='Expiry date'
                                    fullWidth
                                    variant='standard'
                                    {...register('expDate')}
                                />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    label='CVV'
                                    helperText='Last three digits on signature strip'
                                    fullWidth
                                    variant='standard'
                                    {...register('cvv')}
                                />
                                </Grid>
                            </Grid>
                            </Box>
                            <Button
                                type='submit'
                                variant='contained'
                                sx={{ mt: 1, ml: 1 }}
                                fullWidth
                            >
                                Purchase
                            </Button>
                        </Paper>
                    </Container>
                </>
            </form>
        </Box>
    );
}

export default PaymentForm;