const crypto = require('crypto');
const { config } = require('../config');
const cookieConfig = {
    httpOnly,
    maxAge,
    path,
    secure,
    signed,
    sameSite,
} = config;

const proxyGraphQL = {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        const { jsonWebToken } = srcReq.signedCookies[config.cookieName];
        proxyReqOpts.headers['Authorization'] = `Bearer ${jsonWebToken}`;
        proxyReqOpts.headers['Cookie'] = '';
        return proxyReqOpts;
    }
}

const proxyAuthLogin = {
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
        const challange = crypto.randomBytes(20).toString('hex');
        return { challange };
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        const goodRequest = userRes.statusCode === 201;
        const goodResponse = () => {
            const resp = JSON.parse(proxyResData.toString('utf8'));
            const hashChallange = resp.hashChallange;
            userRes.cookie(config.cookieName, { hashChallange }, cookieConfig);
        }

        goodRequest && goodResponse();
        return {};
    }
}

const proxyAuthToken = {
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
        const { hashChallange } = srcReq.signedCookies[config.cookieName];
        return { hashChallange };
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        const goodRequest = userRes.statusCode === 201;
        const goodResponse = () => {
            const { hashChallange } = userReq.signedCookies[config.cookieName];
            const { jsonWebToken } = JSON.parse(proxyResData.toString('utf8'));
            userRes.clearCookie(config.cookieName);
            userRes.cookie(config.cookieName, { hashChallange, jsonWebToken }, cookieConfig);
        }

        goodRequest && goodResponse();
        return {};
    }
}

const proxyAuthLogout = {
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
        const { hashChallange } = srcReq.signedCookies[config.cookieName];
        return { hashChallange };
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        userRes.clearCookie(config.cookieName);
        return {};
    }
}

module.exports = {
    proxyGraphQL,
    proxyAuthLogin,
    proxyAuthToken,
    proxyAuthLogout,
}