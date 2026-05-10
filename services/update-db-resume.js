import pool from './db.js';

async function updateDatabase() {
  console.log('🔄 Updating database for resume file storage...\n');

  try {
    // Add resume_file column if it doesn't exist
    await pool.query(`
      ALTER TABLE job_applications 
      ADD COLUMN IF NOT EXISTS resume_file TEXT;
    `);

    console.log('✅ Database updated successfully!');
    console.log('   - Added resume_file column to job_applications table');
    
  } catch (error) {
    console.error('❌ Error updating database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

updateDatabase();
