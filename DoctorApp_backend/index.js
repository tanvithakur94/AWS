const mongoose = require('mongoose');
const app = require('express')();
const bodyParser = require('body-parser');

const mongoUri = 'mongodb+srv://admin:admin@cluster0.tgtc6.mongodb.net/clinic?retryWrites=true&w=majority'

const cors = require('cors'); // Import cors package
app.use(cors());
const port = process.env.PORT || 3000; // Run on port (protected) or port 8080

const authRoutes = require('./src/routes/authRoutes');
const bookRoutes = require('./src/routes/bookRoutes');

app.use(bodyParser.json());

app.use(authRoutes);
app.use(bookRoutes);

function connectDB() {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    mongoose.connection.on('connected', () => {
        console.log("mongodb connected successfully");
        // SERVE APPLICATION
        const server = app.listen(port, () => {
            console.log(`express on port ${port}`);
        });
    });
    mongoose.connection.on('error', (err) => {
        console.log('mongo connection error', err);
    });
}

connectDB();