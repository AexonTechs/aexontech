import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import pool, { initializeDatabase } from './db.js';
import { sendContactNotification, sendContactConfirmation, sendJobApplicationNotification, sendApplicationConfirmation } from './mailer.js';
import chatRoutes from './routes/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads', 'resumes');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
    }
  }
});

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://aexontech.com', 
        'https://www.aexontech.com',
        'https://aexontech-1.onrender.com'
      ]
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize database on startup
initializeDatabase().catch(console.error);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ status: 'error', message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ============= AUTH ROUTES =============

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Email and password are required' 
      });
    }

    // Check if this is the default admin login
    if (email === process.env.ADMIN_EMAIL_LOGIN && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email: email, isAdmin: true },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        status: 'success',
        message: 'Login successful',
        token,
        user: { email }
      });
    }

    // Check database for admin user
    const result = await pool.query(
      'SELECT * FROM admin_users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Invalid credentials' 
      });
    }

    const admin = result.rows[0];
    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Invalid credentials' 
      });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      status: 'success',
      message: 'Login successful',
      token,
      user: { id: admin.id, email: admin.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error during login' 
    });
  }
});

// Create admin user (protected route - only for initial setup or existing admins)
app.post('/api/admin/create', authenticateToken, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Email and password are required' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO admin_users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, hashedPassword]
    );

    res.json({
      status: 'success',
      message: 'Admin user created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      return res.status(400).json({ 
        status: 'error', 
        message: 'Admin user with this email already exists' 
      });
    }
    console.error('Create admin error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error creating admin user' 
    });
  }
});

// Verify token
app.get('/api/admin/verify', authenticateToken, (req, res) => {
  res.json({
    status: 'success',
    user: req.user
  });
});

// ============= CONTACT FORM ROUTES =============

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Name, email, and message are required' 
      });
    }

    // Save to database
    const result = await pool.query(
      'INSERT INTO contact_submissions (name, email, company, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, company || null, message]
    );

    // Send email notification to admins
    await sendContactNotification({ name, email, company, message });
    
    // Send confirmation email to user
    await sendContactConfirmation({ name, email, company, message });

    res.json({
      status: 'success',
      message: 'Contact form submitted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error submitting contact form' 
    });
  }
});

// Get all contact submissions (protected)
app.get('/api/admin/contacts', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    );

    res.json({
      status: 'success',
      data: result.rows
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error fetching contacts' 
    });
  }
});

// Update contact status (protected)
app.patch('/api/admin/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      'UPDATE contact_submissions SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Contact submission not found' 
      });
    }

    res.json({
      status: 'success',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error updating contact' 
    });
  }
});

// ============= JOBS ROUTES =============

// Get all jobs (public)
app.get('/api/jobs', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM jobs WHERE status = $1 ORDER BY created_at DESC',
      ['active']
    );

    res.json({
      status: 'success',
      data: result.rows
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error fetching jobs' 
    });
  }
});

// Get single job (public)
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Job not found' 
      });
    }

    res.json({
      status: 'success',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error fetching job' 
    });
  }
});

// Create job (protected)
app.post('/api/admin/jobs', authenticateToken, async (req, res) => {
  try {
    const { title, department, location, type, description, requirements } = req.body;

    if (!title || !department || !location || !type || !description || !requirements) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'All fields are required' 
      });
    }

    const result = await pool.query(
      'INSERT INTO jobs (title, department, location, type, description, requirements) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, department, location, type, description, requirements]
    );

    res.json({
      status: 'success',
      message: 'Job created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error creating job' 
    });
  }
});

// Update job (protected)
app.put('/api/admin/jobs/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, department, location, type, description, requirements, status } = req.body;

    const result = await pool.query(
      'UPDATE jobs SET title = $1, department = $2, location = $3, type = $4, description = $5, requirements = $6, status = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
      [title, department, location, type, description, requirements, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Job not found' 
      });
    }

    res.json({
      status: 'success',
      message: 'Job updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error updating job' 
    });
  }
});

