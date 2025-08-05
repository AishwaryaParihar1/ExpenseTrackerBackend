const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/authController');
// const { createExpense, getUserExpenses } = require('../controller/expenseController');
// const protect = require('../middleware/authMiddleware')

router.post('/register', registerUser);
router.post('/login', loginUser);

// router.post("/expenses", protect, createExpense);     
// router.get("/expenses", protect, getUserExpenses);    

module.exports = router;
