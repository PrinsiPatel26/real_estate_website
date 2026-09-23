import 'dotenv/config';
import mongoose from 'mongoose';
import { Admin } from '../models/Admin.js';
import { connectDatabase } from '../config/db.js';

async function createAdmin() {
  const name = process.env.ADMIN_NAME?.trim();
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error('ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD are required');
  }

  await connectDatabase();
  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    existingAdmin.name = name;
    existingAdmin.email = email;
    existingAdmin.password = password;
    existingAdmin.role = 'admin';
    await existingAdmin.save();
    console.log('Admin record refreshed successfully with the configured credentials');
    return;
  }

  await Admin.create({ name, email, password, role: 'admin' });
  console.log('Admin created successfully');
}

createAdmin()
  .catch((error) => {
    const message = error instanceof Error ? error.message : 'Unknown admin seed error';
    console.error(`Admin seed failed: ${message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
