import React from 'react';
import { 
  Grid,
  Paper,
  Typography,
  ButtonBase,
} from '@mui/material';

export default function Card(props) {
    let id = props.id;
  return (
    (id < 4 ?
    <Paper
      sx={{
        p: 1,
        m: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        marginBottom: 5
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
              src="./Images/Card/image 12.png"
              style={{
                margin: 'auto',
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {props.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">$19.00</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper> 
    : <div></div>)
  );
}
