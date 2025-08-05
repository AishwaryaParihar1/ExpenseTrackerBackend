const express = require('express');
const router = express.Router();
const { createExpense, getUserExpenses, updateExpense, deleteExpense } = require('../controller/expenseController');
const protect = require('../middleware/authMiddleware');

router.post("/", protect, createExpense);
router.get("/", protect, getUserExpenses);
router.put("/:id", protect, updateExpense); 
router.delete('/:id', protect, deleteExpense);



module.exports = router;
