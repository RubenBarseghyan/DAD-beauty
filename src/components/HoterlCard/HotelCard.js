import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card'
import Skeleton from '@material-ui/lab/Skeleton';
import CardMedia from '@material-ui/core/CardMedia'
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        margin: theme.spacing(2),
    },
    contenStyle: {
        position: 'relative'
    },
    svgStyle: {
        display: "inline-block",
        marginLeft: '60%',
    },
    media: {
        display: 'block',
        width: '250px',
        height: '150px',
    },
}))

const HotelCard = ({hotel, loading}) => {

    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader
                title={
                    loading ? (
                        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                    ) : (
                        <Typography variant="body2" component="h2">
                            {hotel.name}
                        </Typography>
                    )
                }
                subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> :
                    <Typography variant="body2" component="p" color='textSecondary'>
                    {hotel.location}
                    </Typography>}
            />
            {loading ? (
                <Skeleton animation="wave" variant="rect" className={classes.media} />
            ) : (
                <CardMedia
                    className={classes.media}
                    image={hotel.image}
                    title={hotel.name}
                />
            )}
            <CardContent className={classes.contenStyle}>
                {loading ? (
                    <>
                        <Skeleton animation="wave" height={10}  width='15%' style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="30%" />
                        <Skeleton animation="wave" height={10} width="30%" />
                        <Skeleton animation="wave" height={40} width="80%"  style={{ marginTop: 6 }}/>
                        <Skeleton animation="wave" height={10} width="65%"  style={{ marginTop: 6 }}/>
                    </>
                ) : (
                    <>
                        <Typography variant="body2" component="span">
                            Price
                        </Typography>
                        <ArrowForwardIcon color='primary' className={classes.svgStyle}/>
                        <Typography variant="body2" component="p">
                            min: {hotel.price.min}
                        </Typography>
                        <Typography variant="body2" component="p">
                            max: {hotel.price.min}
                        </Typography>
                        <Typography variant="body2" component="p" style={{ marginBottom: 7, marginTop: 7}}>
                            {hotel.description}
                        </Typography>
                        <Typography variant="body2" color="primary" component="p">
                            {hotel.site}
                        </Typography>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

HotelCard.propTypes = {
    hotel: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
};

HotelCard.defaultProps = {
    hotel: {},
    loading: true,
}

export default HotelCard;