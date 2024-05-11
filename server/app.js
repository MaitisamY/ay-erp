import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import passport from 'passport';
import flash from 'connect-flash';
import helmet from 'helmet';

import sequelize from './config/sequelize.js';
import userRoutes from './router/userRoute.js';
import generalSettingRoutes from './router/generalSettingRoute.js';
import categoryRoutes from './router/categorySettingRoute.js';
import uomRoutes from './router/uomSettingRoute.js';
import taxRoutes from './router/taxSettingRoute.js';
import brandRoutes from './router/brandSettingRoute.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(
    helmet({
        contentSecurityPolicy: {
            // Content Security Policy (CSP) directives
            directives: {
            defaultSrc: ["'self'"],                                               // Allow resources from the same origin by default
            scriptSrc: ["'self'", "'unsafe-inline'", 'http://localhost:5173/'],   // Allow scripts from these sources
            },
            // Other CSP options
            // reportOnly: true,                                                  // Enable report-only mode
            // reportUri: '/report-violation',                                    // Specify URI to send CSP violation reports
        },
        frameguard: {
            action: 'deny',                                                       // Set X-Frame-Options to deny framing
        },
        // Configuration of other security headers
        dnsPrefetchControl: { allow: false },                                     // Disable DNS prefetching
        expectCt: { enforce: true, maxAge: 123 },                                 // Configure Expect-CT header
        featurePolicy: {
            features: {                                                           // Configure Feature-Policy header
            camera: ["'none'"],
            microphone: ["'none'"],
            },
        },
        hidePoweredBy: true,                                                      // Remove the X-Powered-By header
        hpkp: false,                                                              // Disable HTTP Public Key Pinning (HPKP)
        hsts: {
            maxAge: 31536000,                                                     // Set HSTS max-age to one year (in seconds)
            includeSubDomains: true,                                              // Include subdomains
            preload: true,                                                        // Enable HSTS preload
        },
        ieNoOpen: true,                                                           // Set X-Download-Options to noopen for IE8+
        noCache: false,                                                           // Disable client-side caching
        noSniff: true,                                                            // Enable X-Content-Type-Options to prevent MIME type sniffing
        permittedCrossDomainPolicies: { permittedPolicies: 'none' },              // Disable cross-domain policy file
        referrerPolicy: { policy: 'same-origin' },                                // Set Referrer-Policy header
        xssFilter: true,                                                          // Enable XSS protection filter
        })
);

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
