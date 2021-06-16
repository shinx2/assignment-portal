import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(30)
    },
}))

const ErrorPage = () => {

    const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
      <Grid item xs={6} md={5}>
        <Typography variant="h4">
          ERROR: You have reached a page that does not exist
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ErrorPage;
