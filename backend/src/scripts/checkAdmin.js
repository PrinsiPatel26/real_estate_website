import 'dotenv/config';
import mongoose from 'mongoose';
import { Admin } from '../models/Admin.js';
import { connectDatabase } from '../config/db.js';

async function checkAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!email) {
    throw new Error('ADMIN_EMAIL is not configured');
  }

  await connectDatabase();
  const admin = await Admin.findOne({ email }).select('+password');

  console.log(JSON.stringify({
    adminExists: !!admin,
    email,
    role: admin?.role || null,
    hasPasswordHash: !!(admin && typeof admin.password === 'string' && admin.password.length > 0),
    passwordHashStartsWithBcrypt: !!(admin && typeof admin.password === 'string' && admin.password.startsWith('$2'))
  }, null, 2));
}

checkAdmin()
  .catch((error) => {
    const message = error instanceof Error ? error.message : 'Unknown admin check error';
    console.error(`Admin check failed: ${message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
