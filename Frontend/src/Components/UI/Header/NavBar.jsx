import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import './Header.css'
import { Menu, MenuItem, IconButton  } from '@mui/material';
import { useState } from 'react';

export default function NavBar () {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    return (
        <div className='header'>
            <Link to={"/"}>
                <HomeIcon className='icon'/>
            </Link>
            <Link to={"/dashboard"}>
                <h3>
                    Dashboard
                </h3>
            </Link>
            <IconButton onClick={handleClick} sx={{
                position: "absolute",
                right: "3%",
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
                onClose={handleClose}
            >
                    <MenuItem onClick={handleClose}>
                        <Link to={"/login"} style={{ textDecoration: 'none', color: 'inherit' }}>
                            Sign in
                        </Link>
                    </MenuItem>
            </Menu>
        </div>
    )
}