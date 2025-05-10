import { ButtonComponent } from './Button';
import { Box, Card, CardMedia, Typography } from '@mui/material'

export function CardComponent({handleDish, dishes}) {
    return (
        dishes.map(dish => {
            return (
                <div>
                    <Box
                        sx={{
                            position: "relative",
                            width: "90%",
                            display: "flex",
                            flexDirection: "row",
                            textAlign: "center",
                            justifyContent: "center",
                            marginTop: "25px",
                            marginBottom: "25px",
                            marginLeft: "30px",
                            marginRight: "25px"
                        }} 
                    >
                        <Card 
                            variant="outlined"
                            sx={{
                                position: "relative",
                                width: "50%",
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center",
                            }} 
                            >
                            <CardMedia
                                sx={{ 
                                    height: 80,
                                 }}
                                image="/Images/1.jpg"
                                title="User"
                            />
                            <Typography
                                sx={{

                                }}
                            >
                                {dish.name}
                            </Typography>
                            <Typography
                                sx={{
                                    
                                }}
                            >
                                {dish.price}
                            </Typography>
                        </Card>
                        <Card 
                            variant="outlined"
                            sx={{
                                position: "relative",
                                width: "20%",
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center",
                            }} 
                            >
                            <ButtonComponent type="Edit" handleDish={handleDish} dish={dish}/>
                            <ButtonComponent type="Remove" handleDish={handleDish} dish={dish}/>
                        </Card>
                    </Box>
                </div>
            )
        })
    );
};