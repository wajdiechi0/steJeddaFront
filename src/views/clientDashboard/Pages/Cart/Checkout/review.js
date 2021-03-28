import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import AttachMoney from '@material-ui/icons/AttachMoney';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const products = props.cartItems;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => {
          return(
          <ListItem className={classes.listItem} key={product.id}>
            <ListItemText primary={product.name} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        )})}
        <ListItem className={classes.listItem}>
          <ListItemText style={{marginTop: 20}} primary="Total" />
          <Typography variant="h6" className={classes.total}>
            ${props.total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <AttachMoney/>Cash
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}