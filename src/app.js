// const { sequelize } = require('./models');
// sequelize.sync({ force: true });

require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoute = require('./routes/auth-route');
const userRoute = require('./routes/user-route');
const superUserRoute = require('./routes/super-user-route');

const authenticateMiddleware = require('./middlewares/authenticate');
const superUserMiddleware = require('./middlewares/super-user');
const notFoundMiddleWare = require('./middlewares/not-found');
const errorMiddleWare = require('./middlewares/error');

const app = express();

// middleware
app.use(morgan('dev'));     // to log request
app.use(helmet());          // to protect http
app.use(cors());            // to connect with front
app.use(express.json());    // to get BODY data

// router
app.use('/auth', authRoute);
// authentication's level = user
app.use('/user', authenticateMiddleware, userRoute);
// authentication's level = admin
// app.use('/admin');
// authentication's level = super user
app.use('/super-user', authenticateMiddleware, superUserMiddleware, superUserRoute);

// middleware error
app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

// start port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(chalk.yellowBright.italic.bold(`Start server at port ${port}...`)));