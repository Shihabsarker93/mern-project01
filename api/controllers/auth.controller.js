import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(400, 'User already exists!'));
        }

        // Create a new user instance
        const newUser = new User({ username, email, password: hashedPassword });
        
        // Save the user to the database
        await newUser.save();
        
        // Send a success response
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        // Handle any errors
        console.error(error);
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Check if the user exists
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found!'));
        }

        // Validate password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Wrong credentials!'));
        }

        // Generate a JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Exclude password from the response
        const { password: pass, ...rest } = validUser._doc;

        // Send the token in a cookie and the user data in the response
        res
            .cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
            .status(200)
            .json(rest);
    } catch (error) {
        // Pass error to the next middleware
        next(error);
    }
};