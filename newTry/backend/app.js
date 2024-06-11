const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

//in memory db
//2 users
let userData = [
    { email: "ich@du.at", password: "test", street: "", city: "", postalCode: ""},
    { email: "ich2@du.at", password: "test3", street: "", city: "", postalCode: "" }
];

let highScore = [

]

//absichern
//zufällig erzeugt
//ergebnis vom login an angular
//schickt bei jedem http request an backend mit token
//zuerst leer
//keine aktive login session
let tokenData = {};

//1. mal express
//middleware system
//nacheinander handler registrieren
//jeder http request
//jeder handler aufgerufen

//würde gerne bei jedem http request
//auch mehrere uses
//in der Reihenfolge ausgeführt
//test
app.use((req, res, next) => {
    console.log("First middleware");
    next();
});


//nur bei bedingunge http
// /root path
//wenn auf root path, dann der code
app.get("/", (req, res) => {
    // Alle Token Daten ausgeben
    console.log(tokenData);
    res.status(200).json(tokenData);
    //kommt auch aus
});

app.post("/users", (req, res) => {
    console.log(req.body);
    const { email, password, street, city, postalCode } = req.body;

    // Check if user already exists
    if (userData.some(user => user.email === email)) {
        return res.status(400).json("User already exists");
    }

    // Add new user
    userData.push({ email, password, street, city, postalCode});
    res.status(201).json({ message: `User ${email} created successfully` });
});


app.post("/sessions", (req, res) => {
    console.log(req.body);

    const user = userData.find(user => user.email === req.body.email);
    if (user && user.password === req.body.password) {
        const token = (Math.random() + 1).toString(36).substring(2);
        tokenData[req.body.email] = token;

        res.status(200).json({
            Token: token
        });
    } else {
        res.status(401).send("Invalid Credentials");
    }
});


app.post("/highscores", (req, res) => {
    console.log(req.body);
    const { username, score } = req.body;

    highScore.push({ username, score});
    console.log(`Received highscore: Username: ${username}, Score: ${score}`);

    res.status(200).json({ message: "Highscore saved successfully" });
});

app.get("/highscores", (req, res) => {
    // Highscores aus der In-Memory-Datenbank abrufen und formatieren
    const highscores = highScore.map(entry => ({ username: entry.username, score: entry.score }));
    res.status(200).json(highscores);
});

app.delete("/sessions", (req, res) => {
    const token = req.headers.authorization;

    if (!token || !Object.values(tokenData).includes(token)) {
        return res.status(401).send("Unauthorized");
    }

    const email = Object.keys(tokenData).find(key => tokenData[key] === token);
    delete tokenData[email];

    res.status(204).end();
});

module.exports = app;