// Delete job (protected)
app.delete('/api/admin/jobs/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Job not found' 
      });
    }

    res.json({
      status: 'success',
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error deleting job' 
    });
  }
});

// Get all jobs for admin (protected)
app.get('/api/admin/jobs', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');

    res.json({
      status: 'success',
      data: result.rows
    });
  } catch (error) {
    console.error('Get admin jobs error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error fetching jobs' 
    });
  }
});

// ============= JOB APPLICATIONS ROUTES =============

// Submit job application with file upload
app.post('/api/jobs/:id/apply', upload.single('resume'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, cover_letter } = req.body;

    if (!name || !email) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Name and email are required' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Resume file is required' 
      });
    }

    // Check if job exists
    const jobResult = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
    if (jobResult.rows.length === 0) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Job not found' 
      });
    }

    const result = await pool.query(
      'INSERT INTO job_applications (job_id, name, email, phone, resume_file, cover_letter) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, name, email, phone || null, req.file.filename, cover_letter || null]
    );

    // Send email notification to admins
    await sendJobApplicationNotification(
      { name, email, phone, resume_url: req.file.originalname, cover_letter },
      jobResult.rows[0].title
    );
    
    // Send confirmation email to applicant
    await sendApplicationConfirmation(
      { name, email, phone, resume_url: req.file.originalname, cover_letter },
      jobResult.rows[0].title
    );

    res.json({
      status: 'success',
      message: 'Application submitted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message || 'Server error submitting application' 
    });
  }
});

// Download resume file (protected)
app.get('/api/admin/applications/:id/resume', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get application details
    const result = await pool.query(
      'SELECT resume_file, name FROM job_applications WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Application not found' 
      });
    }

    const { resume_file, name } = result.rows[0];
    
    if (!resume_file) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'No resume file found for this application' 
      });
    }

    const filePath = path.join(uploadsDir, resume_file);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Resume file not found on server' 
      });
    }

    // Set appropriate headers for download
    const ext = path.extname(resume_file);
    const downloadName = `${name.replace(/\s+/g, '_')}_Resume${ext}`;
    
    res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    
    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Download resume error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error downloading resume' 
    });
  }
});

// Get all applications (protected)
app.get('/api/admin/applications', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        ja.*,
        j.title as job_title,
        j.department as job_department
      FROM job_applications ja
      JOIN jobs j ON ja.job_id = j.id
      ORDER BY ja.created_at DESC
    `);

    res.json({
      status: 'success',
      data: result.rows
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error fetching applications' 
    });
  }
});

// Get applications for specific job (protected)
app.get('/api/admin/jobs/:id/applications', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM job_applications WHERE job_id = $1 ORDER BY created_at DESC',
      [id]
    );

    res.json({
      status: 'success',
      data: result.rows
    });
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error fetching applications' 
    });
  }
});

// Update application status (protected)
app.patch('/api/admin/applications/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      'UPDATE job_applications SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Application not found' 
      });
    }

    res.json({
      status: 'success',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error updating application' 
    });
  }
});

// ============= ADMIN STATS =============

app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    const contactsResult = await pool.query(
      'SELECT COUNT(*) as count FROM contact_submissions WHERE status = $1',
      ['new']
    );
    
    const jobsResult = await pool.query(
      'SELECT COUNT(*) as count FROM jobs WHERE status = $1',
      ['active']
    );
    
    const applicationsResult = await pool.query(
      'SELECT COUNT(*) as count FROM job_applications WHERE status = $1',
      ['pending']
    );

    res.json({
      status: 'success',
      data: {
        newContacts: parseInt(contactsResult.rows[0].count),
        activeJobs: parseInt(jobsResult.rows[0].count),
        pendingApplications: parseInt(applicationsResult.rows[0].count),
        systemUptime: '99.99%'
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Server error fetching stats' 
    });
  }
});

// ============= RAG CHAT ROUTES =============
app.use('/api/chat', chatRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Aexon Services Backend is running flawlessly.' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
