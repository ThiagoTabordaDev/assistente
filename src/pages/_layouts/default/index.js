import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';
import Header from '~/components/Header';
import SideBar from '~/components/SideBar';
import Main from '~/components/Main';

export default function DefaultLayout({ children }) {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Wrapper>
            <Header handleDrawerOpen={handleDrawerOpen} />
            <SideBar handleDrawerClose={handleDrawerClose} open={open} />
            <Main open={open} children={children} />
        </Wrapper>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
