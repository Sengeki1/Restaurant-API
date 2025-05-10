import { useState, useEffect } from 'react';
import { TextField, Box, Grid } from '@mui/material'
import { ButtonComponent } from './UI-Extended/Button';
import { CardComponent } from './UI-Extended/Card';
import NavBar from '../../UI/Header/NavBar';

function DashboardAdminPage () {

    const [user, setUser] = useState({id: 1, name: "User"});
    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [currentEditUser, setCurrentEditUser] = useState({id: 1, name: "User"});

    useEffect(() => {
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
            console.log(users);
        }
    }, []);

    useEffect(() => {
        if (users.length > 0) localStorage.setItem('users', JSON.stringify(users));
        const savedUsers = localStorage.getItem('users');
        console.log(savedUsers);
    }, [users]);

    const handleAddUser = () => {
        if (!edit) {
            setUsers(prev => [...prev, user]);
        } else {
            setUsers(prev => 
                prev.map(prev_user => prev_user.id === currentEditUser.id ? user : prev_user)
            );
            setEdit(false);
        }
    }

    const handleUser = (type, _user) => {
        if (type === "Remove") {
            setUsers(users.filter(user => user.id !== _user.id));
        }
        if (type === "Edit") {
            setCurrentEditUser(_user);
            setInputValue(_user.name)
            setEdit(true);
        }
    }

    const resetInput = () => {
        setInputValue('');
    };

    return (
        <div>
            <NavBar/>
            <div className="App" align="center">
                <Grid
                    sx={{
                        position: "relative",
                        width: "90%",
                        display: "flex",
                        flexDirection: "row",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        minHeight: "90vh",
                    }}
                >
                    <TextField 
                        sx={{
                            width: "30%", 
                        }}
                        id="outlined-basic" 
                        label="User" 
                        variant="outlined" 
                        value={inputValue}
                        onChange={(event) => {
                            const value = event.target.value;
                            setInputValue(value);
                            setUser(
                                { id: Math.random(), name: value }
                            );
                        }}
                    />
                    <ButtonComponent type="Add" handleUser={handleAddUser} resetInput={resetInput}/> 
                    <Box sx={{
                        border: "1px solid black",
                        borderRadius: "15px",
                        width: "90%",
                        height: "600px",
                        overflowY: "scroll",
                        marginLeft: "35px"
                    }}>
                        <CardComponent handleUser={handleUser} users={users}/>
                    </Box>
                </Grid>
            </div>
        </div>
    );
}

export default DashboardAdminPage;