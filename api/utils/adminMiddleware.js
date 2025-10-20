import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import Admin from '../models/admin.model.js';

export const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.cookies.admin_token;
    if (!token) return next(errorHandler(401, 'Unauthorized'));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) return next(errorHandler(401, 'Unauthorized'));

    req.admin = admin;
    next();
  } catch (error) {
    next(errorHandler(401, 'Unauthorized'));
  }
};