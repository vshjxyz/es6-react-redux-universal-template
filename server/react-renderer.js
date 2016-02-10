import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router';
import { RouteErrors } from  '../app/core/constants';
import routes from '../app/routes';
import globPromise from './glob-promise';

const routeUrl = (url) => {
    return new Promise((resolve, reject) => {
        match({
            routes: routes,
            location: url
        }, (error, redirectLocation, renderProps) => {
            if (error) {
                reject({
                    error: RouteErrors.ROUTING
                });
            } else if (redirectLocation) {
                reject({
                    error: RouteErrors.REDIRECT,
                    route: route
                });
            } else {
                resolve(renderProps);
            }
        });
    }).then((routerProps) => {
            if (routerProps.routes[0].path === '*') { // Not found
                throw {
                    error: RouteErrors.NOT_FOUND,
                    props: routerProps
                };
            }

            return routerProps;
        });
};

const renderRouter = (routerProps) => {
    return new Promise((resolve, reject) => {
        const prerenderedPage = ReactDOMServer.renderToString(<RouterContext {...routerProps} />);

        if (process.env.NODE_ENV != 'development') {
            Promise.all([
                globPromise(process.cwd() + '/dist/*.css'),
                globPromise(process.cwd() + '/dist/*.js')
            ]).then(([cssList, jsList]) => {
                resolve({
                    html: prerenderedPage,
                    styles: cssList,
                    scripts: jsList
                });
            }, reject);
        } else {
            resolve({
                html: prerenderedPage,
                styles: [],
                scripts: [ 'bundle.js' ]
            });
        }
    });
};

export default {
    routeUrl,
    renderRouter
}
