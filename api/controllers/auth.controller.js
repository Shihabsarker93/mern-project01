import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);

    try {
        // Create a new user instance
        const newUser = new User({ username, email, password: hashedPassword });
        
        // Save the user to the database
        await newUser.save();
        
        // Send a success response
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the user' });
    }
};
