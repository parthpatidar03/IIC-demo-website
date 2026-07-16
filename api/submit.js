// Vercel Serverless Function — Form Submission Handler
// Deploy: This file runs as a serverless function at /api/submit on Vercel

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // --- Server-side Validation ---
    const requiredFields = ['full_name', 'roll_number', 'email', 'department', 'year', 'phone'];
    const missing = requiredFields.filter(field => !data[field] || !data[field].toString().trim());

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(', ')}`
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Phone validation
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!phoneRegex.test(data.phone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number'
      });
    }

    // --- Process the submission ---
    // The validated data object contains all form fields:
    // {
    //   full_name, roll_number, email, department, year, phone,
    //   alumni_lack, mentorship_fields (array), attend_seminar,
    //   sunday_morning, preferred_format (array), questions
    // }

    const submission = {
      ...data,
      submitted_at: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
    };

    // Log the submission (visible in Vercel function logs)
    console.log('=== NEW SUBMISSION ===');
    console.log(JSON.stringify(submission, null, 2));
    console.log('======================');

    // ---------------------------------------------------------------
    // TODO: Add your preferred storage backend here:
    //
    // Option 1: Google Sheets (via Google Apps Script)
    //   const sheetUrl = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
    //   await fetch(sheetUrl, {
    //     method: 'POST',
    //     body: JSON.stringify(submission),
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    //
    // Option 2: MongoDB Atlas
    //   const { MongoClient } = require('mongodb');
    //   const client = new MongoClient(process.env.MONGODB_URI);
    //   await client.connect();
    //   const db = client.db('iic-nitt');
    //   await db.collection('submissions').insertOne(submission);
    //   await client.close();
    //
    // Option 3: Supabase
    //   const { createClient } = require('@supabase/supabase-js');
    //   const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    //   await supabase.from('submissions').insert(submission);
    //
    // Option 4: Vercel KV (Redis)
    //   const { kv } = require('@vercel/kv');
    //   const id = `submission:${Date.now()}`;
    //   await kv.set(id, JSON.stringify(submission));
    //
    // Option 5: Email notification
    //   Use Resend, SendGrid, or Nodemailer to email each submission
    //   to iic@nitt.edu
    // ---------------------------------------------------------------

    return res.status(200).json({
      success: true,
      message: 'Registration submitted successfully!',
      id: `SUB-${Date.now()}`
    });

  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
}
