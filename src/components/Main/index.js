import React from 'react';
import clsx from 'clsx';
import { useStyles } from './styles';

export default function Main(props) {
    const { open, children } = props;
    const classes = useStyles();
    return (
        <main
            open={open}
            className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />
            {children}
        </main>
    );
}
