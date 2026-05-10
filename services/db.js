import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Log the connection details (without password) for debugging
console.log('🔌 Connecting to database...');
console.log('   Host:', process.env.DATABASE_URL?.split('@')[1]?.split(':')[0] || 'Not found');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 30000, // 30 seconds timeout
  // Force IPv4 to avoid IPv6 issues
  host: process.env.DATABASE_URL?.split('@')[1]?.split(':')[0],
});

// Test connection
pool.on('connect', () => {
  console.log('✅ Database connection established');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err.message);
});

// Initialize database tables
export async function initializeDatabase() {
  let client;
  try {
    console.log('📊 Initializing database tables...');
    
    client = await pool.connect();
    console.log('   ✓ Connected to database');
    
    // Create admin users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('   ✓ admin_users table ready');

    // Create contact submissions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('   ✓ contact_submissions table ready');

    // Create jobs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        requirements TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('   ✓ jobs table ready');

    // Create job applications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS job_applications (
        id SERIAL PRIMARY KEY,
        job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        resume_url TEXT,
        resume_file TEXT,
        cover_letter TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('   ✓ job_applications table ready');

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    if (error.code === 'ENOTFOUND') {
      console.error('\n💡 Database host not found. Please check:');
      console.error('   1. Your internet connection');
      console.error('   2. The DATABASE_URL in .env file');
      console.error('   3. Supabase project is active and accessible');
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
      console.error('\n💡 Connection timeout. This might be:');
      console.error('   1. Network/firewall blocking the connection');
      console.error('   2. Supabase service temporarily unavailable');
      console.error('   3. Try again in a few moments');
    } else if (error.code === '28P01') {
      console.error('\n💡 Authentication failed. Please check:');
      console.error('   1. Database password in .env file');
      console.error('   2. Password might need URL encoding (@ becomes %40)');
    }
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

export default pool;
