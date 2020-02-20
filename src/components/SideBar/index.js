import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {
    AccountBox as AccountBoxIcon,
    ShoppingCart as ShoppingCartIcon,
    Store as StoreIcon,
    ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

import { List } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { signOut } from '~/store/modules/auth/actions';
import { useStyles } from './styles';

const SideBar = props => {
    const dispatch = useDispatch();
    const { open, handleDrawerClose } = props;
    const classes = useStyles();
    const theme = useTheme();
    const handleSingOut = () => dispatch(signOut());
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? (
                        <ChevronLeftIcon />
                    ) : (
                        <ChevronRightIcon />
                    )}
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem
                    button
                    component={RouterLink}
                    to="/Profile"
                    onClick={handleDrawerClose}
                >
                    <ListItemIcon>
                        <AccountBoxIcon color="disabled" />
                    </ListItemIcon>
                    <ListItemText primary="Usuários" />
                </ListItem>
            </List>
            <List>
                <ListItem
                    button
                    component={RouterLink}
                    to="/assistent"
                    onClick={handleDrawerClose}
                >
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Assistente de Compras" />
                </ListItem>
            </List>
            <List>
                <ListItem
                    button
                    component={RouterLink}
                    to="/shoppingSales"
                    onClick={handleDrawerClose}
                >
                    <ListItemIcon>
                        <StoreIcon />
                    </ListItemIcon>
                    <ListItemText primary="Compras x Venda" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={handleSingOut}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sair" />
                </ListItem>
            </List>

            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </Drawer>
    );
};

export default SideBar;
