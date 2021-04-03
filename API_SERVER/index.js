const cors = require('cors');
const passport = require('passport');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const { config } = require('./config');
const { schema } = require('./graphql/Schema');
const { handlerError } = require('./utils/middleware/handlerError');
const { handlerNotFound } = require('./utils/middleware/handlerNotFound');
require('./utils/auth/jwt');

app.use(cors({
    origin: `${config.dev ? 'http' : 'https'}://${config.mainServer}`,
    credentials: !config.dev,
}));

app.use('/graphql', passport.authenticate('jwt', { session: false }), graphqlHTTP({
    schema,
    graphiql: config.dev,
    customFormatErrorFn: handlerError,
}));

app.use(handlerNotFound);

app.listen(config.port, () => console.log(`http://localhost:${config.port}`));