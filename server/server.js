const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

let users = [];
let dataStore = [];

app.post("/api/register", (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.json({ message: "Registration successful", success: true });
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) res.json({ message: "Login successful", success: true });
    else res.json({ message: "Invalid credentials", success: false });
});

app.post("/api/add", (req, res) => {
    dataStore.push(req.body.data);
    res.json({ message: "Data added" });
});

app.get("/api/list", (req, res) => {
    res.json(dataStore);
});

app.delete("/api/delete/:index", (req, res) => {
    dataStore.splice(req.params.index, 1);
    res.json({ message: "Data deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
