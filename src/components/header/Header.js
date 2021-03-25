import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    offset:theme.mixins.toolbar
}))

const Header = () => {
    const classes = useStyles()
    return (
        <>
            <AppBar color='secondary' position='fixed'>
                <ToolBar>
                    <Typography variant='h5' component='h5'>
                        INVO COMPANY
                    </Typography>
                </ToolBar>
            </AppBar>
            <div className={classes.offset}/>
        </>
    );
};

export default Header;