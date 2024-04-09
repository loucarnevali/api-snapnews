import mongoose from 'mongoose';
// Import bcrypt for password hashing
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
});

// Middleware function to hash the password before saving it to the database
UserSchema.pre('save', async function (next) {
  // Hash the password using bcrypt with a salt of 10
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
const User = mongoose.model('User', UserSchema);

export default User;
