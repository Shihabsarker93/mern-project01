import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'; //npm i bcryptjs to decrypt usser
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body; // async bcz await
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
        // Handle any errors indec.js middle ware part signup(next)
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

        // Generate a JWT token (unique id) // double chekd with mongodb //->.env file 
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

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
// for the backend part here after (goole connect (google OAuth) ) afther OAuth
export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-4),// as password is required in usermodel but in google auth we generate
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };
  //signout
  export const signOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  }; 