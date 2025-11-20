import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const ADMIN_EMAIL = 'admin@cupitor.com'
const ADMIN_PASSWORD = 'Admin@123!' // Change this after first login!
const ADMIN_NAME = 'Super Admin'

const seedAdmin = async () => {
  try {
    console.log('🔄 Connecting to database...')
    await mongoose.connect(process.env.DATABASE_URL as string)
    console.log('✅ Connected to database')

    // Define Admin schema inline for seeding
    const AdminSchema = new mongoose.Schema(
      {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'admin' },
      },
      { timestamps: true },
    )

    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL })
    if (existingAdmin) {
      console.log('⚠️  Admin already exists with email:', ADMIN_EMAIL)
      process.exit(0)
    }

    // Hash password
    console.log('🔐 Hashing password...')
    const hashedPassword = await bcrypt.hash(
      ADMIN_PASSWORD,
      Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
    )

    // Create admin
    console.log('👤 Creating admin user...')
    const admin = await Admin.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
    })

    console.log('✅ Admin created successfully!')
    console.log('📧 Email:', admin.email)
    console.log('🔑 Password:', ADMIN_PASSWORD)
    console.log('⚠️  IMPORTANT: Change this password after first login!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin:', error)
    process.exit(1)
  }
}

// Run the seed function
seedAdmin()
