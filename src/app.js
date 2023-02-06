// const { sequelize } = require('./models');
// sequelize.sync({ force: true });

require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const visitorRoute = require('./routes/visitor-route');
const authRoute = require('./routes/auth-route');
const userRoute = require('./routes/user-route');
const adminRoute = require('./routes/admin-route');
const superUserRoute = require('./routes/super-user-route');

const authenticateMiddleware = require('./middlewares/authenticate');
const authLevelMiddleware = require('./middlewares/auth-level')
const notFoundMiddleWare = require('./middlewares/not-found');
const errorMiddleWare = require('./middlewares/error');

const { SUPER_USER, ADMIN } = require('./config/constant');

const app = express();

// middleware
app.use(morgan('dev'));     // to log request
app.use(helmet());          // to protect http
app.use(cors());            // to connect with front
app.use(express.json());    // to get BODY data

// router
app.use('/visitor', visitorRoute);
app.use('/auth', authRoute);                                                                        // login & register
app.use('/user', authenticateMiddleware, userRoute);                                                // authentication's level = user
app.use('/admin', authenticateMiddleware, authLevelMiddleware([ADMIN, SUPER_USER]), adminRoute);    // authentication's level = admin (or above)
app.use('/super-user', authenticateMiddleware, authLevelMiddleware(SUPER_USER), superUserRoute);    // authentication's level = super user

// middleware error
app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

// start port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(chalk.yellowBright.italic.bold(`Start server at port ${port}...`)));