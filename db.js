const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DBNAME}`;

async function connect() {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to the database.");
            return;
        }
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

connect(); // Ensure connection on startup

module.exports = { connect };
