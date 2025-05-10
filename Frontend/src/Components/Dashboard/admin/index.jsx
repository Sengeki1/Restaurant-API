import { useState, useEffect } from 'react';
import { 
    TextField, 
    Box, 
    Grid,
    FormControl,
    Typography, 
    Button
} from '@mui/material'
import { CardComponent } from './UI-Extended/Card';
import NavBar from '../../UI/Header/NavBar';

function DashboardAdminPage () {

    const [dish, setDish] = useState({id: Math.random(), name: "", price: null, type: "cape-verdian dish"});
    const [dishes, setDishes] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentEditDish, setCurrentEditDish] = useState({id: Math.random(), name: "", price: null, type: "cape-verdian dish"});

    const getDishes = async () => {
        if (dishes.length <= 0) {
            const response = await fetch("http://localhost:3001/menu");
            setDishes(await response.json());   
        }
    }

    useEffect(() => {
        getDishes();
    });

    const handleAddDish = async () => {
        const token = localStorage.getItem("token");
        const postDish = async () => {
            await fetch("http://localhost:3001/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dish)
            });
        }

        if (!edit) {
            setDishes(prev => [...prev, dish]);
            await postDish ();
        } else {
            setDishes(prev => 
                prev.map(prev_dish => prev_dish.id === currentEditDish.id ? dish : prev_dish)
            );

            await fetch(`http://localhost:3001/orders/${currentEditDish.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dish)
            });

            setEdit(false);
        }
    }

    const handleDish = (type, _dish) => {
        const token = localStorage.getItem("token");
        const deleteDish = async () => {
            await fetch(`http://localhost:3001/orders/${_dish.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dish)
            });
        }
        if (type === "Remove") {
            setDishes(dishes.filter(dish => dish.id !== _dish.id));
            deleteDish();
        }
        if (type === "Edit") {
            setCurrentEditDish(_dish);
            setEdit(true);
        }
    }

    return (
        <div>
            <NavBar/>
            <div className="App" align="center">
                <Grid
                    sx={{
                        position: "relative",
                        width: "90%",
                        display: "flex",
                        flexGrow: 1,
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        minHeight: "90vh",
                    }}
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddDish();
                        }}
                    >
                        <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography fontSize={20} fontWeight="bold" mb={2}>
                            Add Dish
                        </Typography>

                        <TextField
                            variant="outlined"
                            label="Dish name"
                            fullWidth
                            sx={{ 
                                mb: 2,
                                width: 250
                            }}
                            value={dish.name}
                            onChange={(e) =>
                                setDish((prev) => ({ ...prev, name: e.target.value }))
                            }
                        />

                        <TextField
                            type="number"
                            label="Dish price"
                            fullWidth
                            sx={{ 
                                mb: 2,
                                width: 250,
                            }}
                            value={dish.price}
                            onChange={(e) =>
                                setDish((prev) => ({ ...prev, price: parseFloat(e.target.value) }))
                            }
                        />

                        <Button 
                            variant="contained" 
                            type="submit" 
                            size="large" 
                            fullWidth
                        >
                            {edit ? "Update Dish" : "Add Dish"}
                        </Button>
                        </FormControl>
                    </form>
                    <Box sx={{
                        border: "1px solid black",
                        borderRadius: "15px",
                        width: "70%",
                        height: "600px",
                        overflowY: "scroll",
                        marginLeft: "35px"
                    }}>
                        <CardComponent handleDish={handleDish} dishes={dishes}/>
                    </Box>
                </Grid>
            </div>
        </div>
    );
}

export default DashboardAdminPage;