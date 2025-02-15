const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ['user', 'company'],
        required: true
    },
    // Fields for individual users
    age: {
        type: Number,
        required: function () { return this.accountType === 'user'; }
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer-not-to-say'],
        required: function () { return this.accountType === 'user'; }
    },
    // Fields for company accounts
    companyDetails: {
        companyName: {
            type: String,
            required: function () { return this.accountType === 'company'; }
        },
        registrationNumber: {
            type: String,
            required: function () { return this.accountType === 'company'; }
        },
        industry: {
            type: String,
            required: function () { return this.accountType === 'company'; }
        },
        companySize: {
            type: String,
            required: function () { return this.accountType === 'company'; }
        },
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    },

});

// hash the password before saving 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// method to compare passwods
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);

