const express = require("express");
const cors = require('cors');
const connectDB = require('./db');
const app = express();

// Datenbankverbindung herstellen
connectDB();

app.use(cors());
app.use(express.json());

const User = require('./models/userModel');
const { HighScore, HighScoreListe } = require('./models/highscoreModel');

// Beispiel-Routen für Benutzer- und Highscore-Verwaltung
app.post("/users", async (req, res) => {
    const { email, password, address, city, zipCode } = req.body;
    if (!email || !password || !address || !city || !zipCode) {
        res.status(400).send("Email, password, address, city, and zip code are required");
        return;
    }

    try {
        const user = new User({ email, password, address, city, zipCode });
        await user.save();
        
        const token = (Math.random() + 1).toString(36).substring(2);
        res.status(201).json({
            message: "User created successfully",
            token: token
        });
    } catch (err) {
        if (err.code === 11000) { // Duplicate key error
            res.status(409).send("User already exists");
        } else {
            res.status(500).send("Server error");
        }
    }
});

app.post("/sessions", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && user.password === password) {
            const token = (Math.random() + 1).toString(36).substring(2);
            res.status(200).json({
                token: token
            });
        } else {
            res.status(401).send("Invalid Credentials");
        }
    } catch (err) {
        res.status(500).send("Server error");
    }
});

module.exports = app;
