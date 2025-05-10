import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import './Header.css'
import { Menu, MenuItem, IconButton  } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { logOut, isAuthenticated } from '../../PrivateRoute';

export default function NavBar () {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [menuItem, setMenuItem] = useState();
    const [children, setChildren] = useState(Fragment);
  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        localStorage.removeItem('token');
        setAnchorEl(null);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDashboard = () => {
        const auth = isAuthenticated();

        if (auth.role === "user") {
            setChildren(
                <Link to={"/dashboard"}>
                    <h3>
                        Dashboard
                    </h3>
                </Link>
            );
        } else {
            setChildren(
                <Link to={"/dashboard-admin"}>
                    <h3>
                        Dashboard
                    </h3>
                </Link>
            );
        }
    }

    useEffect(() => {
        handleDashboard();
        setMenuItem(logOut());
    }, []);
    
    return (
        <div className='header'>
            <Link to={"/"}>
                <HomeIcon className='icon'/>
            </Link>
            {children}
            <IconButton onClick={handleClick} sx={{
                position: "absolute",
                right: "30px",
                top: "12px",
                fontSize: "25px",
                color: "black",
                cursor: "pointer"
            }}>
                <AccountCircleIcon/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
            >
                    <MenuItem onClick={handleClose}>
                        {menuItem}
                    </MenuItem>
            </Menu>
        </div>
    )
}