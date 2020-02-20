import { IconButton } from '@material-ui/core/';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '~/assets/avatar.png';
import logo from '~/assets/logo.svg';
import { useStyles } from './styles';

const Header = props => {
    const { open, handleDrawerOpen } = props;
    const classes = useStyles();

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <IconButton>
                    <Link to="/">
                        <img
                            className={classes.img}
                            src={logo}
                            alt="Assistente Comercial"
                        />
                    </Link>
                </IconButton>

                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    className={classes.avatarRight}
                >
                    <Link to="/Profile">
                        <Avatar
                            alt="Remy Sharp"
                            variant="circle"
                            src={avatar}
                        />
                    </Link>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
