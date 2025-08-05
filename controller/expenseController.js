const Expense = require("../models/Expense");

// Add new expense
exports.createExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const expense = new Expense({
      title,
      amount,
      category,
      date,
      user: req.user._id,
    });
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error in createExpense:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all expenses for logged-in user
exports.getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};


exports.updateExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, amount, category, date },
      { new: true }
    );

    if (!expense) return res.status(404).json({ message: "Expense not found" });

    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Failed to update expense" });
  }
};



exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete expense" });
  }
};
