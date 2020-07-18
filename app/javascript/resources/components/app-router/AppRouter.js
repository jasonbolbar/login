import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../../config/routes'

const AppRouter = () => (
    <Switch>
        { routes.map(route => (
            <Route
                key={route.path}
                component={route.component}
                path={route.path}
                exact={route.exact}
            />
        ))}
        <Route render={() => <Redirect to="/" />} />
    </Switch>
)

export default AppRouter