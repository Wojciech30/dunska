const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const adminAuth = require('../middleware/auth');
const nodemailer = require('nodemailer');

// PUBLIC — Submit inquiry
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, brand, interests, size, message, consent } = req.body;

    // Validate: at least phone or email required
    if (!phone && !email) {
      return res.status(400).json({ error: 'Telefon lub e-mail jest wymagany.' });
    }
    if (!consent) {
      return res.status(400).json({ error: 'Zgoda RODO jest wymagana.' });
    }

    const inquiry = new Inquiry({ name, phone, email, brand, interests, size, message, consent });
    await inquiry.save();

    // Send email notification (non-blocking)
    sendNotificationEmail(inquiry).catch(err => console.error('Email error:', err));

    res.status(201).json({ message: 'Dziękujemy za zapytanie! Skontaktujemy się wkrótce.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ADMIN — Get all inquiries
router.get('/admin', adminAuth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN — Delete inquiry
router.delete('/admin/:id', adminAuth, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN — Export CSV
router.get('/admin/export', adminAuth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    const header = 'Data,Imię,Telefon,Email,Marka,Zainteresowania,Rozmiar,Wiadomość\n';
    const rows = inquiries.map(i => {
      const date = i.createdAt.toISOString().split('T')[0];
      const interests = (i.interests || []).join('; ');
      return `"${date}","${i.name}","${i.phone}","${i.email}","${i.brand}","${interests}","${i.size}","${i.message}"`;
    }).join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=zapytania.csv');
    res.send('\uFEFF' + header + rows); // BOM for Excel UTF-8
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Email notification helper
async function sendNotificationEmail(inquiry) {
  if (!process.env.SMTP_HOST || !process.env.NOTIFICATION_EMAIL) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const interests = (inquiry.interests || []).join(', ');

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `Nowe zapytanie — ${inquiry.name}`,
    html: `
      <h2>Nowe zapytanie o dostępność</h2>
      <p><strong>Imię:</strong> ${inquiry.name}</p>
      <p><strong>Telefon:</strong> ${inquiry.phone || '—'}</p>
      <p><strong>Email:</strong> ${inquiry.email || '—'}</p>
      <p><strong>Marka:</strong> ${inquiry.brand || '—'}</p>
      <p><strong>Zainteresowania:</strong> ${interests || '—'}</p>
      <p><strong>Rozmiar:</strong> ${inquiry.size || '—'}</p>
      <p><strong>Wiadomość:</strong> ${inquiry.message || '—'}</p>
    `,
  });
}

module.exports = router;
