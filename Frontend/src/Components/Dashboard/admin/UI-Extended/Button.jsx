import { Button } from '@mui/material'

export function ButtonComponent({type, handleUser, resetInput, user}) {
    return (
        type !== "Add" ? (
            <Button 
                variant="outlined" 
                sx={{
                    width: "100%",
                    height: "56px"
                }}
                onClick={() => {handleUser(type, user)}}
            >
                {type}
            </Button>
        ) : (
            <Button 
                variant="outlined" 
                sx={{
                    width: "11.3%",
                    height: "56px"
                }}
                onClick={() => {handleUser(type, user); resetInput();}}
            >
                {type}
            </Button>
        )
    );
};