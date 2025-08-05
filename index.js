const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenseRoutes'); 
// const adminRoutes = require('./routes/adminRoutes'); 

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);        
app.use('/api/expenses', expenseRoutes);  
app.use("/api/admin", require("./routes/adminRoutes")); 



// Test route
app.get('/', (req, res) => {
    res.send('Expense Tracker API is running 🚀');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
});
