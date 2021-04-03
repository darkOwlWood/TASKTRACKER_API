require('dotenv').config();

const config = {
    port:            process.env.PORT,
    dev:             process.env.DEV==='development',
    dbUser:          process.env.DB_USER,
    dbPassword:      process.env.DB_PASSWORD,
    dbHost:          process.env.DB_HOST,
    dbName:          process.env.DB_NAME,
    jwtExpireTimeMs: process.env.JWT_EXPIRE_TIME_MS,
    secretJwtAccess: process.env.SECRET_JWT_ACCESS,
}

module.exports = {
    config,
}