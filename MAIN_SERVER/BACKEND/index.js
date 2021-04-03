const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const { config: { cookieSecret, port, protocol } } = require('./config');
const { ProxyRouter } = require('./proxy/ProxyRouter');

app.use(cors());
app.use(cookieParser(cookieSecret));
app.use(express.static(path.join(__dirname, 'public')));

ProxyRouter(app);

app.listen(port, () => console.log(`${protocol}://localhost:${port}`));