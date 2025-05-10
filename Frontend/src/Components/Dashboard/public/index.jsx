import React, { useEffect } from "react";
import { 
    Card,
    Box,
    Button,
    Select,
    Typography,
    FormControl
} from "@mui/material";
import NavBar from "../../UI/Header/NavBar"
import { Link } from "react-router-dom";

const DashboardUserPage = () => {

  useEffect(() => {

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
          <FormControl sx={{ m: 1, width: 300 }}>
            <Typography 
              fontSize={20}
              fontWeight={"bold"}>
                Pay for food
            </Typography>
            <br/>
            <Typography>Food *</Typography>
            <Select sx={{
              height: "45px"
            }}>

            </Select>
            <br/>
            <Typography>Amount *</Typography>
            <Select sx={{
              height: "45px"
            }}>

            </Select>
            <br/>
            <Link to={"/payment"}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  width: 300
                }}
              >
                Pay
              </Button>
            </Link>
          </FormControl>
        </Card>
      </Box>
    </>
  );
}

export default DashboardUserPage;