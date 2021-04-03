require('dotenv').config();

const config = {
    port:         process.env.PORT,
    dev:          process.env.DEV === 'development',
    protocol:     process.env.DEV === 'development' ? 'http' : 'https',
    authServer:   process.env.AUTH_SERVER,
    apiServer:    process.env.API_SERVER,
    cookieName:   process.env.COOKIE_NAME,
    cookieSecret: process.env.COOKIE_SECRET,
    httpOnly:     process.env.DEV === 'development',
    maxAge:       process.env.MAX_AGE,
    path:         process.env.COOKIE_PATH,
    secure:       !process.env.DEV === 'development',
    signed:       Boolean(process.env.SIGNED),
    sameSite:     Boolean(process.env.SAME_SITE),
}

module.exports = {
    config,
}