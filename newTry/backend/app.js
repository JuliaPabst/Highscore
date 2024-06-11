const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

//in memory db
//2 users
let userData = [
    { email: "ich@du.at", password: "test", address: "", city: "", zipCode: ""},
    { email: "ich2@du.at", password: "test3", address: "", city: "", zipCode: "" }
];

let highScore = [];

let tokenData = {};

app.use((req, res, next) => {
    console.log("First middleware");
    next();
});


app.get("/", (req, res) => {
    console.log(tokenData);
    res.status(200).json(tokenData);
});

app.post("/users", (req, res) => {
    console.log(req.body);
    const { email, password, address, city, zipCode } = req.body;

    // Check if user exists
    if (userData.some(user => user.email === email)) {
        return res.status(400).json("User already exists");
    }

    // Add a new user and save the token
    const token = (Math.random() + 1).toString(36).substring(2);
    tokenData[req.body.email] = token;
    userData.push({ email, password, address, city, zipCode});
    res.status(200).json({
        Token: token
    });
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
    const { username, highscore } = req.body;

    highScore.push({ username, highscore});
    console.log(`Received highscore: username: ${username}, highscore: ${highscore}`);

    res.status(200).json({ message: `Highscore ${highscore} from ${username} saved successfully` });
});

app.get("/highscores", (req, res) => {
    const highscores = highScore.map(entry => ({ username: entry.username, highscore: entry.highscore }));
    console.log(highscores);
    
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

