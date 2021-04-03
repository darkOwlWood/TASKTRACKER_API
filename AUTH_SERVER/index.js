const cors = require('cors');
const express = require('express');
const app = express();

const { config } = require('./config');
const { AuthRoute } = require('./auth/AuthRoute');
const { wrapperError, printError, handlerError } = require('./utils/middleware/handlerError');
const { handlerNotFound } = require('./utils/middleware/handlerNotFound');

app.use(cors({
    origin: `${config.dev ? 'http' : 'https'}://${config.mainServer}`,
    credentials: !config.dev,
}));
app.use(express.json());

AuthRoute(app);

app.use(wrapperError);
app.use(printError);
app.use(handlerError);

app.use(handlerNotFound);

app.listen(config.port, () => console.log(`http://localhost:${config.port}`));