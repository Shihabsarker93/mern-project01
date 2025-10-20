import Admin from './models/admin.model.js';
import bcryptjs from 'bcryptjs';

export const seedSuperAdmin = async () => {
  try {
    // Check if super admin exists
    const superAdminExists = await Admin.findOne({ role: 'super_admin' });
    
    if (!superAdminExists) {
      // Create super admin if doesn't exist
      const hashedPassword = bcryptjs.hashSync('admin123', 10);
      
      await Admin.create({
        username: 'superadmin',
        email: 'superadmin@example.com',
        password: hashedPassword,
        role: 'super_admin',
        permissions: {
          canManageUsers: true,
          canManageListings: true,
          canManageReviews: true
        }
      });
      
      console.log('Super admin account created successfully');
    }
  } catch (error) {
    console.error('Error seeding super admin:', error);
  }
};
