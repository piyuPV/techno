const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { createToken } = require('../utils/jwtUtils');

// Validation schemas
const baseUserSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 characters long"),
    accountType: z.enum(['user', 'company'])
});

const individualUserSchema = baseUserSchema.extend({
    age: z.number().min(18, "Must be at least 18 years old"),
    gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say'])
});

const companyUserSchema = baseUserSchema.extend({
    companyDetails: z.object({
        companyName: z.string().min(2, "Company name must be at least 2 characters long"),
        registrationNumber: z.string(),
        industry: z.string(),
        companySize: z.string(),
        businessType: z.string()
    })
});

exports.registerUser = async (req, res) => {
    try {
        const { accountType } = req.body;
        let validatedData;

        if (accountType === 'user') {
            validatedData = individualUserSchema.parse(req.body);
        } else if (accountType === 'company') {
            validatedData = companyUserSchema.parse(req.body);
        } else {
            throw new Error('Invalid account type');
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: validatedData.email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Create new user
        const user = new User(validatedData);
        await user.save();

        // Create token
        const token = createToken(user._id, user);

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                accountType: user.accountType,
                ...(user.accountType === 'company' && { companyDetails: user.companyDetails })
            }
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: err.errors
            });
        }
        res.status(400).json({
            message: err.message
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        const token = createToken(user._id, user);
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                accountType: user.accountType,
                ...(user.accountType === 'company' && { companyDetails: user.companyDetails })
            }
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// Update auth routes
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user;
        const updates = req.body;

        // Validate updates based on account type
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Apply updates
        Object.keys(updates).forEach(key => {
            if (key !== 'password' && key !== 'email') { // Prevent direct password/email updates
                user[key] = updates[key];
            }
        });

        await user.save();
        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                accountType: user.accountType,
                ...(user.accountType === 'company' && { companyDetails: user.companyDetails })
            }
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

exports.addChildProfile = async (req, res) => {
    try {
        const parent = await User.findById(req.user);
        if (!parent) {
            return res.status(404).json({
                message: "Parent not found"
            })
        }
        const { name, email, password } = childSchema.parse(req.body);
        const childExists = parent.children.find((child) => child.email === email);
        if (childExists) {
            return res.status(400).json({
                error: "Child already exists"
            })
        }
        parent.children.push({
            name,
            email,
            password
        })
        await parent.save();
        res.status(201).json({
            message: "Child added successfully",
            children: parent.children
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getChildProfiles = async (req, res) => {
    try {
        const parent = await User.findById(req.user);
        if (!parent) return res.status(404).json({ message: "Parent not found" });
        res.status(200).json({
            children: parent.children
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

