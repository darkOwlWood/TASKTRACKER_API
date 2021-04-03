require('dotenv').config();

const config = {
    port:            process.env.PORT,
    dev:             process.env.DEV==='development',
    dbUser:          process.env.DB_USER,
    dbPassword:      process.env.DB_PASSWOR,
    dbName:          process.env.DB_NAME,
    dbHost:          process.env.DB_HOST,
    secretJwtAccess: process.env.SECRET_JWT_ACCESS
}

module.exports = {
    config,
}