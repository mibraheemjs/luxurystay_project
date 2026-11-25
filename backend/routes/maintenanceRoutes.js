const express = require("express");

const router = express.Router();


const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');
const {
    createMaintenance,
    getAllMaintenance,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance
} = require("../controllers/MaintenanceController");



// Create
router.post("/", authMiddleware, authorize("admin", "manager"), createMaintenance);

// Get all
router.get("/", authMiddleware, authorize("admin", "manager", "housekeeping"), getAllMaintenance);

// Get by ID
router.get("/:id", authMiddleware, authorize("admin", "manager", "housekeeping"), getMaintenanceById);

// Update
router.put("/:id", authMiddleware, authorize("admin", "manager", "housekeeping"), updateMaintenance);

// Delete
router.delete("/:id", authMiddleware, authorize("admin", "manager"), deleteMaintenance);

module.exports = router;