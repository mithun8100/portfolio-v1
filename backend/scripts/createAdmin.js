import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import crypto from 'node:crypto';

const DB_DIR = path.join(process.cwd(), 'local_db');
const DB_FILE = path.join(DB_DIR, 'db.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

console.log('\n=============================================');
console.log('🚀 Mithun Portfolio Admin Registration Tool');
console.log('=============================================\n');

rl.question('Admin Name: ', (name) => {
  if (!name.trim()) {
    console.log('❌ Name cannot be empty.');
    rl.close();
    process.exit(1);
  }

  rl.question('Admin Email: ', (email) => {
    if (!email.trim() || !email.includes('@')) {
      console.log('❌ Invalid email address.');
      rl.close();
      process.exit(1);
    }

    rl.question('Password: ', (password) => {
      if (!password || password.length < 4) {
        console.log('❌ Password must be at least 4 characters long.');
        rl.close();
        process.exit(1);
      }

      try {
        if (!fs.existsSync(DB_DIR)) {
          fs.mkdirSync(DB_DIR, { recursive: true });
        }

        let database = {
          projects: [],
          skills: [],
          experience: [],
          contacts: [],
          admin: {}
        };

        if (fs.existsSync(DB_FILE)) {
          const raw = fs.readFileSync(DB_FILE, 'utf-8');
          try {
            database = JSON.parse(raw);
          } catch (e) {
            console.log('⚠️ Could not parse existing DB, resetting values...');
          }
        }

        // Set admin details with SHA-256
        database.admin = {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          passwordHash: hashPassword(password)
        };

        fs.writeFileSync(DB_FILE, JSON.stringify(database, null, 2), 'utf-8');

        console.log('\n✅ Admin user upserted successfully!');
        console.log(`👤 Name: ${database.admin.name}`);
        console.log(`✉️ Email: ${database.admin.email}`);
        console.log('🔑 Password: Hashed secure SHA-256');
        console.log('=============================================\n');
      } catch (err) {
        console.error('❌ Failed to save admin user:', err);
      } finally {
        rl.close();
      }
    });
  });
});
