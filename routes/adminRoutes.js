// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { getAllUsers, getUserExpenses, deleteUserExpense, updateUserExpense } = require("../controller/adminController");
const protect = require("../middleware/authMiddleware"); // token verify middleware

router.get("/users", protect, getAllUsers);
router.get("/user-expenses/:userId", protect, getUserExpenses);

router.delete("/user-expenses/:userId/:expenseId", protect, deleteUserExpense);
router.put("/user-expenses/:userId/:expenseId", protect, updateUserExpense);


module.exports = router;
