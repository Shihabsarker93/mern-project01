import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

// Admin Authentication
export const adminSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const admin = await Admin.create({ username, email, password });
    res.status(201).json('Admin created successfully');
  } catch (error) {
    next(error);
  }
};

export const adminSignin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return next(errorHandler(404, 'Admin not found!'));

    const validPassword = bcryptjs.compareSync(password, admin.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = admin._doc;

    res
      .cookie('admin_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const adminSignout = async (req, res, next) => {
  try {
    res.clearCookie('admin_token');
    res.status(200).json('Admin has been logged out!');
  } catch (error) {
    next(error);
  }
};

// Admin Dashboard Stats
export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = {
      users: {
        total: await User.countDocuments(),
        banned: await User.countDocuments({ isBanned: true }),
        warned: await User.countDocuments({ 'warnings.0': { $exists: true } })
      },
      listings: {
        total: await Listing.countDocuments(),
        sale: await Listing.countDocuments({ type: 'sale' }),
        rent: await Listing.countDocuments({ type: 'rent' })
      },
      recentListings: await Listing.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('userRef', 'username email')
    };
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

// User Management
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const banUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isBanned: true,
        banReason: req.body.reason,
        $push: {
          warnings: {
            message: `Account banned: ${req.body.reason}`,
            issuedBy: req.admin._id
          }
        }
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};