const path = require('path');
const proxy = require('express-http-proxy');
const express = require('express');
const router = express.Router();

const { proxyGraphQL, proxyAuthLogin, proxyAuthToken, proxyAuthLogout } = require('./ProxyOptions');
const { config: { protocol, apiServer, authServer } } = require('../config');

const ProxyRouter = (app) => {
    app.use(router);

    router.post('/graphql',      proxy(`${protocol}://${apiServer}/graphql`,     proxyGraphQL));
    router.post('/auth/signin',  proxy(`${protocol}://${authServer}/auth/signin`));
    router.post('/auth/login',   proxy(`${protocol}://${authServer}/auth/login`, proxyAuthLogin));
    router.post('/auth/token',   proxy(`${protocol}://${authServer}/auth/token`, proxyAuthToken));
    router.post('/auth/logout',  proxy(`${protocol}://${authServer}/auth/logout`,proxyAuthLogout));
    router.get('/*', (req, res, next) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')));
}

module.exports = {
    ProxyRouter,
}