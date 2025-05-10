import { 
  Grid,
  Paper,
  Typography,
  ButtonBase,
} from '@mui/material';

export default function Card(props) {
  return (
    <Paper
      sx={{
        p: 1,
        m: 'auto',
        width: "450px",
        height: 150,
        marginBottom: 5,
        boxShadow: 5
      }}
    >
      <Grid container spacing={3}>
        <Grid item>
          <ButtonBase
            sx={{
              width: 128,
              height: 128,
            }}
          >
            <img
              alt="complex"
              src="./Images/1.jpg"
              style={{
                margin: 'auto',
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container sx={{
          display: "flex",
          flexDirection: "column",
        }}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" sx={{
                fontSize: 15
              }}>
                {props.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{props.price} CVE</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper> 
  );
}
