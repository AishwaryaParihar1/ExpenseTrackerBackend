const User = require("../models/User");
const Expense = require("../models/Expense");

// ✅ Get all users (Only for admin)
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const users = await User.find({}, "name email phone"); // return only needed fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// ✅ Get all expenses of a specific user (Only for admin)
exports.getUserExpenses = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { userId } = req.params;
    const expenses = await Expense.find({ user: userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user expenses" });
  }
};


exports.deleteUserExpense = async (req, res) => {
  try {
    const { userId, expenseId } = req.params;
    const expense = await Expense.findOneAndDelete({ _id: expenseId, user: userId });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserExpense = async (req, res) => {
  try {
    const { userId, expenseId } = req.params;
    const updated = await Expense.findOneAndUpdate(
      { _id: expenseId, user: userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
