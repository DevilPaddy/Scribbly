// lib/mongodb.ts
import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect(process.env.DB_KEY!);
    console.log('✅ Connected to MongoDB');

  } catch (error) {
    console.log('❌ Error in DB connection:', error);
    
  }
}
