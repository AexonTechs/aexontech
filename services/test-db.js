import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

console.log('🧪 Testing Database Connection...\n');

// Parse and display connection details (without password)
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('❌ DATABASE_URL not found in .env file');
  process.exit(1);
}

try {
  const url = new URL(dbUrl);
  console.log('📋 Connection Details:');
  console.log(`   Protocol: ${url.protocol}`);
  console.log(`   Host: ${url.hostname}`);
  console.log(`   Port: ${url.port}`);
  console.log(`   Database: ${url.pathname.substring(1)}`);
  console.log(`   Username: ${url.username}`);
  console.log(`   Password: ${'*'.repeat(url.password.length)}\n`);
} catch (error) {
  console.error('❌ Invalid DATABASE_URL format:', error.message);
  process.exit(1);
}

const pool = new Pool({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 10000,
});

async function testConnection() {
  let client;
  try {
    console.log('⏳ Attempting to connect...\n');
    
    client = await pool.connect();
    console.log('✅ Successfully connected to database!\n');

    // Test query
    console.log('🔍 Running test query...');
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Query successful!\n');
    
    console.log('📊 Database Info:');
    console.log(`   Current Time: ${result.rows[0].current_time}`);
    console.log(`   PostgreSQL Version: ${result.rows[0].pg_version.split(',')[0]}\n`);

    // Check existing tables
    console.log('📋 Checking existing tables...');
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);

    if (tablesResult.rows.length > 0) {
      console.log('   Existing tables:');
      tablesResult.rows.forEach(row => {
        console.log(`   - ${row.table_name}`);
      });
    } else {
      console.log('   No tables found (database is empty)');
    }

    console.log('\n✅ Database connection test passed!');
    console.log('💡 You can now run: npm run init-db\n');

  } catch (error) {
    console.error('❌ Connection failed!\n');
    console.error('Error Details:');
    console.error(`   Code: ${error.code}`);
    console.error(`   Message: ${error.message}\n`);

    if (error.code === 'ENOTFOUND') {
      console.error('💡 Troubleshooting Steps:');
      console.error('   1. Check your internet connection');
      console.error('   2. Verify the database host in DATABASE_URL');
      console.error('   3. Ensure Supabase project is active');
      console.error('   4. Try accessing Supabase dashboard in browser\n');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('💡 Troubleshooting Steps:');
      console.error('   1. Check if the database port is correct (usually 5432)');
      console.error('   2. Verify firewall settings');
      console.error('   3. Ensure database is running\n');
    } else if (error.code === '28P01') {
      console.error('💡 Troubleshooting Steps:');
      console.error('   1. Check database username and password');
      console.error('   2. Verify credentials in .env file');
      console.error('   3. Reset password in Supabase dashboard if needed\n');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('💡 Troubleshooting Steps:');
      console.error('   1. Check your internet connection');
      console.error('   2. Try again in a few moments');
      console.error('   3. Check if Supabase is experiencing issues\n');
    }

    process.exit(1);
  } finally {
    if (client) {
      client.release();
    }
    await pool.end();
  }
}

testConnection();
