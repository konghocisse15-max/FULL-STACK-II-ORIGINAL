const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// =========================
// Admin Route
// Only Admin can access
// =========================
router.get(
    "/admin",
    authMiddleware,
    roleMiddleware(["admin"]),
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Welcome Admin!",
            user: req.user
        });

    }
);

// =========================
// User Route
// Admin and User can access
// =========================
router.get(
    "/user",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Welcome User!",
            user: req.user
        });

    }
);

// =========================
// Profile Route
// Any logged-in user can access
// =========================
router.get(
    "/profile",
    authMiddleware,
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "User Profile",
            user: req.user
        });

    }
);

module.exports = router;