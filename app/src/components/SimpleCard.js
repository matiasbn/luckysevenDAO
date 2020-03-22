import React from 'react';
import {
  Card, CardActions, CardContent, Button, makeStyles, Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    textAlign: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const { account, hola } = props.drizzleState;
  console.log(props.drizzleState.accounts['0']);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          LuckySeven PRNG
        </Typography>
        <Typography variant="h5" component="h2">
          Your account:
          <CardContent>
            Hola
          </CardContent>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Your random number
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          "a benevolent smile"
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button variant="contained" size="small">Get random number</Button>
      </CardActions>
    </Card>
  );
}
