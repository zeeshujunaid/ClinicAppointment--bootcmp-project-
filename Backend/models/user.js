const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  role: { type: String, enum: ["admin", "doctor", "patient","staff"], required: true },
  specialization: String,
  experience: Number,
  fees: Number,
  age: Number,
  bloodGroup: String,
  gender:String,
  address:String,
  phone: String,
  profileImgurl: String,
}, { timestamps: true });


// hashpaswordbeforesaving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}; 


module.exports = mongoose.models.User || mongoose.model('User', userSchema);

