const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// ======================
// Register
// ======================
router.post("/register", async (req, res) => {

    const { name, email, password, role } = req.body;

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ======================
// Login
// ======================
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            token,
            message: "Login Successful"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ======================
// Protected Dashboard
// ======================
router.get("/dashboard", authMiddleware, (req, res) => {

    res.json({
        message: "Welcome to Dashboard",
        user: req.user
    });

});

module.exports = router;