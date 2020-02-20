import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import ForgotPassword from '~/pages/ForgotPassword';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import ShoppingAssistent from '~/pages/ShoppingAssistent';
import ShoppingSales from '~/pages/ShoppingSales';
export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/forgot" component={ForgotPassword} />
            <Route path="/profile" component={Profile} isPrivate />
            <Route path="/home" component={Home} isPrivate />
            <Route path="/assistent" component={ShoppingAssistent} isPrivate />
            <Route path="/shoppingSales" component={ShoppingSales} isPrivate />
        </Switch>
    );
}
