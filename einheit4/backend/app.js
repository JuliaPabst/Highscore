const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let userData = {
    "ich@du.at": "test",
    "ich2@du.at": "test3"
};

let tokenData = {};

app.use((req, res, next) => {
    console.log("First middleware");
    next();
});

app.get("/", (req, res) => {
    // Alle Token Daten ausgeben
    console.log(tokenData);
    res.status(200).json(tokenData);
});


app.post("/users", (req, res) => {
    // Übergebene Daten loggen
    console.log(req.body);

    const { email, password, address, city, zipCode } = req.body;
    if (!email || !password || !address || !city || !zipCode) {
        res.status(400).send("Email, password, address, city, and zip code are required");
        return;
    }

    if (userData[email]) {
        res.status(409).send("User already exists");
        return;
    }

    userData[email] = { password, address, city, zipCode };
    
    const token = (Math.random() + 1).toString(36).substring(2);

    // Token in der Token-Datenbank speichern
    tokenData[email] = token;

    // Erfolgsmeldung mit dem Token zurückgeben
    res.status(201).json({
        message: "User created successfully",
        token: token
    });

});

app.post("/sessions", (req, res) => {
    // Übergebene Daten loggen
    console.log(req.body);

    // Passwort überprüfen
    if (req.body.password === userData[req.body.email]) {
        // Login erfolgreich
        // Token erstellen
        const token = (Math.random() + 1).toString(36).substring(2)

        // Token zur E-Mail Adresse speichern
        tokenData[req.body.email] = token;

        // Status 200 und Token zurückgeben
        res.status(200).json({
            Token: token
        });
    } else {
        // Login nicht erfolgreich
        // Status 401 und Fehlermeldung zurückgeben
        res.status(401).send("Invalid Credentials");
    }
});

module.exports = app;

