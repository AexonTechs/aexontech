import { initializeDatabase } from './db.js';
import bcrypt from 'bcryptjs';
import pool from './db.js';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  console.log('🚀 Starting database initialization...\n');

  try {
    // Initialize tables
    await initializeDatabase();
    
    // Check if default admin exists
    const adminCheck = await pool.query(
      'SELECT * FROM admin_users WHERE email = $1',
      [process.env.ADMIN_EMAIL_LOGIN]
    );

    if (adminCheck.rows.length === 0) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await pool.query(
        'INSERT INTO admin_users (email, password) VALUES ($1, $2)',
        [process.env.ADMIN_EMAIL_LOGIN, hashedPassword]
      );
      console.log('✅ Default admin user created');
      console.log(`   Email: ${process.env.ADMIN_EMAIL_LOGIN}`);
      console.log(`   Password: ${process.env.ADMIN_PASSWORD}`);
    } else {
      console.log('ℹ️  Default admin user already exists');
    }

    console.log('\n✅ Database setup complete!');
    console.log('\n📊 Database Summary:');
    
    const tables = ['admin_users', 'contact_submissions', 'jobs', 'job_applications'];
    for (const table of tables) {
      const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
      console.log(`   ${table}: ${result.rows[0].count} records`);
    }

    console.log('\n🎉 You can now start the server with: npm run dev');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();
