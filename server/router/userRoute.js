import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';

const router = express.Router();

// Passport local strategy setup
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        return done(null, false, { message: 'Invalid email address' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, { message: 'Invalid password' });
      }
  
      return done(null, user);
    } catch (error) {
      return done(error);
    }
}));
  
// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize user's id
});
  
// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id); // Find user by id
        done(null, user);
    } catch (error) {
        done(error);
    }
});
  
// Validation middleware
const validateLogin = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
];
  
  // Login route with validation
router.post('/login', validateLogin, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
  
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json({ message: 'Login successful' });
        });
    })(req, res, next);
});

export default router;
