import { Button } from '@mui/material'

export function ButtonComponent({type, handleDish, dish}) {
    return (
        type !== "Add" ? (
            <Button 
                variant="outlined" 
                sx={{
                    width: "100%",
                    height: "80px"
                }}
                onClick={() => {handleDish(type, dish)}}
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
                onClick={() => {handleDish(type, dish)}}
            >
                {type}
            </Button>
        )
    );
};