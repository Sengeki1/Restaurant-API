import React, { useEffect, useState } from "react";
import { 
    Card,
    Box,
    Button,
    Select,
    Typography,
    FormControl,
    MenuItem
} from "@mui/material";
import NavBar from "../../UI/Header/NavBar"
import { Link, useNavigate } from "react-router-dom";

const DashboardUserPage = () => {

  const [orders, setOrders] = useState([]);
  const [selectedAmmount, setSelectedAmmount] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const ammount = [1, 2, 3, 4];
  const navigate = useNavigate();

  const ITEM_HEIGHT = 48;
  const MAX_ITEMS = 4;
  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * MAX_ITEMS,
      },
    },
  };

  const getOrders = async () => {
    const response = await fetch("http://localhost:3001/menu");

    setOrders(await response.json());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedAmmount);
    console.log(selectedFood);
    if (selectedAmmount !== "" && selectedFood !== "") {
      navigate("/payment");
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <NavBar/>
      <Box
        sx={{
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      > 
        <Card
          sx={{
            width: "330px",
            border: "1px solid gray",
            borderRadius: "15px",
            paddingTop: "25px",
            paddingBottom: "25px",
            paddingLeft: "5px",
            paddingRight: "5px",
            boxShadow: 3
          }}
        >
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <Typography 
                fontSize={20}
                fontWeight={"bold"}>
                  Pay for food
              </Typography>
              <br/>
              <Typography>Food *</Typography>
              <Select 
                sx={{
                  height: "45px"
                }}
                MenuProps={menuProps}
                onChange={(event) => setSelectedFood(event.target.value)}
              >
                {orders.map((order, index) => (
                  <MenuItem key={index} value={order.name}>
                    {order.name}
                  </MenuItem>
                ))}
              </Select>
              <br/>
              <Typography>Amount *</Typography>
              <Select 
                sx={{
                  height: "45px"
                }}
                onChange={(event) => setSelectedAmmount(event.target.value)}
              >
                {ammount.map((index) => (
                  <MenuItem value={index}>
                    {index}
                  </MenuItem>
                ))}
              </Select>
              <br/>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{
                    width: 300
                  }}
                >
                  Pay
                </Button>
            </FormControl>
          </form>
        </Card>
      </Box>
    </>
  );
}

export default DashboardUserPage;