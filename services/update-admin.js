import bcrypt from 'bcryptjs';
import pool from './db.js';
import dotenv from 'dotenv';

dotenv.config();

async function updateAdminCredentials() {
  console.log('🔄 Updating admin credentials...\n');

  try {
    const newEmail = process.env.ADMIN_EMAIL_LOGIN;
    const newPassword = process.env.ADMIN_PASSWORD;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Check if admin exists
    const checkResult = await pool.query(
      'SELECT * FROM admin_users WHERE email = $1',
      ['admin@aexontech.com']
    );

    if (checkResult.rows.length > 0) {
      // Update existing admin
      await pool.query(
        'UPDATE admin_users SET email = $1, password = $2 WHERE email = $3',
        [newEmail, hashedPassword, 'admin@aexontech.com']
      );
      console.log('✅ Admin credentials updated successfully!');
    } else {
      // Check if new email already exists
      const newEmailCheck = await pool.query(
        'SELECT * FROM admin_users WHERE email = $1',
        [newEmail]
      );

      if (newEmailCheck.rows.length > 0) {
        // Update password for existing email
        await pool.query(
          'UPDATE admin_users SET password = $1 WHERE email = $2',
          [hashedPassword, newEmail]
        );
        console.log('✅ Admin password updated successfully!');
      } else {
        // Create new admin
        await pool.query(
          'INSERT INTO admin_users (email, password) VALUES ($1, $2)',
          [newEmail, hashedPassword]
        );
        console.log('✅ New admin user created successfully!');
      }
    }

    console.log('\n📋 New Admin Credentials:');
    console.log(`   Email: ${newEmail}`);
    console.log(`   Password: ${newPassword}`);
    console.log('\n🎉 You can now login with these credentials!');

  } catch (error) {
    console.error('❌ Error updating admin credentials:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

updateAdminCredentials();
