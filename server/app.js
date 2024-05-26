import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import passport from 'passport';
import flash from 'connect-flash';

import sequelize from './config/sequelize.js';
import userRoutes from './router/userRoute.js';
import generalSettingRoutes from './router/generalSettingRoute.js';
import categoryRoutes from './router/categorySettingRoute.js';
import uomRoutes from './router/uomSettingRoute.js';
import taxRoutes from './router/taxSettingRoute.js';
import brandRoutes from './router/brandSettingRoute.js';
import addUserRoute from './router/addUserRoute.js';
import logoutRoute from './router/logoutRoute.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, 
    httpOnly: true
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Add connect-flash middleware for flash messages
app.use(flash());

// Import and sync Sequelize models 
// Import other models as needed
import './models/User.js';
import './models/Category.js';

// Sync models with the database
sequelize.sync();

// Routes
app.use('/', userRoutes);
app.use('/', categoryRoutes);
app.use('/', uomRoutes);
app.use('/', generalSettingRoutes);
app.use('/', taxRoutes);
app.use('/', brandRoutes);
app.use('/', addUserRoute);
app.use('/', logoutRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
