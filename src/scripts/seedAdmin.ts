import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const SUPER_ADMIN_EMAIL = 'superadmin@cupitor.com'
const SUPER_ADMIN_PASSWORD = 'SuperAdmin@123!' // Change this after first login!
const SUPER_ADMIN_NAME = 'Super Admin'

const seedSuperAdmin = async () => {
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
        role: {
          type: String,
          enum: ['super_admin', 'admin', 'moderator'],
          required: true,
        },
      },
      { timestamps: true },
    )

    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

    // Check if super admin already exists
    const existingSuperAdmin = await Admin.findOne({
      email: SUPER_ADMIN_EMAIL,
    })
    if (existingSuperAdmin) {
      console.log(
        '⚠️  Super Admin already exists with email:',
        SUPER_ADMIN_EMAIL,
      )
      process.exit(0)
    }

    // Hash password
    console.log('🔐 Hashing password...')
    const hashedPassword = await bcrypt.hash(
      SUPER_ADMIN_PASSWORD,
      Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
    )

    // Create super admin
    console.log('👤 Creating Super Admin user...')
    const superAdmin = await Admin.create({
      name: SUPER_ADMIN_NAME,
      email: SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      role: 'super_admin',
    })

    console.log('✅ Super Admin created successfully!')
    console.log('📧 Email:', superAdmin.email)
    console.log('🔑 Password:', SUPER_ADMIN_PASSWORD)
    console.log('👑 Role: super_admin')
    console.log('⚠️  IMPORTANT: Change this password after first login!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating Super Admin:', error)
    process.exit(1)
  }
}

// Run the seed function
seedSuperAdmin()
